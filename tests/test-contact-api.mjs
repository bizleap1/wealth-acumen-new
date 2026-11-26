import assert from 'node:assert';
import { validateContactInput, getFormattedDateTime } from '../api/contact.js';
import { buildContactPlainTextEmail, buildContactHtmlEmail, sendContactEnquiryNotification } from '../api/emailService.js';
import { saveEnquiry, getEnquiries, isRecentContactDuplicate } from '../api/contactStore.js';

console.log('--- Starting Contact Feature Test Suite ---');

// 1. Test Input Validation
console.log('1. Testing Input Validation...');
const missingAll = validateContactInput({});
assert(missingAll.length === 5, 'Should fail all 5 fields when empty');

const invalidEmail = validateContactInput({
  name: 'John Doe',
  email: 'not-an-email',
  phone: '9876543210',
  subject: 'Investment Inquiry',
  message: 'I want to know more about mutual fund investments.'
});
assert(invalidEmail.some(e => e.includes('valid email')), 'Should catch invalid email');

const shortPhone = validateContactInput({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234',
  subject: 'Investment Inquiry',
  message: 'I want to know more about mutual fund investments.'
});
assert(shortPhone.some(e => e.includes('valid phone')), 'Should catch phone with < 8 digits');

const validInputs = validateContactInput({
  name: 'Rajesh Sharma',
  email: 'rajesh.sharma@example.com',
  phone: '+91 98765 43210',
  subject: 'Portfolio Consultation',
  message: 'I would like to schedule a consultation regarding portfolio rebalancing.'
});
assert.strictEqual(validInputs.length, 0, 'Valid inputs should have zero errors');
console.log('   ✓ Input validation passed');

// 2. Test Email Templates & Reply-To Specification
console.log('2. Testing Email Formatting & Reply-To...');
const sampleData = {
  name: 'Vikram Mehta',
  email: 'vikram.mehta@example.com',
  phone: '+91 91234 56789',
  subject: 'AIF Investment Query',
  message: 'Please share details regarding minimum ticket size and historical performance for AIF Category II funds.',
  submissionDate: '26 Nov 2026',
  submissionTime: '06:45 PM IST'
};

const plainText = buildContactPlainTextEmail(sampleData);
assert(plainText.includes('Hello Admin,'), 'Must contain greeting');
assert(plainText.includes('You have received a new enquiry through the Contact Us page of your website.'), 'Must contain notice');
assert(plainText.includes('VISITOR DETAILS'), 'Must contain VISITOR DETAILS');
assert(plainText.includes('Full Name: Vikram Mehta'), 'Must contain visitor name');
assert(plainText.includes('Email Address: vikram.mehta@example.com'), 'Must contain email');
assert(plainText.includes('Phone Number: +91 91234 56789'), 'Must contain phone');
assert(plainText.includes('ENQUIRY DETAILS'), 'Must contain ENQUIRY DETAILS');
assert(plainText.includes('Subject: AIF Investment Query'), 'Must contain subject');
assert(plainText.includes('Message:\nPlease share details'), 'Must contain message');
assert(plainText.includes('SUBMISSION INFORMATION'), 'Must contain SUBMISSION INFORMATION');
assert(plainText.includes('Date: 26 Nov 2026'), 'Must contain date');
assert(plainText.includes('Time: 06:45 PM IST'), 'Must contain time');
assert(plainText.includes('Website Notification System'), 'Must contain signature');
console.log('   ✓ Plain text email format perfectly matches requirement');

const htmlEmail = buildContactHtmlEmail(sampleData);
assert(htmlEmail.includes('Wealth Acumen'), 'HTML must feature Wealth Acumen branding');
assert(htmlEmail.includes('mailto:vikram.mehta@example.com'), 'HTML must include Reply link pointing to visitor email');
assert(htmlEmail.includes('AIF Investment Query'), 'HTML must include subject');
console.log('   ✓ HTML email format matches branding and has direct Reply link');

// 3. Test Email Service Reply-To header configuration
console.log('3. Testing Email Dispatcher Reply-To...');
const notifyResult = await sendContactEnquiryNotification(sampleData);
assert.strictEqual(notifyResult.replyTo, 'vikram.mehta@example.com', 'Notification must configure visitor as replyTo');
console.log(`   ✓ Reply-To verified: ${notifyResult.replyTo} (status: ${notifyResult.status})`);

// 4. Test Contact Database Persistence
console.log('4. Testing Database Persistence...');
const saved = saveEnquiry({
  ...sampleData,
  ownerEmail: 'info@wealthacumen.in',
  emailNotification: {
    status: notifyResult.status,
    recipient: 'info@wealthacumen.in',
    replyTo: sampleData.email,
    timestamp: new Date().toISOString()
  }
});
assert(saved && saved.id, 'Enquiry must be saved with unique ID');
assert.strictEqual(saved.name, sampleData.name);
assert.strictEqual(saved.email, sampleData.email);
assert.strictEqual(saved.phone, sampleData.phone);
assert.strictEqual(saved.subject, sampleData.subject);
assert.strictEqual(saved.message, sampleData.message);

const allEnquiries = getEnquiries();
const retrieved = allEnquiries.find(e => e.id === saved.id);
assert(retrieved, 'Saved enquiry must be queryable from storage');
console.log(`   ✓ Enquiry stored successfully in data/contact-enquiries.json with id: ${saved.id}`);

// 5. Test Duplicate Prevention
console.log('5. Testing Duplicate Detection...');
const isDup = isRecentContactDuplicate(sampleData.email, sampleData.message, 30);
assert.strictEqual(isDup, true, 'Immediate duplicate submission should be flagged');

const notDup = isRecentContactDuplicate('different@example.com', 'different message', 30);
assert.strictEqual(notDup, false, 'Distinct enquiry should not be flagged as duplicate');
console.log('   ✓ Duplicate prevention working correctly');

console.log('\n--- All Unit & Integration Tests Passed Successfully! ---');
