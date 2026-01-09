# Allianz Dog Insurance - Static Website

A modern landing page with a 7-step quiz for collecting dog insurance leads. Sends emails to both the agency and customers automatically.

## Quick Start (5 Minutes)

### Option 1: With Conda (Recommended for Python Users)

```bash
# 1. Create conda environment with Node.js
conda create -n allianz-dog nodejs=20 -c conda-forge -y
conda activate allianz-dog

# 2. Navigate to project and install
cd c:/python_work/git/Allianz-Dog
npm install

# 3. Start the website
npm run dev
```

Open http://localhost:5173 🎉

### Option 2: With System Node.js

If you have Node.js 20+ already installed:

```bash
cd c:/python_work/git/Allianz-Dog
npm install
npm run dev
```

## What You Get

- ✅ **Landing page** with hero section, trust badges, reviews
- ✅ **7-step quiz** to collect customer information
- ✅ **Email notifications** to agency + customer confirmation
- ✅ **Responsive design** for mobile, tablet, desktop
- ✅ **Allianz branding** with corporate colors
- ✅ **Free hosting** on GitHub Pages
- ✅ **No backend** needed - completely static

## Making Changes

All code is in `client/src/`:

| File | What It Does |
|------|-------------|
| `pages/Home.tsx` | Landing page content |
| `components/Header.tsx` | Top navigation bar |
| `components/Footer.tsx` | Footer with contact info |
| `components/QuizWizard.tsx` | The 7-step quiz form |

**Changes auto-reload!** Save a file and see it instantly in your browser.

## Enable Email Sending

Right now emails won't send (needs setup). To enable:

### 1. Create EmailJS Account (Free)

Go to https://www.emailjs.com/ and sign up (200 emails/month free)

### 2. Add Email Service

- Click "Add Email Service"
- Connect Gmail, Outlook, or any email
- Save the service

### 3. Create 2 Email Templates

**Template 1: Admin Notification**
- Name: "New Dog Insurance Lead"
- Subject: `New Dog Insurance Lead: {{dog_name}}`
- Recipient: `agentur.laeutek@allianz.de`
- Body: Include all lead details (see template variables below)

**Template 2: Customer Confirmation**
- Name: "Thank You Message"
- Subject: `Vielen Dank für Ihr Interesse, {{first_name}}!`
- Recipient: `{{to_email}}` (customer's email)
- Body: Personalized thank you message

**Template Variables to Use:**
```
{{dog_name}}
{{first_name}}
{{last_name}}
{{email}}
{{phone}}
{{dog_breed}}
{{dog_age}}
{{coverage_amount}}
{{monthly_budget}}
{{termination_protection}}
{{to_email}}
```

### 4. Copy Your Credentials

In EmailJS dashboard:
- Find **Service ID** (e.g., `service_abc123`)
- Find **Template IDs** for both templates
- Find **Public Key** (Account → API Keys)

### 5. Update .env.local

Edit `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_def456
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6. Restart Dev Server

```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

Now try the quiz - emails will actually send! 📧

## Deploy to GitHub Pages

### One-Time Setup

**1. Enable GitHub Pages**
- Go to your repo on GitHub
- Settings → Pages
- Source: **GitHub Actions** (important!)

**2. Add Secrets**
- Settings → Secrets and variables → Actions
- Click "New repository secret"
- Add all 4 EmailJS credentials:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_ADMIN_TEMPLATE_ID`
  - `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

**3. Push to GitHub**

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

**4. Wait for Deployment**
- Go to "Actions" tab on GitHub
- Watch the deployment (takes ~2 minutes)
- Your site is live at: `https://yourusername.github.io/Allianz-Dog/`

### Auto-Deployment

Every time you push to `main`, GitHub automatically:
1. Builds your site
2. Deploys to GitHub Pages
3. Updates live within 2 minutes

## Common Commands

```bash
# Activate conda environment (if using conda)
conda activate allianz-dog

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npm run check
```

## Common Tasks

### Change Contact Email
Edit `client/src/components/Footer.tsx` - Line 42

### Change Phone Number
Edit `client/src/components/Footer.tsx` - Line 38

### Modify Quiz Questions
Edit `client/src/components/QuizWizard.tsx`

### Change Colors
Edit `tailwind.config.ts` or update Tailwind classes in components

### Add New Page
1. Create file in `client/src/pages/YourPage.tsx`
2. Add route in `client/src/App.tsx`

## Project Structure

```
Allianz-Dog/
├── client/                      # Your website code
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── QuizWizard.tsx
│   │   │   └── ui/             # 50+ UI components
│   │   ├── pages/
│   │   │   └── Home.tsx        # Landing page
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utils and validation
│   │   └── index.css           # Global styles
│   ├── public/                 # Static files
│   └── index.html
├── .github/workflows/          # Auto-deployment config
├── dist/                       # Built website (auto-generated)
├── .env.local                  # Your EmailJS credentials
└── README.md                   # This file
```

## Troubleshooting

### npm install fails

**Windows:**
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

**Mac/Linux:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Emails not sending

1. ✅ Check `.env.local` has correct EmailJS credentials
2. ✅ Check EmailJS dashboard - might have hit free tier limit (200/month)
3. ✅ Check browser console (F12) for error messages
4. ✅ Verify template IDs match in EmailJS dashboard

### Site not updating on GitHub Pages

1. Go to "Actions" tab - check for deployment errors
2. Verify GitHub secrets are set correctly
3. Try pushing an empty commit: `git commit --allow-empty -m "Trigger deploy"`

### Changes not showing in browser

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Check dev server is running
3. Clear browser cache

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **EmailJS** - Email delivery
- **Vite** - Build tool
- **GitHub Pages** - Hosting

## Support

**Email:** agentur.laeutek@allianz.de
**Phone:** 02191 5657580
**Address:** Kölner Straße 231, 42897 Remscheid

## License
