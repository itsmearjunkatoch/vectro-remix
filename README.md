# Introduction

This project is built on the [Remix framework](https://remix.run/) and uses the [Epic Stack](https://www.epicweb.dev/epic-stack) for "batteries included" functionality.

## Running locally

```
npm install
npm run dev
```

Here are the node and npm versions that this works with:
```
❯ npm version
{
  npm: '9.4.0',
  node: '19.6.0',
  v8: '10.8.168.25-node.11',
  uv: '1.44.2',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.19.0',
  modules: '111',
  nghttp2: '1.51.0',
  napi: '8',
  llhttp: '8.1.0',
  uvwasi: '0.0.15',
  acorn: '8.8.2',
  simdutf: '3.1.0',
  undici: '5.16.0',
  openssl: '1.1.1s',
  cldr: '42.0',
  icu: '72.1',
  tz: '2022e',
  unicode: '15.0'
}
❯ node --version
v19.6.0`
```

We also have Github actions CI connected to the master branch of this repo which auto-deploys to https://vectro.fly.dev/dashboard

We have 2 environments: vectro and vectro-staging

Pushing to the `dev` branch deploys staging and pushing to `main` deploys prod.

--- 
#Migrations
1. Add the model changes to the `schema.prisma` file.
2. Run `npx prisma migrate dev --name <description>`
3. Run `npx prisma generate`
4. Can also run `npm run prisma:studio` to validate that the models look ok
