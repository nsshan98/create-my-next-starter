# create-my-next-starter

A custom CLI to generate **Next.js projects** with optional UI setups:

- Tailwind only
- ShadCN UI
- Material UI (MUI)

This CLI simplifies creating a Next.js project with your preferred UI and pre-installed dependencies and boilerplate structure.

---

## Features

- Installs the latest Next.js app with `--app`, Tailwind, and ESLint support.
- Allows selection of UI library:

  - **Tailwind only** – minimal setup with TailwindCSS.
  - **ShadCN UI** – preconfigured with shadcn-ui components.
  - **Material UI (MUI)** – includes MUI core and icons.

- Installs essential dependencies for React forms, API calls, and state management.
- Automatically merges selected boilerplate into your project `src/components`.
- Initializes ShadCN UI if selected.
- Works with **npm**, **pnpm**, or **yarn**.

---

## Quick Start (Recommended)

You can use this CLI **without installing it globally** using `npx`:

```bash
npx create-my-next-starter my-app
```

> Replace `my-app` with your desired project folder name.

### Steps:

1. Select the package manager (npm / pnpm / yarn) when prompted.
2. Select a UI library (Tailwind only / ShadCN UI / Material UI).
3. CLI installs the latest Next.js project.
4. Installs extra dependencies and merges the selected boilerplate.
5. Initializes ShadCN UI if selected.

---

## Optional: Global Installation

If you want to reuse the CLI multiple times without `npx`, you can install it globally:

```bash
npm install -g create-my-next-starter
# or
pnpm add -g create-my-next-starter
# or
yarn global add create-my-next-starter
```

Then run:

```bash
create-my-next-starter my-app
```

---

## Project Structure

```
my-app/
├── app/                           # Next.js routes
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   ├── dashboard/
│   │   ├── page.tsx                # Dashboard page
│   │   └── loading.tsx             # Loading state for dashboard
│   └── ...
├── src/
│   ├── components/                 # Shared UI components (Atomic Design)
│   │   ├── atoms/                  # Smallest reusable UI parts (buttons, inputs, icons)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── molecules/              # Groups of atoms (forms, cards, modals)
│   │   ├── organisms/              # Large UI sections (headers, sidebars)
│   │   └── ui/                     # shadcn-generated components
│   ├── features/                   # Feature-specific components + logic
│   │   ├── auth/
│   │   │   ├── components/         # Feature-specific UI
│   │   │   ├── hooks/              # Feature-specific hooks
│   │   │   └── utils/              # Feature-specific helpers
│   │   └── dashboard/
│   │       └── ...
│   ├── hooks/                      # Global custom hooks
│   │   ├── useAuth.ts
│   │   ├── useMediaQuery.ts
│   │   └── ...
│   ├── lib/                        # Utilities, API clients, constants
│   │   ├── axios-client.ts
│   │   ├── fetch-client.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── styles/                     # Global styles
│   │   ├── globals.css             # Tailwind base styles
│   │   └── variables.css
│   ├── types/                      # Global TypeScript types
│   │   ├── user.ts
│   │   └── index.ts
│   └── zod/                        # Validation schemas
│       ├── auth-schema.ts
│       └── ...
├── public/
│   └── favicon.ico
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── ...
```

---

## Dependencies Installed

**Common (all UIs):**

- react-hook-form
- @hookform/resolvers
- axios
- @tanstack/react-query

**Tailwind only:**

- tailwindcss, postcss, autoprefixer
- react-icons

**ShadCN UI:**

- lucide-react, clsx, tailwind-merge, class-variance-authority, shadcn-ui

**Material UI (MUI):**

- @mui/material, @mui/icons-material, @emotion/react, @emotion/styled

**Dev dependencies:**

- zod, standard-version

> Note: `react-icons` is **not needed for MUI** projects.

---

## License

MIT
