import assert from 'node:assert';
import { EventEmitter } from 'events';
import handler from '../api/contact.js';
import { getEnquiries } from '../api/contactStore.js';

console.log('--- Testing API Handler Directly in Sandbox ---');

function createMockReqRes({ method = 'POST', body = {} }) {
  const req = new EventEmitter();
  req.method = method;
  req.headers = { 'content-type': 'application/json' };
  req.body = body; // Already parsed by express/vercel or handled directly

  let statusCode = 200;
  const headers = {};
  let responseData = '';

  const res = {
    get statusCode() { return statusCode; },
    set statusCode(code) { statusCode = code; },
    setHeader(name, val) { headers[name.toLowerCase()] = val; },
    getHeader(name) { return headers[name.toLowerCase()]; },
    end(data) {
      if (data) responseData += data;
      this.finished = true;
      if (this.onFinish) this.onFinish();
    },
    json() {
      return responseData ? JSON.parse(responseData) : null;
    }
  };

  return { req, res };
}

// 1. Test OPTIONS
console.log('1. Testing OPTIONS request...');
const { req: optReq, res: optRes } = createMockReqRes({ method: 'OPTIONS' });
await handler(optReq, optRes);
assert.strictEqual(optRes.statusCode, 200);
console.log('   ✓ OPTIONS returned 200');

// 2. Test Invalid Method GET
console.log('2. Testing GET request rejection...');
const { req: getReq, res: getRes } = createMockReqRes({ method: 'GET' });
await handler(getReq, getRes);
assert.strictEqual(getRes.statusCode, 405);
console.log('   ✓ GET returned 405 Method Not Allowed');

// 3. Test Validation Failure (empty body)
console.log('3. Testing Empty Body Validation...');
const { req: emptyReq, res: emptyRes } = createMockReqRes({ method: 'POST', body: {} });
await handler(emptyReq, emptyRes);
assert.strictEqual(emptyRes.statusCode, 400);
const emptyJson = emptyRes.json();
assert.strictEqual(emptyJson.success, false);
assert(emptyJson.details.length >= 4);
console.log('   ✓ Empty submission rejected with 400 validation error');

// 4. Test Successful Submission
console.log('4. Testing Successful Submission...');
const ts = Date.now();
const validPayload = {
  name: 'Sunil Gavaskar',
  email: `sunil.${ts}@example.com`,
  phone: '+91 99887 76655',
  subject: 'Mutual Fund Advisory',
  message: `I would like to explore mutual fund options for a medium term portfolio. [${ts}]`
};

const { req: postReq, res: postRes } = createMockReqRes({ method: 'POST', body: validPayload });
await handler(postReq, postRes);

assert.strictEqual(postRes.statusCode, 200);
const postJson = postRes.json();
assert.strictEqual(postJson.success, true);
assert.strictEqual(
  postJson.message,
  'Thank you for contacting us! Your enquiry has been submitted successfully. Our team will get back to you shortly.'
);
assert.strictEqual(postJson.emailNotification.replyTo, validPayload.email);
assert.strictEqual(postJson.emailNotification.recipient, 'info@wealthacumen.in');
console.log('   ✓ Valid submission returned 200 with exact success message and Reply-To configured');

// Verify recorded in database
const enquiries = getEnquiries();
const match = enquiries.find(e => e.id === postJson.enquiryId);
assert(match, 'Enquiry must be recorded in data/contact-enquiries.json');
assert.strictEqual(match.name, validPayload.name);
assert.strictEqual(match.email, validPayload.email);
assert.strictEqual(match.phone, validPayload.phone);
assert.strictEqual(match.subject, validPayload.subject);
assert.strictEqual(match.message, validPayload.message);
assert.strictEqual(match.emailNotification.replyTo, validPayload.email);
console.log('   ✓ Enquiry verified in data/contact-enquiries.json database');

// 5. Test Duplicate Prevention within 30 seconds
console.log('5. Testing Duplicate Submission...');
const { req: dupReq, res: dupRes } = createMockReqRes({ method: 'POST', body: validPayload });
await handler(dupReq, dupRes);
assert.strictEqual(dupRes.statusCode, 429);
const dupJson = dupRes.json();
assert.strictEqual(dupJson.success, false);
console.log('   ✓ Duplicate enquiry correctly rejected with 429');

// 6. Test Raw HTTP Streaming Body Parsing
console.log('6. Testing Raw Stream Body Parsing...');
const streamReq = new EventEmitter();
streamReq.method = 'POST';
streamReq.headers = { 'content-type': 'application/json' };
// do not pre-set streamReq.body

let streamStatusCode = 200;
let streamRespData = '';
const streamRes = {
  get statusCode() { return streamStatusCode; },
  set statusCode(code) { streamStatusCode = code; },
  setHeader() {},
  end(data) {
    if (data) streamRespData += data;
  }
};

const streamPromise = handler(streamReq, streamRes);
const payloadObj = {
  name: 'Ananya Roy',
  email: 'ananya.roy@example.com',
  phone: '+91 97766 55443',
  subject: 'Tax Saving Investments',
  message: 'Seeking guidance on ELSS and other 80C options for current financial year.'
};
const payloadStr = JSON.stringify(payloadObj);

streamReq.emit('data', Buffer.from(payloadStr.slice(0, 30)));
streamReq.emit('data', Buffer.from(payloadStr.slice(30)));
streamReq.emit('end');

await streamPromise;
assert.strictEqual(streamStatusCode, 200);
const streamJson = JSON.parse(streamRespData);
assert.strictEqual(streamJson.success, true);
assert.strictEqual(streamJson.emailNotification.replyTo, 'ananya.roy@example.com');
console.log('   ✓ Raw chunked streaming request parsed and executed successfully');

console.log('\n--- All Handler Tests Passed Successfully! ---');
