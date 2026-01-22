# Agent Guidelines for vibe-groceries

This document provides essential guidelines for agentic coding working in this repository.

## Project Overview

This is a React 19 shopping list application built with Vite. The app uses localStorage for persistence and supports URL-based list sharing. Key features include adding/removing items, quantity management, category filtering, and two modes: edit and shop.

## Development Commands

**Development Server:**
```bash
npm run dev
```

**Build for Production:**
```bash
npm run build
```

**Linting:**
```bash
npm run lint
```

**Preview Production Build:**
```bash
npm run preview
```

**Running Single Tests:**
Currently no test framework is configured. If adding tests, use Vitest (recommended for Vite) and run with:
```bash
npm test -- --run <test-file>
```

**After Making Changes:**
Always run `npm run lint` before submitting changes to ensure code quality.

## Code Style Guidelines

### File Structure
- Main component: `src/App.jsx` (517 lines)
- Entry point: `src/main.jsx`
- Styles: `src/App.css`, `src/index.css`
- Use `.jsx` extension for React components

### Import Order
1. React hooks and built-ins
2. Local CSS files
3. Custom components/modules

Example:
```jsx
import { useEffect, useMemo, useState } from "react";
import "./App.css";
```

### Component Conventions
- Functional components only (no class components)
- Export default functions: `export default function App() { ... }`
- Use hooks for state and side effects
- Keep component logic inside the component definition
- Define event handlers as regular functions inside components
- Use StrictMode in entry point (main.jsx:6)

### State Management
- Use `useState` for local state
- Use functional updates when deriving from previous state: `setItems(prev => [...prev, newItem])`
- Use `useMemo` for expensive computations (filtered/sorted data, derived state)
- Use `useRef` for DOM references and non-reactive values

### Naming Conventions
- Components: PascalCase (`App`, `ShoppingList`)
- Functions: camelCase (`addItem`, `toggleChecked`)
- Variables: camelCase (`items`, `categoryFilter`)
- Constants: UPPER_SNAKE_CASE (`STORAGE_KEY`, `DEFAULT_CATEGORIES`)
- CSS classes: kebab-case (`header`, `mode-switch-container`, `item-checked`)

### Error Handling
- Use try-catch blocks with silent fallbacks
- Return null/empty arrays on errors (see `loadItems`, `serializeForUrl`)
- Don't throw in UI code; handle gracefully

### Data Structures
- Use `Array.isArray()` checks before array operations
- Use object spread for immutability: `{ ...item, qty: newValue }`
- Use array methods: `map`, `filter`, `findIndex`, `sort`
- Generate unique IDs with crypto or timestamp fallback (uid function at App.jsx:21)
- Item structure: `{ id, name, category, qty, unit, checked, createdAt }`

### LocalStorage Pattern
- Store as JSON strings
- Define storage key constant: `const STORAGE_KEY = "app_key_v1"`
- Save with useEffect on state changes
- Load on component init with lazy initialization: `useState(() => loadItems())`

### JSX/CSS Patterns
- Use className instead of class
- Inline styles for dynamic values: `style={{ display: 'flex', gap: 8 }}`
- Semantic HTML: header, main, section, footer
- Accessibility: add aria-labels where needed (e.g., share button at App.jsx:304)
- CSS class composition: `className={`wrap ${mode === "shop" ? "shop-mode" : ""}`}`
- Use inputMode for mobile-friendly keyboards (decimal vs numeric)

### Form Handling
- Use controlled components with value and onChange
- Prevent default on form submit
- Use refs for focus management: `nameRef.current?.focus()`
- Validate inputs before state updates
- Reset form fields after submission

### ESLint Rules
- No unused variables (ignored if starts with uppercase/underscore - see eslint.config.js:26)
- React hooks and refresh rules enforced via plugins
- ES2020+ syntax supported (ecmaVersion: 2020 at eslint.config.js:17)
- Module type: ES modules (sourceType: 'module' at eslint.config.js:22)
- Config extends: js.configs.recommended, reactHooks, reactRefresh

### Performance Patterns
- Memoize derived data with useMemo
- Avoid unnecessary re-renders in arrays
- Use localeCompare for string sorting: `a.name.localeCompare(b.name, "en")`
- Batch state updates when possible

### Number Handling
- Use `Number.isFinite()` for validation
- Handle kg vs pcs quantities differently (decimals vs integers)
- Parse user input safely: `Number(qty || 0)`
- Round kg values to 1 decimal: `Math.round(val * 10) / 10`
- Support comma as decimal separator for kg (changeQtyInline at App.jsx:267)

### Comments
- Do not add comments unless explicitly requested
- Code should be self-documenting

### Code Organization in App.jsx
1. Constants (STORAGE_KEY, DEFAULT_CATEGORIES)
2. Utility functions (uid, normalize, loadItems, serializeForUrl, deserializeFromUrl)
3. Main component export
4. State initialization
5. Derived state (useMemo for allCategories, visibleItems, grouped)
6. Event handlers (addItem, toggleChecked, removeItem, etc.)
7. Render return (header, section panel, main list, footer)

### URL Sharing Pattern
- Share via URL query parameter: `?shared=<base64-encoded-list>`
- Serialize items to base64 (replace +/ with safe chars) at App.jsx:40
- Deserialize and validate on app init (initItems at App.jsx:74)
- Copy to clipboard with feedback timeout (shareList at App.jsx:106)
- Handle clipboard errors silently with try-catch

When modifying existing code, maintain these patterns and conventions. For new features, follow the established style from the existing codebase.
