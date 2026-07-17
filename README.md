# 🏨 Pinnamount Escapes — Auth Package

A complete, production-ready authentication system for Pinnamount Escapes.
Built with **Next.js 14**, **Supabase**, and **Tailwind CSS**.

---

## ✅ What's Included

- **Sign Up** — Full name, phone, email, password
- **Sign In** — Email + password with error handling
- **Stay Signed In** — Middleware auto-refreshes session (user never gets logged out randomly)
- **Email Verification** — Confirmation email on signup
- **Dashboard** — Protected page showing user info + quick actions
- **Profile Page** — Edit name/phone, view account details
- **Sign Out** — One click, redirects to homepage
- **Delete Account** — Permanently removes all user data with confirmation prompt
- **Route Protection** — Unauthenticated users redirected to sign in automatically

---

## 🚀 Setup Instructions

### Step 1 — Clone or download this repo

### Step 2 — Install dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3 — Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to **Project Settings → API**
3. Copy your **Project URL** and **Anon Key**

### Step 4 — Create environment variables
\`\`\`bash
cp .env.local.example .env.local
\`\`\`
Then fill in your real values in `.env.local`:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### Step 5 — Configure Supabase Auth
In Supabase Dashboard → **Authentication → URL Configuration**:
- **Site URL:** `http://localhost:3000` (change to your live domain when deployed)
- **Redirect URLs:** Add `http://localhost:3000/**`

### Step 6 — Run locally
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy to Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Select your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Add environment variables in Netlify → Site Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://yoursite.netlify.app`
6. Deploy!
7. Update Supabase URL Configuration with your Netlify domain

---

## 📁 File Structure

\`\`\`
pinnamount-auth/
├── app/
│   ├── auth/
│   │   ├── actions.ts          ← All auth server actions (signin, signup, signout, delete)
│   │   ├── callback/route.ts   ← Email verification callback
│   │   ├── signin/page.tsx     ← Sign in page
│   │   ├── signup/page.tsx     ← Sign up page
│   │   └── verify-email/page.tsx ← Post-signup email notice
│   ├── dashboard/page.tsx      ← Protected dashboard
│   ├── profile/page.tsx        ← Profile + delete account
│   ├── globals.css             ← Navy + Gold styling
│   ├── layout.tsx              ← Root layout
│   └── page.tsx                ← Homepage
├── lib/
│   └── supabase/
│       ├── client.ts           ← Browser Supabase client
│       └── server.ts           ← Server Supabase client
├── middleware.ts                ← Session refresh + route protection
├── .env.local.example          ← Environment variables template
├── next.config.js
├── tailwind.config.ts
└── package.json
\`\`\`

---

## 🔐 How "Stay Signed In" Works

The `middleware.ts` file runs on every page request and automatically:
1. Refreshes the user's session token
2. Keeps cookies updated
3. Redirects unauthenticated users away from protected pages
4. Redirects signed-in users away from auth pages

This means users stay signed in indefinitely until they explicitly sign out.

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#0A1628` | Background |
| Warm Gold | `#C9A84C` | Accents, buttons |
| Gold Light | `#E8C96A` | Hover states |

---

## 👑 Pinnamount Escapes — A Pinnamount Legacy Universal Property
