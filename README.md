# Rahmathullah U — Portfolio

A modern Data Analyst portfolio built with HTML, CSS, and vanilla JavaScript.

## ✅ Features
- Animated particle background
- Section transitions & reveal animations
- Glassmorphism card design
- Fully functional contact form (via EmailJS)
- Power BI dashboard lightbox
- Light / Dark mode toggle
- Fully responsive (mobile, tablet, desktop)

---

## 📧 Activating the Contact Form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/) — **no backend required**, free up to 200 emails/month.

### Steps:
1. Sign up at https://www.emailjs.com/
2. Go to **Email Services** → Add a service (Gmail, Outlook, etc.)
3. Go to **Email Templates** → Create a template with these variables:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   Body: {{message}}
   ```
4. Go to **Account → API Keys** → copy your **Public Key**
5. Open `app.js` and replace the three constants at the top:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

---

## 🖼️ Adding Your Power BI Dashboard Screenshot

1. Export your dashboard as a PNG/JPG screenshot
2. Save it as `img/dashboard-preview.png`
3. The lightbox will automatically display it when visitors click **Preview**

---

## 🚀 Project Structure

```
portfolio/
├── index.html              ← Main HTML file
├── app.js                  ← JavaScript (navigation, particles, form)
├── .gitignore
├── Rahmathullah-Profile.pdf
├── styles/
│   └── styles.css          ← Main stylesheet
└── img/
    ├── prof.jpg             ← Your photo
    └── dashboard-preview.png ← Add your Power BI screenshot here
```

---

## 🔧 Deploying

Works as a static site on:
- **GitHub Pages** (push to `main` → enable Pages in Settings)
- **Netlify** (drag-and-drop the folder)
- **Vercel** (connect your GitHub repo)
