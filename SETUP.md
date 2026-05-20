# NOTEZO — Complete Setup & Deployment Guide

## 📁 Project Files

```
notezo/
├── index.html          ← Main website
├── style.css           ← All styles
├── script.js           ← All JavaScript logic
├── apps-script.gs      ← Google Apps Script backend
└── SETUP.md            ← This guide
```

---

## 🚀 Step 1 — Google Sheets Setup

1. Go to **[sheets.google.com](https://sheets.google.com)**
2. Create a new spreadsheet
3. Name it: **NOTEZO Orders**
4. Leave it open — the Apps Script will auto-create the "Orders" sheet tab with headers.

---

## ⚙️ Step 2 — Google Apps Script Deployment

### 2a. Open Apps Script
1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all existing code in `Code.gs`
3. Copy the entire contents of `apps-script.gs` and paste it

### 2b. Deploy as Web App
1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" → choose **Web App**
3. Set:
   - **Description:** NOTEZO Order API v1
   - **Execute as:** Me (your Gmail)
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorize permissions when prompted (click "Advanced" → proceed)
6. **Copy the Web App URL** — it looks like:  
   `https://script.google.com/macros/s/AKfyc.../exec`

---

## 🔗 Step 3 — Connect Frontend to Google Sheets

1. Open **`script.js`** in any text editor
2. Find line 7:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
   ```
3. Replace `YOUR_SCRIPT_ID` with the actual URL you copied
4. Save the file

---

## 🧪 Step 4 — Test the Integration

1. Open `index.html` in a browser (or use Live Server in VS Code)
2. Navigate to the **Order** section
3. Fill in all fields and click **Place Order**
4. Check your Google Sheet — a new row should appear within seconds!

---

## 🔒 Step 5 — Privacy & Security

The Google Sheet remains **100% private**:
- Only you (the admin) have access via your Google account
- The Web App URL only **writes** data, cannot be used to read/view the sheet
- Customers never see the sheet — they only get an Order ID
- WhatsApp is used for all payment and confirmation communication

To add extra security:
- Periodically change the Apps Script deployment (create a new version)
- Keep the Web App URL confidential

---

## 📱 Step 6 — WhatsApp Integration

The website already has:
- ✅ Floating WhatsApp button (bottom-right)
- ✅ Success modal with WhatsApp link after order
- ✅ Pre-filled WhatsApp message with Order ID
- ✅ WhatsApp CTA in the hero section

WhatsApp number is set to: **+91 8110827632**  
To change it, edit line 8 in `script.js`:
```javascript
const WHATSAPP_NUMBER = "918110827632"; // No + sign, with country code
```

---

## 🌐 Deployment Options

### Option A: GitHub Pages (Free)
1. Create a GitHub account
2. Create a new repository (e.g., `notezo-website`)
3. Upload `index.html`, `style.css`, `script.js`
4. Go to **Settings → Pages → Source: main branch**
5. Your site will be live at: `https://yourusername.github.io/notezo-website`

### Option B: Netlify (Free, Recommended)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag & drop your project folder onto Netlify's dashboard
3. Done! Live in seconds with a custom URL

### Option C: Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Connect GitHub repo or drag & drop files
3. Deploy instantly

### Option D: Shared Hosting
1. Upload `index.html`, `style.css`, `script.js` to your `public_html` folder
2. Access via your domain

---

## 🎨 Customization Guide

### Change Colors
Open `style.css` and edit the `:root` variables:
```css
:root {
  --neon-pink: #ec4899;    /* Primary accent */
  --neon-cyan: #22d3ee;    /* Secondary accent */
  --neon-purple: #a855f7;  /* Tertiary accent */
  --bg: #050816;           /* Main background */
}
```

### Add/Edit Services
Open `script.js` and edit the `services` array (around line 18).

### Change WhatsApp Number
In `script.js`, update:
```javascript
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
```

### Update Contact Details
Search for the contact section in `index.html` and update:
- WhatsApp number
- Email address
- Instagram handle

---

## 🔄 Re-deploying Apps Script (After Changes)

If you edit the Apps Script code:
1. Go back to script.google.com
2. Click **Deploy → Manage deployments**
3. Click the pencil icon (edit)
4. Change version to **"New version"**
5. Click **Deploy**
6. The URL stays the same — no changes needed in frontend

---

## 📊 Google Sheets Column Reference

| Column | Data |
|--------|------|
| A | Order ID (e.g., NZ-LXYZ123-ABCD) |
| B | Date & Time |
| C | Customer Name |
| D | Phone Number |
| E | Email Address |
| F | Service Name |
| G | Quantity / Pages |
| H | Total Amount |
| I | Additional Notes |
| J | Order Status (default: Pending) |

---

## ❓ Troubleshooting

**Orders not saving to sheet?**
- Make sure you deployed with "Anyone" access
- Check the URL in `script.js` is the correct Web App URL
- Try opening the URL in a browser — should return `{"status":"NOTEZO API is running"}`

**WhatsApp button not working on mobile?**
- Ensure the number format is correct: `91XXXXXXXXXX` (country code + number, no +, no spaces)

**Animations not working?**
- Ensure `script.js` is linked correctly in `index.html`
- Check browser console for JavaScript errors

**Form not submitting?**
- Verify all required fields are filled
- Check browser console for errors

---

## 📞 Support

For any issues or customizations:
- WhatsApp: +91 8110827632
- Email: notezo.official@gmail.com
- Instagram: @notezo_official

---

*NOTEZO — Premium Digital Services © 2025*
