import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'ebook-leads.json');

/**
 * Ensures data directory and leads file exist.
 */
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Reads all stored leads.
 */
export function getLeads() {
  try {
    ensureStorage();
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('[LeadStore] Error reading leads file:', err.message);
    return [];
  }
}

/**
 * Checks if a lead with same email & ebook was submitted recently (anti-duplicate).
 * @param {string} email 
 * @param {string} ebook 
 * @param {number} windowSeconds default 30s
 */
export function isRecentDuplicate(email, ebook, windowSeconds = 30) {
  try {
    const leads = getLeads();
    const now = Date.now();
    const cutoff = now - (windowSeconds * 1000);
    
    return leads.some(lead => 
      lead.email && 
      lead.email.toLowerCase() === email.toLowerCase() &&
      lead.ebook === ebook &&
      new Date(lead.createdAt).getTime() > cutoff
    );
  } catch {
    return false;
  }
}

/**
 * Saves a new lead entry to the database/file.
 */
export function saveLead(leadData) {
  try {
    ensureStorage();
    const leads = getLeads();
    
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      company: leadData.company || 'Not Specified',
      ebook: leadData.ebook,
      downloadDate: leadData.downloadDate,
      downloadTime: leadData.downloadTime,
      createdAt: new Date().toISOString(),
      emailNotification: leadData.emailNotification || {
        status: 'pending',
        recipient: leadData.ownerEmail,
        timestamp: new Date().toISOString(),
        error: null
      }
    };

    leads.unshift(newLead); // newest first
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return newLead;
  } catch (err) {
    console.error('[LeadStore] Error saving lead:', err.message);
    return null;
  }
}
