# Allianz Dog Insurance - Static Website

A modern, static website for Allianz dog insurance lead generation, deployable to GitHub Pages.

## Features

- 7-step interactive quiz for collecting dog insurance leads
- Email notifications via EmailJS (to agency and customer confirmation)
- Fully responsive design with Allianz branding
- Tailwind CSS + shadcn/ui components
- Framer Motion animations
- No backend required - completely static

## Prerequisites

- Node.js 20.19+ or 22.12+ (for Vite 7)
- npm 10+
- EmailJS account (free tier: 200 emails/month)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

**Note:** If you encounter npm errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. Configure EmailJS

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Add an email service (Gmail, Outlook, or SMTP)
3. Create two email templates:

   **Admin Notification Template:**
   - Template Name: "New Dog Insurance Lead"
   - Subject: `New Dog Insurance Lead: {{dog_name}}`
   - Body: Include variables for all form fields (see `.env.example`)
   - To Email: `agentur.laeutek@allianz.de`

   **Customer Confirmation Template:**
   - Template Name: "Thank You - Dog Insurance Inquiry"
   - Subject: `Vielen Dank für Ihr Interesse an Hundekrankenversicherung`
   - Body: Personalized thank you message using `{{first_name}}` and `{{dog_name}}`
   - To Email: `{{to_email}}` (customer's email)
   - Reply-To: `agentur.laeutek@allianz.de`

4. Copy Service ID, Template IDs, and Public Key

### 3. Set Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=your_customer_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Local Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## GitHub Pages Deployment

### One-Time Setup

1. Push your code to a GitHub repository
2. Go to repository **Settings > Pages**
3. Under "Build and deployment", select **Source: GitHub Actions**
4. Add your EmailJS credentials to **Settings > Secrets and variables > Actions**:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_ADMIN_TEMPLATE_ID`
   - `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build the site on every push to `main`
- Deploy to GitHub Pages
- Your site will be live at: `https://yourusername.github.io/Allianz-Dog/`

### Custom Domain (Optional)

1. Add a `CNAME` file to `client/public/` with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## Project Structure

```
Allianz-Dog/
├── client/                  # Frontend source code
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities and schemas
│   │   ├── pages/          # Page components
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   └── index.html          # HTML template
├── .github/workflows/      # GitHub Actions
├── dist/                   # Build output (gitignored)
├── .env.example            # Environment variables template
├── .env.local              # Your credentials (gitignored)
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type-check TypeScript |

## EmailJS Template Variables

### Admin Notification Template

Use these variables in your EmailJS admin template:

- `{{dog_name}}` - Dog's name
- `{{termination_protection}}` - "important" or "not_important"
- `{{coverage_amount}}` - "unlimited", "800", "400", or "0"
- `{{monthly_budget}}` - "30-60", "60-80", "80-100", or "100-120"
- `{{dog_age}}` - "0-2", "3", "4", "5", "6", "7-9", or "10+"
- `{{dog_breed}}` - Dog's breed
- `{{first_name}}` - Customer first name
- `{{last_name}}` - Customer last name
- `{{email}}` - Customer email
- `{{phone}}` - Customer phone
- `{{to_email}}` - Always "agentur.laeutek@allianz.de"

### Customer Confirmation Template

- `{{first_name}}` - Customer first name
- `{{dog_name}}` - Dog's name
- `{{to_email}}` - Customer's email
- `{{reply_to}}` - Customer's email (for reply-to)

## Troubleshooting

### npm install fails

If you see errors like "ERR_INVALID_ARG_TYPE", try:
1. Update Node.js to version 20.19+ or 22.12+
2. Update npm: `npm install -g npm@latest`
3. Clear cache: `npm cache clean --force`
4. Delete `node_modules` and `package-lock.json`, then reinstall

### Build fails

1. Make sure all environment variables are set in `.env.local`
2. Check TypeScript errors: `npm run check`
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Emails not sending

1. Verify EmailJS credentials in `.env.local`
2. Check EmailJS dashboard for quota limits (free tier: 200/month)
3. Check browser console for errors
4. Verify template IDs match in EmailJS dashboard

### GitHub Pages not deploying

1. Ensure GitHub Pages is enabled (Settings > Pages > Source: GitHub Actions)
2. Check that GitHub secrets are set correctly
3. View workflow runs in the "Actions" tab for error details

## Support

For issues or questions:
- Email: agentur.laeutek@allianz.de
- Phone: 089 1234 5678

## License

MIT
