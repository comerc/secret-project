# secret-project

![artist](./assets/artist.jpg)
Отдам дизайнерское кресло вместе с дизайнером.

---

В рамках R&D, продолжаю пилить клон Trello с амбицией повторить функционал бесплатной версии не хуже оригинала. А потом вокруг этого алтаря построю храм хрустальный про автоматизацию рабочего процесса для [Developer Centric Team](https://habr.com/ru/articles/774740/).

Мой актуальный стек: NextJS + NextAuth + GraphQL CodeGen + AntDesign Component + TailwindCSS + Lexical + Beautiful-DND + React Window + Hasura + Temporal + GoLang.

![trello](./assets/trello.jpg)

---

Я всеми четырьмя лапами за тайм-трекер! По моему опыту, для тех, кто честно отрабатывает положенное время, тайм-трекер не вызывает каких-либо вопросов. Это у желающих [одной жопой сидеть на двух стульях](https://habr.com/ru/articles/767274/) начинаются разговоры про 1984 Джорджа Оруэлла.

Перепробовал на себе и на падаванах разные способы учёта времени: от Excel-таблички и Toggl (где можно скатиться в микро-менеджмент), до тотального контроля в Hubstaff (по требованию одного заказчика).

Хорошо бы этот процесс автоматизировать. Я сколько раз наблюдал явные приписки, когда отмечают 8 часов в конце дня. Как пример подобной автоматизации, есть расширение для VSCode - WakaTime. У меня привычка включать камеру и транслировать live-code в YouTube.

Давно вынашиваю идею своего продукта - симбиоз таск-менеджер + чат по таскам + тайм-трекер. Идея в обслуживании состояния потока. Когда разраб входит в это состояние, выдёргивать его тупо невыгодно для бизнеса (каждый раз теряется 20 минут, как минимум). В одной конторе мы практиковали флажок "не беспокоить", но забываешь его снять.

[Asana CEO: То, как мы работаем сейчас, скоро будет выглядеть пережитком прошлого](https://habr.com/ru/articles/784206/)

## Setup Hasura

```bash
$ cd hasura && docker-compose up -d
```

#### Connect Database

- Database Display Name: default
- Environment Variable: PG_DATABASE_URL

## How to save DB-Schema

```bash
$ cd hasura
$ rm -rf migrations
$ hasura migrate create "init" --from-server --database-name default
$ rm -rf metadata
$ hasura metadata export
```

## How to restore DB-Schema

```bash
$ cd hasura
$ hasura migrate apply
$ hasura metadata apply
```

## How to backup data

```bash
$ cd hasura
$ curl --location --request POST 'http://localhost:8080/v1alpha1/pg_dump' --header 'x-hasura-admin-secret: myadminsecretkey' --header 'Content-Type: application/json' --data-raw '{ "opts": ["-O", "-x", "--data-only", "--schema", "public", "--schema", "auth"], "clean_output": true}' -o data.sql
```

## How to restore data

```bash
$ cd hasura
$ cat data.sql | docker exec -i secret-project-postgres-1 psql -U postgres
```

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
$ rover graph introspect --header "X-Hasura-Admin-Secret: myadminsecretkey" http://localhost:8080/v1/graphql > schema.graphql
```

## How To remove (.\*) from GraphQL Schema

```regexp
\([\[\],.!_":\d\w\s\n]*\)
```

## Config Apollo GraphQL Plugin

- install plugin to VSCode: https://github.com/apollographql/vscode-graphql
- add HASURA_GRAPHQL_URL & HASURA_ADMIN_SECRET to .env.local

## Tables from next-auth-hasura-adapter

- users
- sessions
- accounts
- verification_tokens

## Fake Data via json2graphql

```bash
$ npx json2graphql http://localhost:8080/ -d ./docs/responses.js --overwrite
```

See also [openapi-to-graphql](https://github.com/hasura/openapi-to-graphql).

## TODOs

- [x] Вдохновение (Genesis)
  - [ ] [Apollo server in Next.js API route](https://dnlytras.com/snippets/nextjs-graphql-server)
  - [ ] [Redux не нужен. GraphQL и Apollo Client.](https://www.youtube.com/watch?v=OezyScvU9-c)
  - [ ] [Как работать с Apollo в связке с Typescript и GraphQL Code](https://www.youtube.com/watch?v=8xj9X_M9YI0)
  - [ ] [GraphQL и GO: простой способ бросить REST](https://www.youtube.com/watch?v=tv8muwgj-Y4)
  - [ ] [Интервью Наталии Теплухиной и Наталии Коротковой с Дэном Абрамовым](https://www.youtube.com/watch?v=8kAJilO-EPI)
  - [ ] [Новый хук useEvent решит наши проблемы!](https://www.youtube.com/watch?v=qLQyjhU3fqg)
  - [ ] [Тайны Реакта! Как писать самый быстрый и мощный код?](https://www.youtube.com/watch?v=NDGINHbYquw)
- [x] Apollo Server
- [x] Apollo CLI
- [x] Apollo GraphQL
- [x] GraphQL CodeGen
- [x] Apollo Client
- [x] Hasura
  - https://hasura.io/docs/latest/getting-started/docker-simple/
- [x] Auth for Hasura
  - https://hasura.io/learn/graphql/hasura-authentication/integrations/nextjs-auth/
  - https://github.com/nextauthjs/next-auth
  - https://codedgeekery.com/blog/hasura-nextauth
  - https://next-auth.js.org/getting-started/typescript
  - https://youtu.be/ObxRjcwLaa8
  - https://github.com/nhost/hasura-auth
- [x] Prettier
- [x] AntDesign Components + Customize Theme
  - https://github.com/ant-design/ant-design/issues/38767
- [x] TailwindCSS
  - https://github.com/motleydev/hasura-on-the-road
  - https://haydenbleasel.com/blog/using-clsx-tailwind-composition
  - https://heroicons.com/
- [x] CSS-In-JS: Emotion? - nope
- [x] react-dnd (focalboard) or react-beautiful-dnd or dnd-kit (liveblocks)
  - https://github.com/alexreardon/drag-and-drop-performance-comparison
- [x] react-beautiful-dnd toolschain
  - react-window
  - board > scrollable collumns
  - board > dragging a clone
  - functional components
    - https://codesandbox.io/s/-w5szl?file=/src/index.js
  - tables
  - https://github.com/abeaudoin2013/react-beautiful-dnd-multi-list-typescript-example
  - https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
  - https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback
  - https://egghead.io/lessons/react-create-reorderable-horizontal-lists-with-react-beautiful-dnd-direction-prop
  - https://egghead.io/lessons/react-optimize-performance-in-react-beautiful-dnd-with-shouldcomponentupdate-and-purecomponent
  - https://egghead.io/lessons/react-reorder-columns-with-react-beautiful-dnd
- [x] dnd-kit
  - https://codesandbox.io/s/dnd-kit-virtualized-variable-size-list-forked-uzhkc6?file=/src/App.tsx
- [x] [Gutenberg Demo](https://ru.wordpress.org/gutenberg/)
- [x] quill or prosemirror or slatejs or editorjs.io
  - https://blog.logrocket.com/what-is-slate-js-replace-quill-draft-js/
  - https://www.tiny.cloud/blog/real-time-collaborative-editing-slate-js/
  - https://www.tiny.cloud/blog/migrate-from-slatejs-to-tinymce/
  - https://github.com/react-page/react-page
  - https://github.com/udecode/plate
  - https://kitemaker.co/blog/building-a-rich-text-editor-in-react-with-slatejs
  - https://github.com/haydenbleasel/compass-lexical
  - https://codesandbox.io/examples/package/lexical
  - https://codesandbox.io/s/lexical-markdown-plugin-example-4076jq
- [x] ~~yjs vs automerge~~
  - https://www.slatecollaborate.com
  - https://tiptap.dev/hocuspocus
  - https://github.com/BitPhinix/slate-yjs/
  - https://liveblocks.io/examples/block-text-editor-advanced/nextjs
  - https://bitphinix.github.io/slate-yjs-example/
  - https://se.math.spbu.ru/thesis/texts/Koekin_Jaroslav_Alekseevich_Bachelor_Thesis_2021_text.pdf
  - https://github.com/humandx/slate-automerge
  - https://github.com/geoffreylitt/automerge-slate-playground
  - https://github.com/automerge/automerge/issues/193
  - https://github.com/inkandswitch/peritext
  - https://lexical-playground-nzep8plck-fbopensource.vercel.app/split/?isCollab=true
  - https://github.com/facebook/lexical/issues/2696
  - https://github.com/facebook/lexical/issues/3113
  - https://github.com/facebook/lexical/issues/3172
- [x] ~~tiptap.dev + mantine.dev~~
- [x] ClientOnly & useQuery
  - https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
- [x] Продукты, которые перекрывают сегменты Knowledge Base <> Communications (без Work)
  - https://www.questionbase.com/
- [x] Продукты, которые перекрывают сегменты Work <> Communications (без Knowledge Base)
  - https://tada.team
  - https://focalboard.com (коммуникации в комментах + mattermost)
  - https://openproject.org (коммуникации в комментах + forum)
  - https://asana.com
  - https://ru.yougile.com
  - https://pyrus.com/ru
  - https://resolv.it - (+ Дискуссии вместо каналов и чатов + Один тред — одна тема + Кнопка Resolve) https://vc.ru/tribuna/771861-resolvit-io-kak-ya-ustal-ot-haosa-v-messendzherah-i-sdelal-servis-po-resheniyu-rabochih-zadach
- [x] Продукты, которые перекрывают сегменты Work <> Knowledge Base (без Communications)
  - https://fibery.io (1.0)
  - https://monday.com (коммуникации только в комментах)
- [x] Продукты, которые перекрывают сегменты Work <> Communications <> Knowledge Base
- [x] Продукты, которые только про сегмент Work (без Communications и Knowledge Base)
  - https://airtable.com
  - https://clickup.com (коммуникации только в комментах)
  - https://trello.com (коммуникации только в комментах)
  - https://smartsheet.com (коммуникации только в комментах)
  - https://height.app (коммуникации только в комментах)
  - https://linear.app (коммуникации только в комментах)
- [x] Notion Alternatives
  - https://monday.com/lang/ru/workdocs
  - https://zenkit.com/ru/hypernotes/
  - https://daily10.ru/ne-pishesh-ne-dumaesh-metod-produktivnosti-i-vedeniya-zametok-zettelkasten/
- [x] Как выдать сообщение в консоль Хрома (как Linear)
- [x] Навигация кнопками от элемента под мышкой (как в Trello и Linear)
  - https://codepen.io/kc3svj/pen/MWVPQXz
- [x] Интеграция с fullcalendar.io - nope
- [x] Custom Scrollbar
  - https://levelup.gitconnected.com/build-on-hover-custom-scrollbar-in-react-d846194a7ea4
  - https://github.com/hkurra/react-on-hover-scrollbar
  - https://css-tricks.com/scrollbars-on-hover/
  - https://www.thisdot.co/blog/creating-custom-scrollbars-with-react
  - https://kingsora.github.io/OverlayScrollbars/
  - https://github.com/buzinas/simple-scrollbar/
  - https://github.com/Diokuz/react-baron
  - https://manos.malihu.gr/jquery-custom-content-scroller/
  - https://github.com/inuyaksa/jquery.nicescroll - support .pageXOffset
- [x] Custom Font
  - https://web.dev/i18n/ru/preload-optional-fonts/
  - https://habr.com/ru/companies/vdsina/articles/533208/
  - https://gwfh.mranftl.com/fonts/bellota?subsets=cyrillic,latin
  - https://habr.com/ru/articles/539680/
- [x] `position: sticky` для body
  - https://stackoverflow.com/questions/49848196/position-sticky-not-working-when-height-is-defined
- [ ] RBD - мигает курсор стрелки
  - https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/preset-styles.md
- [ ] Оценить интерфейсы Trello
- [ ] ` ``` ` в тексте редактора - переключение на режим блока кода (как в CodeMirror и SlateJS)
- [ ] Investigate vercel/commerce
- [ ] Setup vercel/turbo?
- [ ] Investigate vercel/swr || apollo/client || react-query (optimistic update?)
  - https://github.com/praveenweb/swr-graphql
  - https://tanstack.com/query/latest/docs/react/comparison
  - https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
  - https://www.apollographql.com/docs/react/v2/performance/optimistic-ui/
- [ ] GraphQL subscriptions
  - https://github.com/vercel/swr/discussions/116#discussioncomment-198505
  - https://github.com/apollographql/graphql-subscriptions
  - https://github.com/praveenweb/swr-graphql/blob/master/pages/subscriptions.js
- [ ] GraphQL offline
  - https://codeburst.io/highly-functional-offline-applications-using-apollo-client-12885bd5f335
- [ ] Admin Panel
- [ ] Temporal & GoLang
- [ ] Tab in GoLang - yes! gofiber (http?)
- [ ] monorepo as Turborepo by Vercel
- [ ] .editorconfig
- [ ] husky?
- [ ] pnpm VS npm
- [ ] pnpm-workspaces VS lerna
  - https://blog.nrwl.io/setup-a-monorepo-with-pnpm-workspaces-and-speed-it-up-with-nx-bc5d97258a7e#5982
  - убрать workaround в tsconfig.json "shared/_": ["packages/shared/src/_"]
- [ ] Image
  - https://www.youtube.com/watch?v=2U7yZ3wvFBM
- [ ] Reack Hooks
  - https://www.youtube.com/watch?v=NZEUDJvpQMM
  - https://www.youtube.com/watch?v=nshyjApIovo
- [ ] Deploy Vercel
  - https://www.youtube.com/watch?v=W3jKJ3V_4V4
- [ ] Flexbox
  - https://www.youtube.com/watch?v=wUl3QwNjGRg
  - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- [ ] Framer Motion
  - https://www.youtube.com/watch?v=urgi2iz9P6U
- [ ] PWA
  - https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app
- [ ] SEO
  - https://www.npmjs.com/package/next-seo
- [ ] Sitemap
  - https://www.npmjs.com/package/next-sitemap
- [ ] vercel/analytics
  - https://github.com/vercel/analytics
- [ ] Open Graph
  - https://vercel.com/docs/concepts/functions/edge-functions/og-image-api
- [ ] Добавить больше языков в lexical-code (через PrismJS)
- [ ] Dark Mode
  - https://tailwindcss.com/docs/dark-mode
- [ ] AntD with Dark Mode
  - https://jfelix.info/blog/dynamic-themes-in-ant-design-how-to-change-between-light-and-dark-theme
  - https://betterprogramming.pub/how-to-toggle-dark-theme-with-ant-design-5-0-eb68552f62b8
  - https://www.youtube.com/watch?v=tgD-csfLNUs
- [ ] LexicalCollaborationPlugin
  - https://github.com/facebook/lexical/issues/2696
  - https://github.com/facebook/lexical/issues/3113
- [ ] mock-data
  - https://randomuser.me/
- [ ] Doc Graph like Obsidian
  - https://mermaid.js.org/
  - https://github.com/HEmile/juggl
  - https://www.youtube.com/watch?v=wKNWMBeGCuU
  - https://github.com/logseq/logseq
  - https://github.com/dendronhq/dendron
- [ ] Markdown extension - MDX
  - https://mdxjs.com/docs/using-mdx/#mdx-provider
- [ ] Исследовать встроенный чат в ClickUp
- [ ] Исследовать встроенный чат в tada.team
- [ ] as Open Source Alternative
  - https://www.producthunt.com/products/erxes
  - https://rocket.chat
- [ ] Добавить в список open-source-alternatives
  - https://www.btw.so/open-source-alternatives
- [ ] Как спрятать от Wappalyzer (как Linear)
- [ ] Search Engine
  - https://github.com/meilisearch/MeiliSearch
  - https://github.com/typesense/typesense
- [ ] API Doc
  - https://docusaurus.io/
- [ ] react-intl-universal
  - https://kramarenko.medium.com/react-i18n-%D0%BF%D0%BE%D1%88%D0%B0%D0%B3%D0%BE%D0%B2%D0%BE%D0%B5-%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-%D0%BF%D0%BE-react-intl-14fc004ce9cc
- [ ] Ant Design Modal padding-right / scrollbar-gutter: stable;
- [ ] TreeView via react-window
  - https://codesandbox.io/s/a-quick-react-tree-component-based-on-react-window-tyxnm
  - https://lodin.github.io/react-vtree/
- [ ] Memoization
  - https://www.freecodecamp.org/news/memoization-in-javascript-and-react/
  - https://www.npmjs.com/package/use-memo-one
- [ ] react-beautiful-dnd-custom-placeholder
  - https://codesandbox.io/s/suttp
  - https://codesandbox.io/s/react-beautiful-dnd-custom-placeholder-2lmf1
  - https://codesandbox.io/s/react-beautiful-dnd-custom-placeholder-ghosting-61t3l
  - https://github.com/atlassian/react-beautiful-dnd/issues/518
- [ ] Интеграция в mattermost
  - https://github.com/mattermost/mattermost-server
- [ ] Weblate - для переводов (подсмотрел на focalboard)
  - https://weblate.org/ru/
- [ ] Goodbye, useEffect
  - https://www.youtube.com/watch?v=bGzanfKVFeU
- [ ] Интеграция с Dendrite (по аналогии Mattermost)
- [ ] Board multidrag (like Linear)
  - https://react-beautiful-dnd.netlify.app/?path=/story/multi-drag--pattern
- [ ] Прикрутить AI-бота (https://hints.so/ || https://engati.com/)
- [ ] Состояние потока и Право на отключение
- [ ] Разблюдовка парного программирования в календаре
- [ ] Покер-планирование
- [ ] G2 пользуется Asana и потому его хвалит? это как CMSList.ru by UmiCMS
  - https://www.forbes.com/sites/alexkonrad/2020/08/26/asana-facebook-cofounder-dustin-moskovitz-slow-burn-second-act/?sh=422874e57adc
- [ ] Тиньков локализовал #COF, плюс Fast Line Ventures
- [ ] Top Most CrunchBase Rank related to me: techstars.com startupwiseguys.com antler.co venturecatalysts.in wefunder.com
- [ ] PRINCE2 - A Structured Project Management Methodology
  - https://asana.com/ru/resources/prince2-methodology
- [ ] Algolia
- [ ] Nested Scroll for Board https://github.com/atlassian/react-beautiful-dnd/issues/131
  - https://github.com/atlassian/react-beautiful-dnd/issues/131#issuecomment-719034014
  - https://github.com/markusenglund/react-kanban/blob/master/src/app/components/Board/Board.jsx#L94-L105
  - https://codesandbox.io/s/simple-react-beautiful-dnd-board-v2cns (fail)
- [ ] recharts.org (as FinamTrade)
- [ ] Temporal for clone Trello Butler
- [ ] Backend via appwrite.io - https://github.com/appwrite/demo-todo-with-nextjs
- [ ] Monorepo
  - https://github.com/martpie/monorepo-typescript-next-the-sane-way
  - https://nx.dev/
- [ ] TailwindCSS group
- [ ] react-monaco-editor
  - https://blog.logrocket.com/build-web-editor-with-react-monaco-editor/
- [ ] NextJS + iframe
  - https://github.com/andriishupta/cross-origin-iframe-communication-with-nextjs
- [ ] Investigate Clockwise
  - https://www.getclockwise.com/blog/time-blocking-app
- [ ] (css) mix-blend-mode: overlay;
- [ ] Вероятностная структура данных. С небольшой ошибкой ( ≈ 0.4% ) считает количество уникальных элементов, не храня сами ключи. Даёт огромную экономию памяти. Если стоит задача быстро посчитать количество посетителей или запросов — [HyperLogLog](https://github.com/axiomhq/hyperloglog) подходит идеально.
- [ ] apollo-client-nextjs
- [ ] AI
  - [Asana CEO: how A.I. will make work more human](https://finance.yahoo.com/news/asana-ceo-way-now-soon-090708980.html)
  - [AI powered project planning](https://www.tomsplanner.com/ai-assist/)
  - https://shtab.app - Если на скриншот трекера попадёт переписка в мессенджере или другая личная информация, встроенная нейросеть автоматически её заблюрит.
- [ ] fixed-data-table-2
  - https://schrodinger.github.io/fixed-data-table-2/
- [ ] Nostr
  - https://github.com/nostr-protocol/nostr
- [ ] Go Skills
  - [scheduling-in-go](https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part1.html)
  - [garbage-collection-in-go](https://www.ardanlabs.com/blog/2018/12/garbage-collection-in-go-part1-semantics.html)
- [ ] Temporal
  - [Building Resilient Microservice Workflows with Temporal: A Next-Gen Workflow Engine](https://medium.com/safetycultureengineering/building-resilient-microservice-workflows-with-temporal-a-next-gen-workflow-engine-a9637a73572d)
- [ ] Интеграция с Gogs / Gitea [about](https://about.gitea.com/) [setup](https://fmnx.su/core/infr)
- [ ] Описание в asyncapi.com
- [x] Терминология для составления ТЗ с помощью ChatGPT: бэклог продукта в виде пользовательских историй; список объектов предметной области и отношения между ними; список нефункциональных требований; функциональные требования в формате сценариев для юскейсов, включая обработку исключительных ситуаций; продуктовые метрики; сгенерировать схему навигации по экранам, описание каждого отдельного экрана, а также диаграмму последовательности в PlantUML, описывающую основной сценарий системы; состав (план) работ; оценка стоимости реализации такого проекта;
  - https://habr.com/ru/news/704392/
- [x] Составление API и Architectural Decision Records (ADR) с помощью ChatGPT
  - https://habr.com/ru/articles/725184/
- [ ] Xerox Alto — компьютер, разработанный в исследовательском центре Xerox PARC в 1973 году. Это первый в мире компьютер, использовавший метафору «рабочего стола» и графический пользовательский интерфейс. Alto был первым полностью персональным компьютером в современном понимании. Alto был исследовательским прототипом, а не коммерческим продуктом. Предполагалось, что Alto станет серийно производимой машиной, но она так и не была поставлена на поток.
- [ ] Karate BDD - для тестирования API (включая GraphQL) https://github.com/karatelabs/karate/tree/master/karate-demo
- [ ] Robot Framework (+BDD) https://robotframework.org/
- [ ] Task Management Made Simple (via "Simple Made Easy")
- [ ] [A Plan for Spam](http://www.paulgraham.com/spam.html)
- [ ] [Компромиссы микросервисов](https://habr.com/ru/articles/261689/)
- [ ] [Trello REST API](https://developer.atlassian.com/cloud/trello/rest/)
- [ ] [json2graphql](https://github.com/hasura/json2graphql)
- [ ] [open-api-to-graphql](https://hasura.io/blog/convert-rest-endpoints-from-openapi-spec-to-graphql-in-2-clicks/)
- [ ] [convert-json-to-graphql](https://www.convertsimple.com/convert-json-to-graphql/)
- [ ] [XO_FONTS](https://myoffice.ru/products/fonts/)
- [ ] рекомендую Obsidian Git и Remotely Save (​чтобы на телефоне не ставить гит, а только remotery; а git - как бэкап с историей)
- [x] native dnd - https://github.com/mgmeyers/obsidian-kanban
- [ ] [КАК DISCORD МЕНЯЕТ РАЗМЕРЫ 150 МИЛЛИОНОВ ИЗОБРАЖЕНИЙ ЕЖЕДНЕВНО ПРИ ПОМОЩИ GO И C++](https://canary.discord.com/blog/how-discord-resizes-150-million-images-every-day-with-go-and-c)
- [ ] [fp-ts](https://github.com/gcanti/fp-ts)
- [ ] [Плюшевый пузырь](https://www.kinopoisk.ru/film/4845485/)
- [ ] [Добавить легенду для radiobutton внутри Hasura](https://github.com/hasura/graphql-engine/blob/f617b68b8b44679bdb7637c8ffbcec001ab18424/frontend/libs/console/legacy-ce/src/lib/components/Services/Data/Common/Components/ForeignKeySelector.js#L294-L303)
- [ ] https://trello.status.atlassian.com/
- [ ] [BlockNote](https://github.com/TypeCellOS/BlockNote) A "Notion-style" block-based extensible text editor built on top of Prosemirror and Tiptap.
- [ ] CRDT
  - https://github.com/TypeCellOS/TypeCell
- [ ] unito.io - Небольшой лайфхак: если решите переехать в Asana из Trello (или, например, Wrike), перенесите все задачи через сервис Unito. Вручную точно замучаетесь.
- [ ] [Scrum-маркетинг в камерном агентстве (Trello -> Asana)](https://vc.ru/flood/33360-scrum-marketing-v-kamernom-agentstve-pochemu-nam-ne-ponravilsya-trello-i-chem-my-ego-zamenili)
- [ ] [Valtio makes proxy-state simple for React and Vanilla](https://github.com/pmndrs/valtio)
- [ ] [Подготовка к продакшну NextJS](https://reactdev.ru/libs/nextjs/prod/)
- [ ] [xstate](https://reactdev.ru/libs/xstate/)
- [ ] [zustand](https://github.com/pmndrs/zustand)
- [ ] [Backyard Pizza Project with Hasura](https://github.com/hasura/build-with-hasura-byp)
- [ ] [Todo App Basic - Models To APIs with Helium for Hasura](https://www.youtube.com/watch?v=Yi4OkcYRhFY)
- [ ] [Optimize your Bundle Size with SWC and GraphQL Codegen](https://the-guild.dev/blog/optimize-bundle-size-with-swc-and-graphql-codegen)
- [ ] https://react.dev/reference/react/Suspense
- [ ] [Apollo-Client + NextJs 13](https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/)
- [ ] @apollo/client -> urql
  - https://formidable.com/open-source/urql/docs/basics/typescript-integration/
  - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#invalidating-data-from-a-server-component
- [ ] [Feature-Sliced Design](https://habr.com/ru/companies/inDrive/articles/693768/)
- [ ] [Hasura: Instant streaming APIs](https://hasura.io/blog/instant-streaming-api-built-in-authorization-new-existing-postgres/)
- [ ] [Все еще работаете с access token на клиенте?](https://habr.com/ru/articles/710552/)
- [x] [Hasura Introspection via Voyager](https://blog.yeswehack.com/yeswerhackers/how-exploit-graphql-endpoint-bug-bounty/)
- [ ] [Как продвигать проекты с открытым исходным кодом](https://habr.com/ru/articles/331514/)
- [ ] [NoOps Kubernetes-платформа](https://deckhouse.ru/)
- [ ] AI for Coders
  - https://codex.dlabs.app/ - A github app to summarize code diffs in pull requests.
  - https://github.com/sturdy-dev/codeball-action - AI Code Review that finds bugs and fast-tracks your code
  - https://writer.mintlify.com/ - AI powered documentation writer for code
  - https://www.safurai.com/ - AI Code Assistant that saves you time in changing, optimizing, and searching code.
  - https://stackoverflow.blog/2023/07/27/announcing-overflowai/
  - http://www.0pdd.com/ - Puzzle Driven development
  - https://githubnext.com/projects/copilot-for-pull-requests
  - https://githubnext.com/projects/testpilot
  - https://codescene.com/ - prioritize technical debt
- [ ] Hoppscotch - попробовать для GraphQL API
- [ ] [nhost](https://github.com/nhost/nhost) - The Open Source Firebase Alternative with GraphQL.
- [ ] [Code AI platform with Code Search & Cody](https://sourcegraph.com/)
- [ ] [Feature-Sliced Design: эволюция фронтенда для быстрых экспериментов](https://habr.com/ru/companies/inDrive/articles/693768/)
- [ ] [Next.js setup: Деплой на VPS | Jest | Playwright | CI/CD | Sentry](https://www.youtube.com/watch?v=nsGusxzitoc)
- [ ] https://fullcalendar.io/
- [ ] https://www.speare.com/ - работа со статьёй, как доской: карточка - абзац, колонка - раздел; оплата $69 в месяц или $69 на год :)
- [ ] https://contentlayer.dev/
- [ ] https://hackernoon.com/static-full-text-search-in-nextjs-with-webassembly-rust-and-xor-filters-tldr
- [ ] [awesome-nextjs](https://officialrajdeepsingh.github.io/awesome-nextjs/)
- [ ] [Next Auth V5 - Advanced Guide (2024)](https://www.youtube.com/watch?v=1MTyCvS05V4)
- [ ] https://github.com/42wim/matterbridge/
- [ ] [Покрытие на BDD](https://github.com/search?q=repo%3Anextcloud%2Fspreed++language%3AGherkin&type=code)
- [ ] [Освоить Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [ ] Поискать свободные аналоги speare.com
- [ ] [How to Manage Multiple Git Accounts on One System](https://www.howtogeek.com/devops/how-to-manage-multiple-git-accounts-on-one-system/)
- [ ] Применить `<img decoding="async">`
- [ ] [tiledb](https://tiledb.com/open-source/array-storage/)
- [ ] [UILD](https://danyloff.tech/2023/10/01/ulid-%D1%82%D0%BE%D1%82-%D1%81%D0%B0%D0%BC%D1%8B%D0%B8-%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82-%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D0%B0-%D0%BA%D0%BE%D1%82/)
- [ ] [Snowflake ID](https://medium.com/nuances-of-programming/%D1%87%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%BE%D0%B5-snowflake-id-968dd6d21ca8)
- [ ] GraphQL Stitching https://habr.com/ru/articles/728476/
- [ ] https://github.com/shadowwalker/next-pwa
- [ ] [nextra](https://github.com/shuding/nextra)
- [ ] https://giscus.app/ru
- [ ] https://github.com/t3-oss/t3-env
- [ ] https://www.radix-ui.com/
- [ ] [The Backend-for-Frontend pattern using NextJS A Step-by-Step Guide](https://wundergraph.com/blog/the-backend-for-frontend-pattern-using-nextjs)
- [ ] [Data Fetching with Next.js 13’s Bleeding-Edge Features](https://wundergraph.com/blog/data_fetching_with_next13)
- [ ] [NextJS / React SSR: 21 Universal Data Fetching Patterns & Best Practices](https://wundergraph.com/blog/nextjs_and_react_ssr_21_universal_data_fetching_patterns_and_best_practices)
- [ ] https://gqty.dev/ The No-GraphQL client 
- [ ] [Сложнейшая проблема компьютерных наук: центрирование](https://habr.com/ru/companies/ruvds/articles/810311/)
- [ ] https://jotai.org/
 
## Что нового (для меня) про вёрстку

- [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)
- [Удивительный и неизвестный inline-block](https://css-live.ru/articles-css/udivitelnyj-i-neizvestnyj-inline-block.html)
- [overscroll-behavior](https://developer.mozilla.org/ru/docs/Web/CSS/overscroll-behavior)
- [isolation](https://developer.mozilla.org/ru/docs/Web/CSS/isolation)
- [box-sizing](https://developer.mozilla.org/ru/docs/Web/CSS/box-sizing)
- [Когда правильно padding, а когда margin?](https://bureau.ru/soviet/20220526)
- [Вёрстка слева направо и сверху вниз](https://bureau.ru/soviet/20210422/)
- [NativeWind](https://www.nativewind.dev/)
- [Как на самом деле работает position: sticky в CSS](https://medium.com/web-standards/sticky-bc7ff7088693)
- `<img decoding="async">`
- [Jumpstart your next SaaS product with Bedrock](https://bedrock.mxstbr.com/) - The modern full-stack Next.js & GraphQL boilerplate with user authentication, subscription payments, teams, invitations, emails and everything else you need (https://coursehunter.net/course/bedrock-bystryy-start-vashego-sleduyushchego-produkta-saas)
- https://coursehunter.net/course/shipfast-zapustite-svoy-startap-za-dni-a-ne-nedeli

## HTML5 Support

https://github.com/mgmeyers/obsidian-kanban/issues/155

One downside to dnd-kit versus the others is the HTML5 API, which would allow you to drag cards out of the window and drop them into other apps -- including Kanban views in other Obsidian vaults, as well as Trello and various other dnd-accepting apps. Accepting drag and drop of other apps' data in any position in a lane (instead of just the bottom) would basically come for free as well. (You could even include the contents of a linked note as a file attachment!)

Dunno how important you consider those features, but they'd be nice to have, and both Sortable and react-dnd would support them, while rb-dnd and dnd-kit do not and cannot. (Well, technically, you could probably make dropping in from other apps possible, but dragging between Obsidian vaults would not be possible except by selecting text, and the attachment thing would be right out.)

==

Also, react-dnd + react-virtualized can do stuff like [this](https://www.npmjs.com/package/@forecasthq/react-virtualized-nested-dnd) -- which isn't quite the tree view you imagined, but it certainly looks like react-dnd is a stable base for building fancy stuff on.

Given the existence of [react-dnd-scrolling](https://www.npmjs.com/package/react-dnd-scrolling) and the comment in react-dnd's docs that "Luckily, React DnD is designed to work great with any virtual React data list components because it doesn't keep any state in the DOM," I would count all these factors as a strong recommendation for react-dnd as the first choice to try as a replacement. (The fact that react-dnd-scrolling has explicit examples for combining it with both react-dnd and react-virtualized should be a big help with doing virtualization of Trello-style full-height columns, which in turn should be a big help to inital loading time of large boards.)

==

react-beautiful-dnd: How this library performs dragging is an implementation detail. The api is what users interact with. That said, this library does not use the html5 drag and drop api. The main reason is that html5 drag and drop does not allow the level of control we need to create our powerful and beautiful experiences. I could go into detail but this is not the right forum.

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

---

## Node.js Port 3000 already in use but it actually isn't?

```bash
npx kill-port 3000
```

## Update packages

```bash
npx npm-check-updates --interactive
```

## Delete Containers

```bash
$ docker-compose down -v
```

## mailhog

для тестирования отправки почты:

```bash
$ brew update && brew install mailhog
$ brew services start mailhog
```

https://github.com/mailhog/MailHog
