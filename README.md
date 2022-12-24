# secret-project

## Stack

Hasura + Temporal + GoLang + NextJS + AntDesign Component + Plate

## Setup Hasura

```bash
$ cd data && docker-compose -p="secret-project" up -d
```

#### Connect Database

- Database Display Name: default
- Environment Variable: PG_DATABASE_URL

## How to save DB-Schema

```
$ cd data
$ rm -rf migrations
$ hasura migrate create "init" --from-server --database-name default
$ rm -rf metadata
$ hasura metadata export
```

## How to restore DB-Schema

```
$ cd data
$ hasura migrate apply
$ hasura metadata apply
```

or

```
$ cd data
$ cat backup.sql | docker exec -i secret-project-postgres-1 psql -U postgres
$ hasura metadata apply
```

## How to backup data

curl --location --request POST 'http://localhost:8080/v1alpha1/pg_dump' --header 'x-hasura-admin-secret: <password>' --header 'Content-Type: application/json' --data-raw '{ "opts": ["-O", "-x", "--schema", "public", "--schema", "auth"], "clean_output": true}' -o backup.sql

## How To Start

```bash
$ npm install
$ npm run dev
```

## Install the Hasura CLI, and dive into the console

```bash
hasura init
cd hasura && hasura console
```

## Add Prettier

```bash
$ npm install -g prettier
```

## How To Generate GraphQL Schema

via Apollo CLI (deprecated)

```bash
$ npm install -g apollo graphql
$ apollo client:download-schema --endpoint http://localhost:8080/v1/graphql --header "X-Hasura-Admin-Secret: myadminsecretkey"
```

via Apollo Rover

```bash
$ npm install -g @apollo/rover
$ rover graph introspect http://localhost:8080/v1/graphql > schema.graphql
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
- [x] Hasura https://hasura.io/docs/latest/getting-started/docker-simple/
- [x] Auth for Hasura
  - https://hasura.io/learn/graphql/hasura-authentication/integrations/nextjs-auth/
  - https://github.com/nextauthjs/next-auth
  - https://next-auth.js.org/getting-started/typescript
  - https://youtu.be/ObxRjcwLaa8
  - https://github.com/nhost/hasura-auth
- [ ] Investigate vercel/commerce
- [ ] Setup vercel/turbo?
- [ ] Investigate vercel/swr VIA apollo/client https://github.com/praveenweb/swr-graphql
- [ ] Prettier
- [ ] AntDesign Components + Customize Theme
- [ ] TailwindCSS? example: https://github.com/motleydev/hasura-on-the-road
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

4 года назад уволился, чтобы запилить свой собственный “свечной заводик”. Ох, как бы оно сейчас взлетело, если бы не буксовал всё это время. Идея:

---

Я всеми четырьмя лапами за тайм-трекер! )) По моему опыту, для тех, кто честно отрабатывает положенное время, тайм-трекер не вызывает каких-либо вопросов. Это у желающих одной жопой сидеть на двух стульях начинаются разговоры про 1984 Джорджа Оруэлла.

Перепробовал на себе и на падаванах разные способы учёта времени: от таблички в Excel и Toggl (в которых можно скатиться в микро-контроль), до тотального контроля в Hubstaff (по требованию одного заказчика).

Хорошо бы этот процесс автоматизировать. Я сколько раз наблюдал явные приписки, когда отмечают 8 часов в конце дня. Как пример подобной автоматизации, есть расширение для VSCode - WakaTime. У меня привычка включать камеру и транслировать live-code в YouTube.

Давно вынашиваю идею своего продукта - симбиоз таск-менеджер + чат по таскам + тайм-трекер. Идея в обслуживании состояния потока. Когда разраб входит в это состояние, его тупо невыгодно выдергивать. В одной конторе мы практиковали флажок на столе "не беспокоить".

---

Зацените вакансию 😂

Вице-президент по стратегии IT импортозамещения

В команду российского таск-менеджера Кайтен срочно требуется Вице-президент по стратегии IT импортозамещения. Предстоит работать с ТОП-ми СМИ. ЦА сервиса: члены правительства РФ, председатели партий, руководство крупных и средних гос.структур и бизнеса.

Обязанности:

Планирование встреч, назначение zoom-конференций

Назначение личных встреч, ведение переговоров и заключение сделок

Составление стратегических и оперативных планов по развитию организации

Определение концепции коммуникационных кампаний, целевой аудитории и каналов коммуникации;

Анализ и принятие решений по ключевым каналам продвижения продукции

Стратегическое и проектное планирование: формирование краткосрочных и долгосрочных планов мероприятий по коммуникации ключевых проектов

Непосредственное участие в развитии компании: разработка/корректировка существующей организационно-функциональной стратегии.

Актуализация списков экспертов тематических групп.

Разработка и обеспечение реализации стратегии внешних коммуникаций, исходя из стратегических целей;

Определение потребности функций в информации и инструментах коммуникации;

Координация антикризисной работы, разработка стратегии коммуникаций, формирование позиции компании для всех каналов коммуникации, обеспечение согласований.

Требования:

Высшее образование,

Лидерские качества

Опыт работы в сфере IT: 1–3 года

Знание 5 языков программирования

Опыт работы Вице-президентом: от 1 года.

Умение работать в режиме многозадачности,

Навыки эффективной коммуникации, дар ораторского искусства (наличие актерского образования приветствуется)

Навыки деловой переписки и взаимодействия с органами управления высшего уровня.

Знание статей УК РФ 290, 291, 291.1, 291.2

Навыки игры в гольф

Главное требование: умение перепить своих коллег и деловых партнерах на встречах в банях

Условия:

Работа в сильной команде профессионалов своего дела;

Командировки за счет компании по всей стране;

Корпоративы в Кремле;

Официальное трудоустройство по ТК РФ;

З\П от 1 000 000 р.

График работы: Полная занятость, полный день, чт, пт, сб, вс.

Умение играть на гитаре, хороший репертуар (только российских исполнителей) приветствуются.

Любые другие интересные творческие хобби приветствуются.
