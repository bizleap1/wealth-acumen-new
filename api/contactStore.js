import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'contact-enquiries.json');

/**
 * Ensures data directory and enquiries file exist.
 */
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Reads all stored contact enquiries.
 */
export function getEnquiries() {
  try {
    ensureStorage();
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('[ContactStore] Error reading enquiries file:', err.message);
    return [];
  }
}

/**
 * Checks for rapid duplicate submissions (within windowSeconds).
 */
export function isRecentContactDuplicate(email, message, windowSeconds = 30) {
  try {
    const enquiries = getEnquiries();
    const now = Date.now();
    const cutoff = now - (windowSeconds * 1000);

    const normEmail = (email || '').toLowerCase().trim();
    const normMsg = (message || '').toLowerCase().trim();

    return enquiries.some(enquiry => 
      enquiry.email && 
      enquiry.email.toLowerCase().trim() === normEmail &&
      enquiry.message && 
      enquiry.message.toLowerCase().trim() === normMsg &&
      new Date(enquiry.createdAt).getTime() > cutoff
    );
  } catch {
    return false;
  }
}

/**
 * Saves a new enquiry to the storage file.
 */
export function saveEnquiry(enquiryData) {
  try {
    ensureStorage();
    const enquiries = getEnquiries();

    const newEnquiry = {
      id: `enquiry_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      name: enquiryData.name,
      email: enquiryData.email,
      phone: enquiryData.phone,
      subject: enquiryData.subject,
      message: enquiryData.message,
      submissionDate: enquiryData.submissionDate,
      submissionTime: enquiryData.submissionTime,
      createdAt: new Date().toISOString(),
      emailNotification: enquiryData.emailNotification || {
        status: 'pending',
        recipient: enquiryData.ownerEmail,
        replyTo: enquiryData.email,
        timestamp: new Date().toISOString(),
        error: null
      }
    };

    enquiries.unshift(newEnquiry); // newest first
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
    return newEnquiry;
  } catch (err) {
    console.error('[ContactStore] Error saving enquiry:', err.message);
    return null;
  }
}
