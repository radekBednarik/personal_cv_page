# Agent Guidelines

## Commands
- **Dev**: `pnpm dev` (runs on port 3000)
- **Build**: `pnpm build` (runs vite build + tsc)
- **Test**: `pnpm test` (all tests) or `pnpm test <file>` (single test)
- **Lint/Format**: `pnpm check` (runs biome check - lint + format)

## Code Style
- **Formatter**: Biome with tabs (indentStyle: tab), double quotes
- **TypeScript**: Strict mode enabled, no unused locals/parameters
- **Imports**: Use `@/*` alias for src imports (e.g., `@/components/Header`)
- **Components**: Default exports for route components, named exports for reusable components
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Types**: Prefer explicit types, avoid `any`
- **File organization**: Components in `src/components/`, routes in `src/routes/`, utils in `src/lib/`

## Framework & Libraries
- **React 19** with TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4 + class-variance-authority for variants
- **UI Components**: Use shadcn via `pnpx shadcn@latest add <component>`
- **Icons**: lucide-react

## Notes
- Route files must export `Route = createFileRoute('/path')({ component })`
- `src/routeTree.gen.ts` and `src/styles.css` are auto-generated (excluded from biome)
