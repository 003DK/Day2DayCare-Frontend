# React + TypeScript + Vite

## Authentication

1. Create a Firebase project and register this web app in Firebase.
2. In Firebase Console, enable **Authentication → Sign-in method → Google** and **Email/Password**.
3. Add your local and deployed hostnames under **Authentication → Settings → Authorized domains**.
4. Copy `.env.example` to `.env`, keep `VITE_API_URL`, and fill in the Firebase web app's API key, auth domain, project ID, and app ID.
5. Restart the Vite dev server after changing `.env`.

Users can sign in with Google or their email address and password, and register an account from the login page. Newly authenticated users enter the clinic as therapists by default. Assign elevated roles through a trusted backend; client-side sign-in must not grant administrative permissions.

When running in Vite development mode without Firebase configuration, the login page offers a local-only demo using the pre-filled `superadmin` username and `superadmin` password. This shortcut is not included in production builds.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
