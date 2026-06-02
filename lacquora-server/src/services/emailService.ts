import nodemailer from 'nodemailer'
import { env } from '../config/env'

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
})

function formatSpec(spec: Record<string, string>): string {
  return Object.entries(spec)
    .map(([k, v]) => `  ${k.padEnd(12)}: ${v}`)
    .join('\n')
}

// ── Customer confirmation ──────────────────────────────────────
export async function sendOrderConfirmation(opts: {
  to: string
  name: string
  referenceNo: string
  bodyShape: string
  woodMaterial: string
  craftType: string
  pdfPath?: string
}): Promise<void> {
  await transporter.sendMail({
    from: env.smtp.from,
    to: opts.to,
    subject: `LACQUORA — Your enquiry has been received (${opts.referenceNo})`,
    text: `
Dear ${opts.name},

Thank you for your enquiry. We have received your custom guitar specification and will review it within 3 business days.

Reference: ${opts.referenceNo}

Specification Summary:
  Body Shape : ${opts.bodyShape}
  Tonewood   : ${opts.woodMaterial}
  Craft      : ${opts.craftType}

A member of our team will be in touch with you directly.

—
LACQUORA Studio
漆境工坊
studio@lacquora.com
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<body style="background:#0A0A0A;color:#F5F0EB;font-family:Helvetica,Arial,sans-serif;padding:48px 40px;max-width:600px;margin:0 auto">
  <div style="font-size:20px;letter-spacing:0.3em;margin-bottom:2px">LACQUORA</div>
  <div style="font-size:10px;letter-spacing:0.4em;color:#4A4A4A;margin-bottom:40px">漆 境</div>
  <div style="width:48px;height:1px;background:#C9A84C;margin-bottom:32px"></div>

  <p style="font-size:14px;color:#ACACAC;margin-bottom:24px">Dear ${opts.name},</p>

  <p style="font-size:14px;color:#ACACAC;line-height:1.8;margin-bottom:32px">
    Thank you for your enquiry. We have received your custom guitar specification
    and will review it within <strong style="color:#F5F0EB">3 business days</strong>.
  </p>

  <div style="background:#141414;border:1px solid #2C2C2C;padding:24px;margin-bottom:32px">
    <div style="font-family:monospace;font-size:9px;letter-spacing:0.12em;color:#4A4A4A;margin-bottom:16px">REFERENCE</div>
    <div style="font-family:monospace;font-size:18px;color:#C9A84C">${opts.referenceNo}</div>
  </div>

  <div style="background:#141414;border:1px solid #2C2C2C;padding:24px;margin-bottom:40px">
    <div style="font-family:monospace;font-size:9px;letter-spacing:0.12em;color:#4A4A4A;margin-bottom:16px">YOUR SPECIFICATION</div>
    ${[
      ['Body Shape', opts.bodyShape],
      ['Tonewood', opts.woodMaterial],
      ['Craft & Finish', opts.craftType],
    ].map(([k, v]) => `
      <div style="display:flex;justify-content:space-between;border-bottom:1px solid #2C2C2C;padding:10px 0">
        <span style="font-family:monospace;font-size:10px;color:#4A4A4A">${k}</span>
        <span style="font-family:monospace;font-size:10px;color:#F5F0EB">${v?.toUpperCase()}</span>
      </div>`).join('')}
  </div>

  <p style="font-size:12px;color:#4A4A4A;line-height:1.7">
    A member of our team will contact you directly to discuss your project in detail.
  </p>

  <div style="margin-top:48px;padding-top:24px;border-top:1px solid #2C2C2C">
    <div style="font-size:11px;color:#2C2C2C;font-family:monospace">LACQUORA Studio · studio@lacquora.com</div>
  </div>
</body>
</html>
    `,
    attachments: opts.pdfPath
      ? [{ filename: `LACQUORA-${opts.referenceNo}.pdf`, path: opts.pdfPath }]
      : [],
  })
}

// ── Admin notification ─────────────────────────────────────────
export async function sendAdminNotification(opts: {
  referenceNo: string
  customerName: string
  customerEmail: string
  customerCountry: string
  bodyShape: string
  woodMaterial: string
  craftType: string
  notes?: string
  pdfPath?: string
}): Promise<void> {
  await transporter.sendMail({
    from: env.smtp.from,
    to: env.smtp.admin,
    subject: `[NEW ORDER] ${opts.referenceNo} — ${opts.customerName} (${opts.customerCountry})`,
    text: `
New custom order enquiry received.

Reference : ${opts.referenceNo}
Customer  : ${opts.customerName} <${opts.customerEmail}>
Country   : ${opts.customerCountry}

Specification:
  Body Shape : ${opts.bodyShape}
  Tonewood   : ${opts.woodMaterial}
  Craft      : ${opts.craftType}

Notes:
${opts.notes || '(none)'}

Admin panel: http://localhost:3001/admin/custom-orders
    `.trim(),
    attachments: opts.pdfPath
      ? [{ filename: `LACQUORA-${opts.referenceNo}.pdf`, path: opts.pdfPath }]
      : [],
  })
}

// ── Inquiry notification ───────────────────────────────────────
export async function sendInquiryNotification(opts: {
  name: string
  email: string
  country: string
  type: string
  message: string
}): Promise<void> {
  await transporter.sendMail({
    from: env.smtp.from,
    to: env.smtp.admin,
    subject: `[INQUIRY/${opts.type.toUpperCase()}] ${opts.name} (${opts.country})`,
    text: `
From    : ${opts.name} <${opts.email}>
Country : ${opts.country}
Type    : ${opts.type}

Message:
${opts.message}
    `.trim(),
  })
}

export async function verifySmtp(): Promise<void> {
  if (env.smtp.user && env.smtp.pass) {
    await transporter.verify()
    console.log('✓ SMTP connected')
  } else {
    console.log('⚠ SMTP not configured — emails will not be sent')
  }
}
