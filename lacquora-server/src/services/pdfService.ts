import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { env } from '../config/env'

interface OrderSpec {
  referenceNo: string
  bodyShape: string
  woodMaterial: string
  craftType: string
  hardwareConfig: Record<string, string>
  notes?: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerCountry: string
  createdAt: string
}

function buildHtml(order: OrderSpec): string {
  const craftLabels: Record<string, string> = {
    standard: 'Standard Nitrocellulose',
    lacquer: 'Urushi — 大漆',
    gold_carving: 'Qian Jin — 戗金',
    mother_of_pearl: '螺钿 — Mother of Pearl',
    urushi: 'Maki-e — 莳绘',
    custom_artwork: 'Custom Artwork',
  }

  const bodyLabels: Record<string, string> = {
    strat: 'Stratocaster', tele: 'Telecaster', super_strat: 'Super Strat',
    flying_v: 'Flying V', explorer: 'Explorer', headless: 'Headless', custom: 'Custom Shape',
  }

  const rows = [
    ['Body Shape',  bodyLabels[order.bodyShape]  ?? order.bodyShape],
    ['Tonewood',    order.woodMaterial.toUpperCase()],
    ['Craft/Finish',craftLabels[order.craftType] ?? order.craftType],
    ['Bridge',      order.hardwareConfig.bridge  ?? '—'],
    ['Pickups',     order.hardwareConfig.pickups ?? '—'],
    ['Neck',        order.hardwareConfig.neck    ?? '—'],
    ['Fretboard',   order.hardwareConfig.fretboard ?? '—'],
  ]

  const tableRows = rows
    .map(([k, v]) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #2C2C2C;color:#6E6E6E;
                   font-family:monospace;font-size:10px;letter-spacing:0.1em;
                   text-transform:uppercase;width:40%">${k}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #2C2C2C;color:#F5F0EB;
                   font-family:monospace;font-size:11px">${v}</td>
      </tr>`)
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      background:#0A0A0A; color:#F5F0EB;
      font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
      padding:60px 56px; min-height:297mm;
    }
    .logo { font-size:22px; letter-spacing:0.3em; color:#F5F0EB; margin-bottom:4px; }
    .logo-zh { font-size:11px; letter-spacing:0.4em; color:#6E6E6E; margin-bottom:48px; }
    .ref { font-family:monospace; font-size:10px; letter-spacing:0.12em;
           color:#C9A84C; margin-bottom:6px; }
    h1 { font-size:28px; font-weight:300; letter-spacing:-0.02em;
         color:#F5F0EB; margin-bottom:8px; }
    .date { font-family:monospace; font-size:10px; color:#4A4A4A; margin-bottom:48px; }
    .section-title {
      font-family:monospace; font-size:9px; letter-spacing:0.15em;
      color:#4A4A4A; text-transform:uppercase; margin-bottom:16px;
      padding-bottom:8px; border-bottom:1px solid #2C2C2C;
    }
    table { width:100%; border-collapse:collapse; margin-bottom:40px; }
    .customer-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:40px; }
    .field-label { font-family:monospace; font-size:9px; letter-spacing:0.12em;
                   color:#4A4A4A; text-transform:uppercase; margin-bottom:6px; }
    .field-value { font-family:monospace; font-size:12px; color:#ACACAC; }
    .notes-box { background:#141414; border:1px solid #2C2C2C; padding:16px;
                 font-size:12px; color:#ACACAC; line-height:1.7; margin-bottom:40px; }
    .footer {
      margin-top:auto; padding-top:32px; border-top:1px solid #2C2C2C;
      display:flex; justify-content:space-between; align-items:flex-end;
    }
    .footer-text { font-family:monospace; font-size:9px; color:#2C2C2C; letter-spacing:0.08em; }
    .gold-line { width:48px; height:1px; background:linear-gradient(90deg,#C9A84C,transparent);
                 margin-bottom:32px; }
  </style>
</head>
<body>
  <div class="logo">LACQUORA</div>
  <div class="logo-zh">漆 境</div>

  <div class="ref">QUOTE REQUEST · ${order.referenceNo}</div>
  <h1>Custom Guitar Enquiry</h1>
  <div class="date">${new Date(order.createdAt).toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' })}</div>

  <div class="gold-line"></div>

  <div class="section-title">Instrument Specification</div>
  <table>${tableRows}</table>

  ${order.notes ? `
  <div class="section-title">Notes & References</div>
  <div class="notes-box">${order.notes.replace(/\n/g, '<br/>')}</div>
  ` : ''}

  <div class="section-title">Client Information</div>
  <div class="customer-grid">
    <div>
      <div class="field-label">Name</div>
      <div class="field-value">${order.customerName}</div>
    </div>
    <div>
      <div class="field-label">Email</div>
      <div class="field-value">${order.customerEmail}</div>
    </div>
    <div>
      <div class="field-label">Phone</div>
      <div class="field-value">${order.customerPhone || '—'}</div>
    </div>
    <div>
      <div class="field-label">Country</div>
      <div class="field-value">${order.customerCountry}</div>
    </div>
  </div>

  <div class="footer">
    <div>
      <div class="footer-text">LACQUORA Studio · studio@lacquora.com</div>
      <div class="footer-text" style="margin-top:4px">This document is a quote request record, not a confirmed order.</div>
    </div>
    <div class="footer-text">${order.referenceNo}</div>
  </div>
</body>
</html>`
}

export async function generateOrderPdf(order: OrderSpec): Promise<string> {
  const uploadsDir = path.resolve(env.upload.dir, 'pdfs')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

  const filename = `order-${order.referenceNo}.pdf`
  const outputPath = path.join(uploadsDir, filename)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.setContent(buildHtml(order), { waitUntil: 'networkidle0' })
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })
  } finally {
    await browser.close()
  }

  return outputPath
}
