# secret-project

## Stack

Hasura + Temporal + GoLang + NextJS + AntDesign Component + Plate

## How To Start

```bash
npm install
npm run dev
```

## How To Generate GraphQL Schema via Apollo CLI

```
apollo client:download-schema --endpoint http://localhost:8080/v1/graphql --header "X-Hasura-Admin-Secret: myadminsecretkey"
```

## Config Apollo GraphQL Plugin

- install plugin to VSCode: https://github.com/apollographql/vscode-graphql
- add HASURA_GRAPHQL_URL & HASURA_ADMIN_SECRET to .env.local

## TODOs

- [x] Apollo Server
- [x] Apollo CLI
- [x] Apollo GraphQL
- [x] GraphQL CodeGen
- [x] Apollo Client
- [ ] Investigate vercel/commerce
- [ ] Setup vercel/turbo?
- [ ] Investigate vercel/swr VIA apollo/client
- [ ] Hasura
- [ ] Auth for Hasura
- [ ] https://next-auth.js.org/
- [ ] Prettier
- [ ] AntDesign Components + Customize Theme
- [ ] TailwindCSS?
- [ ] CSS-In-JS: Emotion?
- [ ] Temporal & GoLang
- [ ] Tab in GoLang - yes! gofiber
- [ ] monorepo as Turborepo by Vercel
- [ ] .editorconfig
- [ ] husky?
- [ ] pnpm VS npm
- [ ] react-dnd or react-beautiful-dnd
- [ ] quill or slatejs or editorjs.io >> udecode/plate
- [ ] yjs
- [ ] tiptap.dev + mantine.dev
- [ ] ClientOnly & useQuery https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
