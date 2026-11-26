import { sendOwnerNotification } from './emailService.js';
import { saveLead, isRecentDuplicate } from './leadStore.js';

export const EBOOK_CATALOG = {
  'Insurance E-Book': {
    url: '/ebooks/INSURANCE_EBOOK.pdf',
    fileName: 'Insurance_EBook.pdf'
  },
  'Technical Analysis For Beginners': {
    url: '/ebooks/TECHNICAL_ANALYSIS.pdf',
    fileName: 'Technical_Analysis.pdf'
  },
  'Fundamental Analysis For Beginners': {
    url: '/ebooks/FUNDAMENTAL_ANALYSIS.pdf',
    fileName: 'Fundamental_Analysis.pdf'
  },
  'Mutual Fund': {
    url: '/ebooks/MUTUAL_FUND_EBOOK.pdf',
    fileName: 'Mutual_Fund_EBook.pdf'
  },
  'Fixed Income E-Book': {
    url: '/ebooks/FIXED_INCOME.pdf',
    fileName: 'Fixed_Income.pdf'
  },
  'Stock Market BTS E-book': {
    url: '/ebooks/STOCK_MARKET_BEHIND_THE_SCENE.pdf',
    fileName: 'Stock_Market_Behind_The_Scene.pdf'
  }
};

/**
 * Validates request payload.
 */
function validateLeadInput({ name, email, phone, ebook }) {
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

  if (!ebook || !EBOOK_CATALOG[ebook]) {
    errors.push(`Invalid e-book selection. Available e-books: ${Object.keys(EBOOK_CATALOG).join(', ')}`);
  }

  return errors;
}

/**
 * Formats current date and time in Indian Standard Time (IST).
 */
function getFormattedDateTime() {
  const now = new Date();
  
  let downloadDate;
  let downloadTime;
  
  try {
    downloadDate = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    }).format(now);

    downloadTime = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    }).format(now) + ' IST';
  } catch {
    downloadDate = now.toDateString();
    downloadTime = now.toLocaleTimeString();
  }

  return { downloadDate, downloadTime };
}

/**
 * Main API request handler.
 * Works as a Vercel Serverless Function and Vite Dev Middleware.
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
    return res.end(JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }));
  }

  // Parse body if not already parsed
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, error: 'Invalid JSON body.' }));
    }
  } else if (!body) {
    // Read stream if in raw node environment
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const rawData = Buffer.concat(chunks).toString('utf-8');
      body = rawData ? JSON.parse(rawData) : {};
    } catch {
      body = {};
    }
  }

  const { name, email, phone, company, ebook } = body || {};

  // 1. Validate inputs
  const validationErrors = validateLeadInput({ name, email, phone, ebook });
  if (validationErrors.length > 0) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: false,
      error: validationErrors[0],
      details: validationErrors
    }));
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim();
  const cleanCompany = (company || '').trim();
  const ebookConfig = EBOOK_CATALOG[ebook];

  // 2. Prevent rapid duplicate submissions (within 30 seconds)
  const isDuplicate = isRecentDuplicate(cleanEmail, ebook, 30);
  if (isDuplicate) {
    console.log(`[API] Rapid duplicate prevented for ${cleanEmail} (${ebook}). Returning download immediately.`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: true,
      duplicatePrevented: true,
      message: 'Your download was recently authorized. Download is starting now.',
      downloadUrl: ebookConfig.url,
      fileName: ebookConfig.fileName,
      emailNotification: {
        status: 'already_sent',
        recipient: process.env.OWNER_EMAIL || 'info@wealthacumen.in'
      }
    }));
  }

  const { downloadDate, downloadTime } = getFormattedDateTime();
  const ownerEmail = process.env.OWNER_EMAIL || 'info@wealthacumen.in';

  // 3. Send automatic email notification to website owner
  let emailResult = { success: false, status: 'pending' };
  try {
    emailResult = await sendOwnerNotification({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      company: cleanCompany,
      ebook,
      downloadDate,
      downloadTime
    });
  } catch (err) {
    console.error('[API] Unexpected error in email notification dispatch:', err);
    emailResult = { success: false, status: 'failed', error: err.message };
  }

  // 4. Record lead in database / local store
  const savedLead = saveLead({
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    company: cleanCompany,
    ebook,
    downloadDate,
    downloadTime,
    ownerEmail,
    emailNotification: {
      status: emailResult.status || (emailResult.success ? 'sent' : 'failed'),
      recipient: ownerEmail,
      timestamp: new Date().toISOString(),
      provider: emailResult.provider || null,
      messageId: emailResult.messageId || null,
      error: emailResult.error || null
    }
  });

  // 5. Authorize download and respond to client
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({
    success: true,
    message: 'Thank you! Your e-book download is ready.',
    leadId: savedLead ? savedLead.id : null,
    downloadUrl: ebookConfig.url,
    fileName: ebookConfig.fileName,
    emailNotification: {
      status: emailResult.status,
      recipient: ownerEmail
    }
  }));
}
