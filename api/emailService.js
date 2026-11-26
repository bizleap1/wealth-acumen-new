import nodemailer from 'nodemailer';

/**
 * Builds the plain-text email body matching exact user requirements.
 */
export function buildPlainTextEmail({ name, email, phone, company, ebook, downloadDate, downloadTime }) {
  return `Hello Admin,

A new visitor has successfully requested and downloaded an e-book from your website.

CLIENT INFORMATION
Full Name: ${name}
Email Address: ${email}
Phone Number: ${phone}
Company Name: ${company || 'Not Specified'}

E-BOOK INFORMATION
E-book Name: ${ebook}
Download Date: ${downloadDate}
Download Time: ${downloadTime}

Action Required:
You can contact this potential client using the contact information provided above.

Regards,
Website Notification System`;
}

/**
 * Builds a professional, modern HTML email styled with Wealth Acumen branding.
 */
export function buildHtmlEmail({ name, email, phone, company, ebook, downloadDate, downloadTime }) {
  const cleanPhone = (phone || '').replace(/[^0-9+]/g, '');
  const waPhone = cleanPhone.startsWith('+') ? cleanPhone.replace('+', '') : `91${cleanPhone.replace(/^0+/, '')}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New E-book Download</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 30px 15px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0b1120 0%, #1e293b 100%);
      padding: 32px 30px;
      text-align: center;
      border-bottom: 3px solid #fca311;
    }
    .header-brand {
      color: #fca311;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .header-title {
      color: #ffffff;
      font-size: 22px;
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 30px;
    }
    .greeting {
      font-size: 16px;
      color: #334155;
      margin: 0 0 16px;
    }
    .lead-banner {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #fca311;
      padding: 14px 18px;
      border-radius: 6px;
      margin-bottom: 24px;
      font-size: 14px;
      color: #475569;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1px;
      color: #0f172a;
      text-transform: uppercase;
      margin: 24px 0 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .info-table td {
      padding: 10px 12px;
      font-size: 14px;
      border-bottom: 1px solid #f1f5f9;
    }
    .info-table td.label {
      width: 38%;
      color: #64748b;
      font-weight: 600;
    }
    .info-table td.value {
      width: 62%;
      color: #0f172a;
      font-weight: 700;
    }
    .ebook-badge {
      display: inline-block;
      background-color: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 13px;
    }
    .action-box {
      background: #faf5ff;
      border: 1px solid #e9d5ff;
      border-radius: 8px;
      padding: 18px;
      margin: 28px 0 20px;
    }
    .action-box h4 {
      margin: 0 0 8px;
      color: #6b21a8;
      font-size: 14px;
      font-weight: 700;
    }
    .action-box p {
      margin: 0 0 14px;
      color: #581c87;
      font-size: 13px;
    }
    .action-buttons {
      display: flex;
      gap: 10px;
    }
    .btn {
      display: inline-block;
      padding: 9px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      text-align: center;
    }
    .btn-primary {
      background-color: #0f172a;
      color: #ffffff !important;
    }
    .btn-wa {
      background-color: #25d366;
      color: #ffffff !important;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 30px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="header-brand">WEALTH ACUMEN</div>
        <h1 class="header-title">New E-Book Download Lead</h1>
      </div>
      <div class="content">
        <p class="greeting">Hello Admin,</p>
        <div class="lead-banner">
          A new visitor has successfully requested and downloaded an e-book from your website.
        </div>

        <div class="section-title">CLIENT INFORMATION</div>
        <table class="info-table">
          <tr>
            <td class="label">Full Name:</td>
            <td class="value">${name}</td>
          </tr>
          <tr>
            <td class="label">Email Address:</td>
            <td class="value"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone Number:</td>
            <td class="value"><a href="tel:${cleanPhone}" style="color: #0f172a; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <td class="label">Company Name:</td>
            <td class="value">${company || 'Not Specified'}</td>
          </tr>
        </table>

        <div class="section-title">E-BOOK INFORMATION</div>
        <table class="info-table">
          <tr>
            <td class="label">E-book Name:</td>
            <td class="value"><span class="ebook-badge">📚 ${ebook}</span></td>
          </tr>
          <tr>
            <td class="label">Download Date:</td>
            <td class="value">${downloadDate}</td>
          </tr>
          <tr>
            <td class="label">Download Time:</td>
            <td class="value">${downloadTime}</td>
          </tr>
        </table>

        <div class="action-box">
          <h4>Action Required:</h4>
          <p>You can contact this potential client using the contact information provided above.</p>
          <div class="action-buttons">
            <a href="mailto:${email}?subject=${encodeURIComponent('Wealth Acumen - Regarding your ' + ebook + ' download')}" class="btn btn-primary" target="_blank">Reply via Email</a>
            <a href="https://wa.me/${waPhone}" class="btn btn-wa" target="_blank">Chat on WhatsApp</a>
          </div>
        </div>

        <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
          Regards,<br />
          <strong>Website Notification System</strong><br />
          Wealth Acumen Lead Dispatcher
        </p>
      </div>
      <div class="footer">
        Automated lead alert generated by Wealth Acumen E-Book Portal &bull; ${downloadDate} ${downloadTime}
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends the owner notification email using the configured provider (SMTP / Resend / SendGrid).
 */
export async function sendOwnerNotification(leadData) {
  const ownerEmail = process.env.OWNER_EMAIL || 'info@wealthacumen.in';
  const subject = `New E-book Download – ${leadData.ebook} | Client Details`;
  const textBody = buildPlainTextEmail(leadData);
  const htmlBody = buildHtmlEmail(leadData);

  // 1. Try Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Wealth Acumen <onboarding@resend.dev>',
          to: [ownerEmail],
          subject: subject,
          text: textBody,
          html: htmlBody
        })
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`[EmailService] Lead email sent to ${ownerEmail} via Resend. ID: ${data.id}`);
        return { success: true, status: 'sent', provider: 'resend', messageId: data.id };
      } else {
        const errText = await res.text();
        console.error('[EmailService] Resend API error:', errText);
      }
    } catch (err) {
      console.error('[EmailService] Resend request failed:', err.message);
    }
  }

  // 2. Try SendGrid if configured
  if (process.env.SENDGRID_API_KEY) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: ownerEmail }] }],
          from: { email: process.env.SENDGRID_FROM || 'info@wealthacumen.in', name: 'Wealth Acumen' },
          subject: subject,
          content: [
            { type: 'text/plain', value: textBody },
            { type: 'text/html', value: htmlBody }
          ]
        })
      });

      if (res.status === 202) {
        console.log(`[EmailService] Lead email sent to ${ownerEmail} via SendGrid.`);
        return { success: true, status: 'sent', provider: 'sendgrid' };
      }
    } catch (err) {
      console.error('[EmailService] SendGrid request failed:', err.message);
    }
  }

  // 3. Try Standard SMTP via Nodemailer
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const port = parseInt(process.env.SMTP_PORT || '587', 10);
      const isSecure = process.env.SMTP_SECURE === 'true' || port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: port,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        // Helpful timeout settings
        connectionTimeout: 10000,
        greetingTimeout: 5000,
        socketTimeout: 15000
      });

      const fromAddress = process.env.SMTP_FROM || `"Wealth Acumen Leads" <${smtpUser}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to: ownerEmail,
        subject: subject,
        text: textBody,
        html: htmlBody
      });

      console.log(`[EmailService] Lead email sent to ${ownerEmail} via SMTP (${smtpHost}). MessageId: ${info.messageId}`);
      return { success: true, status: 'sent', provider: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error('[EmailService] SMTP email dispatch failed:', err.message);
      return { success: false, status: 'failed', provider: 'smtp', error: err.message };
    }
  }

  // 4. Fallback when credentials are not yet configured in .env
  console.log(`[EmailService] OWNER_EMAIL is configured as: ${ownerEmail}`);
  console.log('[EmailService] Notice: SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) or API key not yet set in .env.');
  console.log('[EmailService] Lead record has been saved safely to data/ebook-leads.json.');

  return {
    success: false,
    status: 'pending_smtp_configuration',
    message: 'Lead captured successfully. Live email dispatch awaiting SMTP credentials in .env.'
  };
}

