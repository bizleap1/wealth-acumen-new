import assert from 'assert';
import handler, { EBOOK_CATALOG } from '../api/download-ebook.js';
import { getLeads } from '../api/leadStore.js';
import { buildPlainTextEmail, buildHtmlEmail } from '../api/emailService.js';

// Mock request / response helper
function createMockReqRes({ method = 'POST', body = {} }) {
  const req = {
    method,
    body,
    headers: { 'content-type': 'application/json' },
    [Symbol.asyncIterator]: async function* () {
      yield Buffer.from(JSON.stringify(body));
    }
  };

  let statusCode = 200;
  const headers = {};
  let responseData = '';

  const res = {
    setHeader(key, val) {
      headers[key] = val;
    },
    get statusCode() {
      return statusCode;
    },
    set statusCode(code) {
      statusCode = code;
    },
    end(chunk) {
      if (chunk) responseData += chunk;
      return this;
    },
    _getParsed() {
      try {
        return JSON.parse(responseData);
      } catch {
        return responseData;
      }
    }
  };

  return { req, res };
}

async function runTests() {
  console.log('🧪 Starting E-Book Lead & Email Notification Tests...\n');

  // Test 1: Validation - missing fields
  {
    console.log('Test 1: Validation with missing fields');
    const { req, res } = createMockReqRes({ body: {} });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400, 'Should return 400 for empty body');
    const parsed = res._getParsed();
    assert.strictEqual(parsed.success, false);
    assert(parsed.error.includes('Full name is required'), 'Should report name error');
    console.log('✅ Test 1 Passed: Correctly rejects empty submission\n');
  }

  // Test 2: Validation - invalid email
  {
    console.log('Test 2: Validation with invalid email format');
    const { req, res } = createMockReqRes({
      body: {
        name: 'Rahul Sharma',
        email: 'invalid-email',
        phone: '9876543210',
        ebook: 'Technical Analysis For Beginners'
      }
    });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const parsed = res._getParsed();
    assert(parsed.error.includes('valid email address'), 'Should report email error');
    console.log('✅ Test 2 Passed: Correctly rejects malformed email\n');
  }

  // Test 3: Validation - invalid phone number
  {
    console.log('Test 3: Validation with short phone number');
    const { req, res } = createMockReqRes({
      body: {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '123',
        ebook: 'Technical Analysis For Beginners'
      }
    });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const parsed = res._getParsed();
    assert(parsed.error.includes('valid phone number'), 'Should report phone error');
    console.log('✅ Test 3 Passed: Correctly rejects invalid phone\n');
  }

  // Test 4: Validation - invalid e-book name
  {
    console.log('Test 4: Validation with unknown e-book');
    const { req, res } = createMockReqRes({
      body: {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '9876543210',
        ebook: 'Unknown Secret Book'
      }
    });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    const parsed = res._getParsed();
    assert(parsed.error.includes('Invalid e-book selection'), 'Should report ebook catalog error');
    console.log('✅ Test 4 Passed: Correctly validates against e-book catalog\n');
  }

  // Test 5: Successful submission & Download authorization
  {
    console.log('Test 5: Successful valid submission across all catalog books');
    const uniqueEmail = `test_${Date.now()}@domain.com`;
    
    for (const ebookName of Object.keys(EBOOK_CATALOG)) {
      const { req, res } = createMockReqRes({
        body: {
          name: 'Atharva Lead',
          email: uniqueEmail,
          phone: '+91 98765 43210',
          company: 'Fintech Solutions Ltd',
          ebook: ebookName
        }
      });

      await handler(req, res);
      assert.strictEqual(res.statusCode, 200);
      const parsed = res._getParsed();
      assert.strictEqual(parsed.success, true);
      assert.strictEqual(parsed.downloadUrl, EBOOK_CATALOG[ebookName].url);
      assert.strictEqual(parsed.fileName, EBOOK_CATALOG[ebookName].fileName);
      assert(parsed.emailNotification, 'Should include emailNotification status');
      console.log(`  ✓ Verified book: ${ebookName} -> ${parsed.fileName}`);
    }
    console.log('✅ Test 5 Passed: All e-books download correctly\n');
  }

  // Test 6: Database lead persistence check
  {
    console.log('Test 6: Database storage persistence check');
    const leads = getLeads();
    assert(Array.isArray(leads), 'Leads should be an array');
    assert(leads.length > 0, 'Leads should have recorded entries');
    const latest = leads[0];
    assert(latest.id.startsWith('lead_'), 'Lead should have a formatted ID');
    assert(latest.name, 'Lead should store name');
    assert(latest.email, 'Lead should store email');
    assert(latest.phone, 'Lead should store phone');
    assert(latest.downloadDate, 'Lead should store download date');
    assert(latest.downloadTime, 'Lead should store download time');
    assert(latest.emailNotification, 'Lead should store notification record');
    console.log(`  ✓ Latest lead stored: ID ${latest.id}, Client: ${latest.name}, Ebook: ${latest.ebook}`);
    console.log('✅ Test 6 Passed: Lead database persistence verified\n');
  }

  // Test 7: Anti-duplicate rapid request test
  {
    console.log('Test 7: Anti-duplicate suppression test');
    const spamEmail = `spam_${Date.now()}@example.com`;
    const ebookChoice = 'Insurance E-Book';

    // First request
    const req1 = createMockReqRes({
      body: { name: 'Fast Clicker', email: spamEmail, phone: '9988776655', ebook: ebookChoice }
    });
    await handler(req1.req, req1.res);
    assert.strictEqual(req1.res.statusCode, 200);

    // Immediate second request with same email & ebook
    const req2 = createMockReqRes({
      body: { name: 'Fast Clicker', email: spamEmail, phone: '9988776655', ebook: ebookChoice }
    });
    await handler(req2.req, req2.res);
    assert.strictEqual(req2.res.statusCode, 200);
    const parsed2 = req2.res._getParsed();
    assert.strictEqual(parsed2.duplicatePrevented, true, 'Should detect and flag duplicate suppression');
    assert.strictEqual(parsed2.emailNotification.status, 'already_sent', 'Should avoid sending duplicate email');
    console.log('✅ Test 7 Passed: Rapid duplicate spam prevented\n');
  }

  // Test 8: Email formatting verification
  {
    console.log('Test 8: Plain-text & HTML email template format check');
    const sampleLead = {
      name: 'Dr. Sameer Kulkarni',
      email: 'sameer.k@example.com',
      phone: '+91 98200 12345',
      company: 'Kulkarni Hospital & Healthcare',
      ebook: 'Mutual Fund',
      downloadDate: '26 Nov 2026',
      downloadTime: '05:45 PM IST'
    };

    const plainText = buildPlainTextEmail(sampleLead);
    assert(plainText.includes('Hello Admin'), 'Plain text must have greeting');
    assert(plainText.includes('CLIENT INFORMATION'), 'Plain text must have CLIENT INFORMATION header');
    assert(plainText.includes('Full Name: Dr. Sameer Kulkarni'), 'Plain text must have full name');
    assert(plainText.includes('E-BOOK INFORMATION'), 'Plain text must have E-BOOK INFORMATION header');
    assert(plainText.includes('E-book Name: Mutual Fund'), 'Plain text must have e-book name');
    assert(plainText.includes('Action Required:'), 'Plain text must have action required');

    const html = buildHtmlEmail(sampleLead);
    assert(html.includes('WEALTH ACUMEN'), 'HTML must have branding');
    assert(html.includes('New E-Book Download Lead'), 'HTML must have title');
    assert(html.includes('Dr. Sameer Kulkarni'), 'HTML must have client name');
    assert(html.includes('mailto:sameer.k@example.com'), 'HTML must have mailto link');
    assert(html.includes('Chat on WhatsApp'), 'HTML must have WhatsApp button');
    console.log('✅ Test 8 Passed: Email formats match exact specifications\n');
  }

  console.log('🎉 ALL 8 E-BOOK SYSTEM TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
