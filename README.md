# WQZ - Next.js + Material UI + TypeScript + Next-Intl

## commands

```bash
npm run dev
npm run lint
npm run format
npm test
npm run build
```

## i18n using next-intl by jpe

For internationalization we use : https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#getting-started

https://next-intl.dev/

- translations are in messages/[lang].json
- i18n.ts is the i18n configuration
- middleware.ts is the next-intl middleware

# Cf original README.md

Starter project for Next.js with App Router + Material UI + Next using TypeScript

Mix of [Create Next App](https://nextjs.org/docs/pages/api-reference/create-next-app) and [MUI](https://mui.com) with set of reusable components and utilities to build professional NextJS application faster.

- [Source Code](https://github.com/karpolan/nextjs-mui-starter-ts)
- [Online Demo](https://nextjs-mui-starter-ts.vercel.app)

## How to use

1. Clone or download the repo from: https://github.com/karpolan/nextjs-mui-starter-ts
2. Copy `.env.sample` file into `.env` file
3. Replace `_TITLE_` and `_DESCRIPTION_` in all files with own texts
4. Check and resolve all `// TODO: ` directives
5. Add your own code :)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run lint` or `yarn lint`

Checks the code for errors and missing things

### `npm run format` or `yarn format`

Formats the code according to `./prettierrc.js` config

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build` or `yarn build`

Builds the app for production or local development to the `.next` folder.<br />

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation]https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