/**
 * Builds the plain-text email body for Contact Us enquiries matching exact specification.
 */
export function buildContactPlainTextEmail({ name, email, phone, subject, message, submissionDate, submissionTime }) {
  return `Hello Admin,

You have received a new enquiry through the Contact Us page of your website.

VISITOR DETAILS
Full Name: ${name}
Email Address: ${email}
Phone Number: ${phone}

ENQUIRY DETAILS
Subject: ${subject}
Message:
${message}

SUBMISSION INFORMATION
Date: ${submissionDate}
Time: ${submissionTime}

Please review this enquiry and contact the visitor using the information provided.

Regards,
Website Notification System`;
}

/**
 * Builds a professional HTML email for Contact Us enquiries with Wealth Acumen branding and Reply-To actions.
 */
export function buildContactHtmlEmail({ name, email, phone, subject, message, submissionDate, submissionTime }) {
  const cleanPhone = (phone || '').replace(/[^0-9+]/g, '');
  const waPhone = cleanPhone.startsWith('+') ? cleanPhone.replace('+', '') : `91${cleanPhone.replace(/^0+/, '')}`;
  const safeMessage = (message || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 30px 15px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0b1120 0%, #1e293b 100%);
      padding: 32px 30px;
      text-align: center;
      border-bottom: 3px solid #fca311;
    }
    .header-brand {
      color: #fca311;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .header-title {
      color: #ffffff;
      font-size: 22px;
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 30px;
    }
    .greeting {
      font-size: 16px;
      color: #334155;
      margin: 0 0 16px;
    }
    .enquiry-banner {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #fca311;
      padding: 14px 18px;
      border-radius: 6px;
      margin-bottom: 24px;
      font-size: 14px;
      color: #475569;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1px;
      color: #0f172a;
      text-transform: uppercase;
      margin: 24px 0 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .info-table td {
      padding: 10px 12px;
      font-size: 14px;
      border-bottom: 1px solid #f1f5f9;
    }
    .info-label {
      width: 38%;
      color: #64748b;
      font-weight: 600;
    }
    .info-value {
      width: 62%;
      color: #0f172a;
      font-weight: 500;
    }
    .info-value a {
      color: #0284c7;
      text-decoration: none;
    }
    .message-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px 18px;
      margin: 12px 0 20px;
      font-size: 14px;
      color: #1e293b;
      line-height: 1.6;
    }
    .action-card {
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 8px;
      padding: 18px;
      margin-top: 24px;
    }
    .action-card h4 {
      margin: 0 0 8px;
      color: #92400e;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .action-card p {
      margin: 0 0 14px;
      font-size: 13px;
      color: #78350f;
    }
    .action-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 10px 18px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
    }
    .btn-primary {
      background-color: #0f172a;
      color: #ffffff !important;
    }
    .btn-wa {
      background-color: #25d366;
      color: #ffffff !important;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="header-brand">Wealth Acumen</div>
        <h1 class="header-title">New Website Enquiry</h1>
      </div>
      <div class="content">
        <p class="greeting">Hello Admin,</p>
        <div class="enquiry-banner">
          You have received a new enquiry through the Contact Us page of your website.
        </div>

        <div class="section-title">Visitor Details</div>
        <table class="info-table">
          <tr>
            <td class="info-label">Full Name:</td>
            <td class="info-value"><strong>${name}</strong></td>
          </tr>
          <tr>
            <td class="info-label">Email Address:</td>
            <td class="info-value"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td class="info-label">Phone Number:</td>
            <td class="info-value"><a href="tel:${cleanPhone}">${phone}</a></td>
          </tr>
        </table>

        <div class="section-title">Enquiry Details</div>
        <table class="info-table" style="margin-bottom: 8px;">
          <tr>
            <td class="info-label">Subject:</td>
            <td class="info-value"><strong>${subject}</strong></td>
          </tr>
        </table>
        <div style="font-size: 13px; font-weight: 600; color: #64748b; margin-top: 8px;">Message:</div>
        <div class="message-box">
          ${safeMessage}
        </div>

        <div class="section-title">Submission Information</div>
        <table class="info-table">
          <tr>
            <td class="info-label">Date:</td>
            <td class="info-value">${submissionDate}</td>
          </tr>
          <tr>
            <td class="info-label">Time:</td>
            <td class="info-value">${submissionTime}</td>
          </tr>
        </table>

        <div class="action-card">
          <h4>Action Required</h4>
          <p>Please review this enquiry and contact the visitor using the information provided. Clicking <strong>Reply</strong> in your email client will reply directly to <strong>${email}</strong>.</p>
          <div class="action-buttons">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="btn btn-primary" target="_blank">Reply to ${name}</a>
            <a href="https://wa.me/${waPhone}" class="btn btn-wa" target="_blank">Chat on WhatsApp</a>
          </div>
        </div>

        <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
          Regards,<br />
          <strong>Website Notification System</strong><br />
          Wealth Acumen Contact Dispatcher
        </p>
      </div>
      <div class="footer">
        Automated enquiry alert generated by Wealth Acumen Contact Portal &bull; ${submissionDate} ${submissionTime}
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends the Contact Us enquiry notification email to the owner.
 * Explicitly configures Reply-To as the visitor's email address.
 */
export async function sendContactEnquiryNotification({ name, email, phone, subject, message, submissionDate, submissionTime }) {
  const ownerEmail = process.env.OWNER_EMAIL || 'info@wealthacumen.in';
  const emailSubject = `New Website Enquiry – ${name} | ${subject}`;
  const textBody = buildContactPlainTextEmail({ name, email, phone, subject, message, submissionDate, submissionTime });
  const htmlBody = buildContactHtmlEmail({ name, email, phone, subject, message, submissionDate, submissionTime });
  const replyToAddress = `"${name}" <${email}>`;

  // 1. Try Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Wealth Acumen <onboarding@resend.dev>',
          to: [ownerEmail],
          reply_to: email,
          subject: emailSubject,
          text: textBody,
          html: htmlBody
        })
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`[EmailService] Contact enquiry sent to ${ownerEmail} via Resend. ID: ${data.id}`);
        return { success: true, status: 'sent', provider: 'resend', messageId: data.id, replyTo: email };
      } else {
        const errText = await res.text();
        console.error('[EmailService] Resend API error:', errText);
      }
    } catch (err) {
      console.error('[EmailService] Resend request failed:', err.message);
    }
  }

  // 2. Try SendGrid if configured
  if (process.env.SENDGRID_API_KEY) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: ownerEmail }] }],
          from: { email: process.env.SENDGRID_FROM || 'info@wealthacumen.in', name: 'Wealth Acumen' },
          reply_to: { email: email, name: name },
          subject: emailSubject,
          content: [
            { type: 'text/plain', value: textBody },
            { type: 'text/html', value: htmlBody }
          ]
        })
      });

      if (res.status === 202) {
        console.log(`[EmailService] Contact enquiry sent to ${ownerEmail} via SendGrid.`);
        return { success: true, status: 'sent', provider: 'sendgrid', replyTo: email };
      }
    } catch (err) {
      console.error('[EmailService] SendGrid request failed:', err.message);
    }
  }

  // 3. Try Standard SMTP via Nodemailer
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const port = parseInt(process.env.SMTP_PORT || '587', 10);
      const isSecure = process.env.SMTP_SECURE === 'true' || port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: port,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        connectionTimeout: 10000,
        greetingTimeout: 5000,
        socketTimeout: 15000
      });

      const fromAddress = process.env.SMTP_FROM || `"Wealth Acumen Contact" <${smtpUser}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to: ownerEmail,
        replyTo: replyToAddress,
        subject: emailSubject,
        text: textBody,
        html: htmlBody
      });

      console.log(`[EmailService] Contact enquiry sent to ${ownerEmail} via SMTP (${smtpHost}). MessageId: ${info.messageId}`);
      return { success: true, status: 'sent', provider: 'smtp', messageId: info.messageId, replyTo: email };
    } catch (err) {
      console.error('[EmailService] SMTP email dispatch failed:', err.message);
      return { success: false, status: 'failed', provider: 'smtp', error: err.message, replyTo: email };
    }
  }

  // 4. Fallback when credentials are not yet configured in .env
  console.log(`[EmailService] OWNER_EMAIL is configured as: ${ownerEmail}`);
  console.log('[EmailService] Notice: SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) or API key not yet set in .env.');
  console.log(`[EmailService] Notification Reply-To configured as: ${email}`);
  console.log('[EmailService] Enquiry record has been saved safely to data/contact-enquiries.json.');

  return {
    success: false,
    status: 'pending_smtp_configuration',
    message: 'Enquiry captured successfully. Live email dispatch awaiting SMTP credentials in .env.',
    replyTo: email
  };
}
