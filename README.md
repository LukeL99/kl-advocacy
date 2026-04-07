# My Access Advocacy

Karlie's personal website at [myaccessadvocacy.com](https://myaccessadvocacy.com). Built with React + Vite.

## Development

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | myaccessadvocacy.com | `main` |
| Staging | staging.myaccessadvocacy.com | `staging` |

Both environments auto-deploy via AWS Amplify on push.

Workflow: make changes on `staging` -> push -> review at staging.myaccessadvocacy.com -> merge to `main` for production. Never push directly to `main`.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
