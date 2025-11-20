# Personal Portfolio

Modern personal portfolio website built with React 19, TanStack Router, and Tailwind CSS v4.

## How It Was Built

- Bootstrapped with [Vite](https://vitejs.dev/) for [React](https://react.dev/).
- Web app iterated using the [Opencode](https://opencode.ai) client together with [Claude](https://claude.ai) and [OpenAI GPT-5.1](https://platform.openai.com/docs/models), orchestrated via [GitHub Copilot](https://github.com/features/copilot).

## Development

```bash
pnpm install
pnpm dev          # Run dev server on port 3000
pnpm build        # Build for production
pnpm check        # Lint and format with Biome
pnpm serve        # Preview production build
```

## Tech Stack

- **React 19** with TanStack Router (file-based routing)
- **Tailwind CSS v4** with shadcn/ui components
- **TypeScript** (strict mode)
- **Vite** for build tooling
- **Biome** for linting and formatting

## Content Management

Resume content is stored in `.temp/resume.json` and rendered through components in `src/components/`.
