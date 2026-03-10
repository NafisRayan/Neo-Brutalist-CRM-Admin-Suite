# BrutalSuite Admin Dashboard (React + Vite)

This repository hosts a client-side admin dashboard built with **React 19** and **Vite**. It uses Tailwind CSS for styling and includes a mock data store that simulates a CRM-style admin interface. The application is designed for demonstration or prototyping purposes and does not currently interact with a backend service.

---

## 🚀 Features

- **Authentication screen** with theme toggle (light/dark)
- **Sidebar navigation** and multiple views:
  - Dashboard
  - User Directory
  - Analytics
  - Roles
  - Teams
  - Settings
  - Profile
- **Mock data sets** for users, automation rules, logs, permissions, notifications, analytics, etc.
- **Global search**, notifications dropdown, audit logs
- **Persisted state** via `localStorage` (users, settings, rules, etc.)
- **Dark mode** toggling
- **Animations** using Motion
- **Tailwind CSS** for utility-first styling with a custom design system (Neo components)

> ✨ The UI is entirely client-rendered and powered by React hooks and context-free state.

---

## 📁 Project Structure

```
├── index.html               # main HTML template used by Vite
├── package.json             # npm scripts & dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration (alias, env vars, tailwind plugin)
├── src/                     # application source files
│   ├── App.tsx              # root React component
│   ├── main.tsx             # entry point
│   ├── index.css            # global styles (Tailwind)
│   ├── types.ts             # TypeScript type definitions
│   ├── mockData.ts          # fake data used throughout the UI
│   ├── components/          # reusable UI elements
│   │   ├── auth/            # login screen
│   │   ├── layout/          # header, footer, sidebar, etc.
│   │   ├── ui/              # buttons, cards, modal, etc.
│   │   └── views/           # each page/view component
│   └── ...
├── .gitignore
└── README.md                # this file
```

> **Note:** There is no backend code in this repo. Some dependencies (e.g. `express`, `better-sqlite3`) are declared but not used.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (or later) / npm
- Git (optional)

### Installation

```bash
# clone the repository (if not already present)
git clone <repo-url>
cd crm\ brutalsuite-admin

# install dependencies
npm install
```

> `package-lock.json` is included, so a simple `npm ci` also works.

### Environment Variables

An `.env` file may be used for configuration. The only environment variable currently consumed is:

```
GEMINI_API_KEY   # used in vite.config.ts for build-time injection
```

A sample `.env.example` file is included and the `.gitignore` prevents committing real secrets.

### Development

Start the Vite development server:

```bash
npm run dev
```

The app will be accessible at `http://localhost:3000` and supports hot module replacement unless `DISABLE_HMR=true` is set.

### Building & Previewing

```bash
# production build
npm run build

# preview the production build locally
npm run preview
```

### Linting / Type Checking

```bash
npm run lint
```

This runs `tsc --noEmit` to ensure there are no TypeScript errors.

---

## 📦 Dependencies

- `react` / `react-dom` — UI library
- `vite` — build tool
- `@vitejs/plugin-react` — React support for Vite
- `tailwindcss` + `@tailwindcss/vite` — styling
- `motion` — animations
- `lucide-react` — icon set
- `recharts` — charts in analytics view

> Dev dependencies include TypeScript types and tooling.

---

## 📝 Notes

- All data is stored in browser `localStorage`. Clearing local storage will reset the UI to its mock state.
- The codebase is deliberately simple; adapt or extend with real APIs or backend integration as needed.
- Feel free to remove unused dependencies before shipping.

---

## 🤝 Contributions

This project appears to be a prototype/demo. If you plan to extend it or turn it into a production-grade dashboard, consider:

1. Adding a proper backend with authentication.
2. Replacing mock data with real API calls.
3. Cleaning up dependencies and folder structure.
4. Adding tests (unit/integration) and a build pipeline.

---

## 🧾 License

Specify license information here if applicable (MIT, etc.).

---

Thanks for checking out the BrutalSuite Admin Dashboard! 🎉
