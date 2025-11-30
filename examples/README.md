# Running the Examples

These example files demonstrate how to integrate `@creo/env-banner` into your applications. They are not standalone runnable apps, but reference implementations.

## Quick Test in a New Next.js App

1. Create a new Next.js app:
```bash
npx create-next-app@latest test-env-banner --typescript --app
cd test-env-banner
```

2. Link the local env-banner package:
```bash
npm link ../env-banner
```

3. Copy the example code into your app:
- Copy contents from `nextjs-app-router.tsx` to `app/layout.tsx`
- Adjust imports as needed

4. Run the development server:
```bash
npm run dev
```

## Quick Test in a Create React App

1. Create a new React app:
```bash
npx create-react-app test-env-banner --template typescript
cd test-env-banner
```

2. Link the local env-banner package:
```bash
npm link ../env-banner
```

3. Copy the example code:
- Copy contents from `react-app.tsx` to `src/App.tsx`
- Adjust imports as needed

4. Run the app:
```bash
npm start
```

## Using in Your Existing Project

If you already have a Next.js or React project:

```bash
# From your project directory
npm install /path/to/env-banner

# Or use npm link for development
cd /path/to/env-banner && npm link
cd /your/project && npm link @creo/env-banner
```

Then use the examples as a reference for integration.
