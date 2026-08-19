# ForgeUI — Premium UI Components Library

> Build beautiful interfaces faster.

A premium library of production-ready UI components, crafted for modern developers. Copy, customize, ship.

**Live Demo:** https://forge-ui.vercel.app (deploy your own)

**65+ components** — Buttons, Inputs, Cards, Forms, Navigation, Loaders, Effects, Animations, Feedback, Layout.

## ✨ Features

- **Live Preview** — every component runs in sandboxed iframe, responsive controls
- **Live Code Editor** — edit HTML/CSS/JS and see instant result
- **Copy System** — copy per-language or all code, with tracking
- **Search** — instant search across name, description, tags
- **Likes & Favorites** — optimistic UI, per-user
- **Admin Dashboard** — stats, charts, CRUD with instant publish (no approval)
- **Security** — iframe sandbox isolation, Zod validation, bcrypt, JWT httpOnly
- **SEO** — unique URLs `/components/[slug]`, metadata, OG
- **Dark/Light + RTL** ready
- **Responsive** fully

## 🛠 Tech Stack

- Next.js 16 App Router + TypeScript
- TailwindCSS 3.4
- Drizzle ORM + SQLite (easily migratable to Postgres)
- JWT + bcryptjs + Zod
- Zustand, Lucide, Recharts, Framer Motion

## 📦 Quick Start

```bash
npm install
npx tsx scripts/seed.ts   # seed 65 components + admin user
npm run dev
```

Admin:
- Email: `admin@forgeui.com`
- Password: `admin123`

Or set env:
```
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=strongpass
JWT_SECRET=your-32-char-secret
```

## 🗂 Structure

```
app/ (routes + API)
components/ui (design system)
components/layout (navbar, providers)
lib/db (schema, client)
lib/auth
lib/seed (65 premium components)
```

## 🔒 Security

Component code never executes in main window — only inside `srcDoc` iframe `sandbox="allow-scripts"`. All inputs validated, SQL parameterized via Drizzle.

## 🚀 Deploy

```bash
npm run build
npm run start
```

Deploy to Vercel — just connect repo.

## 📝 License

MIT — use freely.

Built with craft in Ramadi, IQ.
