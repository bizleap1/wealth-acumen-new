import { sendContactEnquiryNotification } from './emailService.js';
import { saveEnquiry, isRecentContactDuplicate } from './contactStore.js';

/**
 * Validates the contact form input fields.
 */
export function validateContactInput({ name, email, phone, subject, message }) {
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Full name is required (minimum 2 characters).');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  const cleanPhone = (phone || '').toString().replace(/[^0-9]/g, '');
  if (!cleanPhone || cleanPhone.length < 8) {
    errors.push('A valid phone number is required (minimum 8 digits).');
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    errors.push('Subject is required (minimum 3 characters).');
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message is required (minimum 10 characters).');
  }

  return errors;
}

/**
 * Formats current date and time in Indian Standard Time (IST).
 */
export function getFormattedDateTime() {
  const now = new Date();
  let submissionDate;
  let submissionTime;

  try {
    submissionDate = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    }).format(now);

    submissionTime = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    }).format(now) + ' IST';
  } catch {
    submissionDate = now.toDateString();
    submissionTime = now.toLocaleTimeString();
  }

  return { submissionDate, submissionTime };
}

/**
 * Parses request body from incoming stream or pre-parsed body object.
 */
async function parseRequestBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      // Safety limit: 1MB
      if (raw.length > 1e6) {
        req.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

/**
 * Main Contact API request handler.
 * Compatible with Vercel Serverless Functions and Vite Dev Middleware.
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: false,
      error: 'Method not allowed. Use POST.'
    }));
  }

  try {
    const body = await parseRequestBody(req);
    const { name, email, phone, subject, message } = body;

    // 1. Validation
    const validationErrors = validateContactInput({ name, email, phone, subject, message });
    if (validationErrors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      }));
    }

    // 2. Prevent spam / duplicate submissions (within 30s)
    if (isRecentContactDuplicate(email, message, 30)) {
      res.statusCode = 429;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        success: false,
        error: 'A duplicate enquiry was recently submitted. Please wait a moment before sending again.'
      }));
    }

    // 3. Indian Standard Time timestamping
    const { submissionDate, submissionTime } = getFormattedDateTime();
    const ownerEmail = process.env.OWNER_EMAIL || 'info@wealthacumen.in';

    // 4. Send email notification to owner
    const emailResult = await sendContactEnquiryNotification({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submissionDate,
      submissionTime
    });

    // 5. Store enquiry in data/contact-enquiries.json database
    const savedEnquiry = saveEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submissionDate,
      submissionTime,
      ownerEmail,
      emailNotification: {
        status: emailResult.status || (emailResult.success ? 'sent' : 'failed'),
        provider: emailResult.provider || null,
        recipient: ownerEmail,
        replyTo: email.trim().toLowerCase(),
        messageId: emailResult.messageId || null,
        timestamp: new Date().toISOString(),
        error: emailResult.error || null
      }
    });

    // 6. Return professional success response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: true,
      message: 'Thank you for contacting us! Your enquiry has been submitted successfully. Our team will get back to you shortly.',
      enquiryId: savedEnquiry ? savedEnquiry.id : null,
      emailNotification: {
        status: emailResult.status,
        provider: emailResult.provider,
        recipient: ownerEmail,
        replyTo: email.trim().toLowerCase()
      }
    }));
  } catch (err) {
    console.error('[ContactAPI] Unhandled error during submission:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: false,
      error: 'Unable to submit your enquiry at the moment. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }));
  }
}
