import { nanoid } from 'nanoid'
import generateSentence from '.../utils/generateSentence'

// const members = await fetch('https://randomuser.me/api/?results=6')
// .then((res) => res.json())
// .then((data) => data.results)
// какие поля используются для members[0]:
// {
//   "name": {
//     "first": "Jennie",
//     "last": "Nichols"
//   },
//   "login": {
//     "uuid": "7a0eed16-9430-4d68-901f-c0d4c1c3bf00",
//     "username": "yellowpeacock117",
//   },
//   "picture": {
//     "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
//   },
// }
// const members = [
//   {
//     gender: 'male',
//     name: {
//       title: 'Mr',
//       first: 'Roman',
//       last: 'Wang',
//     },
//     location: {
//       street: {
//         number: 2536,
//         name: 'South Road',
//       },
//       city: 'Whangarei',
//       state: 'Wellington',
//       country: 'New Zealand',
//       postcode: 96267,
//       coordinates: {
//         latitude: '53.8015',
//         longitude: '-167.3344',
//       },
//       timezone: {
//         offset: '+4:00',
//         description: 'Abu Dhabi, Muscat, Baku, Tbilisi',
//       },
//     },
//     email: 'roman.wang@example.com',
//     login: {
//       uuid: 'dd94cfef-e523-4eb7-bbf0-7441c468454d',
//       username: 'whitebear505',
//       password: 'pool',
//       salt: '5vkm3RER',
//       md5: '837ce23b7cd3703cd875b01ec9fe3c59',
//       sha1: '5952a062444e302e62cfb13f806550e6f89eb4e5',
//       sha256: '913f2481d064ab111f00a3edd74750282d6cc98e6ac7deb1c9faa98aa89a676d',
//     },
//     dob: {
//       date: '1960-05-28T20:14:53.543Z',
//       age: 63,
//     },
//     registered: {
//       date: '2007-10-21T12:45:12.220Z',
//       age: 15,
//     },
//     phone: '(734)-523-2896',
//     cell: '(205)-665-8455',
//     id: {
//       name: '',
//       value: null,
//     },
//     picture: {
//       large: 'https://randomuser.me/api/portraits/men/11.jpg',
//       medium: 'https://randomuser.me/api/portraits/med/men/11.jpg',
//       thumbnail: 'https://randomuser.me/api/portraits/thumb/men/11.jpg',
//     },
//     nat: 'NZ',
//   },
//   {
//     gender: 'female',
//     name: {
//       title: 'Miss',
//       first: 'Rosane',
//       last: 'Castro',
//     },
//     location: {
//       street: {
//         number: 4911,
//         name: 'Rua Duque de Caxias ',
//       },
//       city: 'Juiz de Fora',
//       state: 'Piauí',
//       country: 'Brazil',
//       postcode: 68294,
//       coordinates: {
//         latitude: '83.9205',
//         longitude: '40.0777',
//       },
//       timezone: {
//         offset: '+4:30',
//         description: 'Kabul',
//       },
//     },
//     email: 'rosane.castro@example.com',
//     login: {
//       uuid: '4199a9d7-9818-4c22-a757-aaf926cc6f5a',
//       username: 'redrabbit324',
//       password: 'fish',
//       salt: '8LiyUVx0',
//       md5: '68567096c6823fa45b151a3e37148818',
//       sha1: '76e8fe4cdbf67c08c3ce4bd2b5e2a2b2583d2ccf',
//       sha256: 'faa106d5fc154b68fd32f5db84c7ef4975266d1743af2e6f9f8ec5d7fa950604',
//     },
//     dob: {
//       date: '1980-03-07T00:30:24.602Z',
//       age: 43,
//     },
//     registered: {
//       date: '2003-08-02T12:33:01.489Z',
//       age: 20,
//     },
//     phone: '(87) 2360-4661',
//     cell: '(32) 1253-5352',
//     id: {
//       name: 'CPF',
//       value: '384.299.439-59',
//     },
//     picture: {
//       large: 'https://randomuser.me/api/portraits/women/51.jpg',
//       medium: 'https://randomuser.me/api/portraits/med/women/51.jpg',
//       thumbnail: 'https://randomuser.me/api/portraits/thumb/women/51.jpg',
//     },
//     nat: 'BR',
//   },
//   {
//     gender: 'male',
//     name: {
//       title: 'Mr',
//       first: 'Daksh',
//       last: 'Nagane',
//     },
//     location: {
//       street: {
//         number: 323,
//         name: 'Tank Bund Rd',
//       },
//       city: 'Ozhukarai',
//       state: 'Sikkim',
//       country: 'India',
//       postcode: 41408,
//       coordinates: {
//         latitude: '49.3189',
//         longitude: '-90.1138',
//       },
//       timezone: {
//         offset: '+3:00',
//         description: 'Baghdad, Riyadh, Moscow, St. Petersburg',
//       },
//     },
//     email: 'daksh.nagane@example.com',
//     login: {
//       uuid: 'a18dc36a-07aa-4253-a495-94834c74ff75',
//       username: 'brownmouse619',
//       password: 'finder',
//       salt: 'js4DlS6U',
//       md5: '6b2fdacd3136a1188335e3a65633ca54',
//       sha1: '1286872e0e3df87e0580d715fe71b70a08f1c53b',
//       sha256: 'bdabbe454568b1b6dcf18cb86a576b19104eee1df47b3dd78b71c3d14fa39d0f',
//     },
//     dob: {
//       date: '1980-03-18T10:44:50.354Z',
//       age: 43,
//     },
//     registered: {
//       date: '2015-10-24T19:08:17.780Z',
//       age: 7,
//     },
//     phone: '8725779893',
//     cell: '8596089641',
//     id: {
//       name: 'UIDAI',
//       value: '773410075746',
//     },
//     picture: {
//       large: 'https://randomuser.me/api/portraits/men/70.jpg',
//       medium: 'https://randomuser.me/api/portraits/med/men/70.jpg',
//       thumbnail: 'https://randomuser.me/api/portraits/thumb/men/70.jpg',
//     },
//     nat: 'IN',
//   },
//   {
//     gender: 'male',
//     name: {
//       title: 'Mr',
//       first: 'Tomas',
//       last: 'Lampe',
//     },
//     location: {
//       street: {
//         number: 2648,
//         name: 'Kirchstraße',
//       },
//       city: 'Haßberge',
//       state: 'Rheinland-Pfalz',
//       country: 'Germany',
//       postcode: 55182,
//       coordinates: {
//         latitude: '89.8765',
//         longitude: '19.0692',
//       },
//       timezone: {
//         offset: '+9:00',
//         description: 'Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
//       },
//     },
//     email: 'tomas.lampe@example.com',
//     login: {
//       uuid: 'f864880f-bd52-44e7-abec-53a9aab8b39c',
//       username: 'sadkoala409',
//       password: 'kisskiss',
//       salt: 'sPvHsjEQ',
//       md5: '98cc32f9126a7948f32906d7fb111df5',
//       sha1: '0d243710c3405354c1bf66d0b8b133e5c522fb1d',
//       sha256: 'cc8efc8922f4950daf4b27ea693e8161e1218e676d46918c440d100646349e5c',
//     },
//     dob: {
//       date: '1959-05-14T21:59:31.853Z',
//       age: 64,
//     },
//     registered: {
//       date: '2006-10-25T01:37:06.706Z',
//       age: 16,
//     },
//     phone: '0194-4261307',
//     cell: '0178-3833651',
//     id: {
//       name: 'SVNR',
//       value: '18 140559 L 158',
//     },
//     picture: {
//       large: 'https://randomuser.me/api/portraits/men/44.jpg',
//       medium: 'https://randomuser.me/api/portraits/med/men/44.jpg',
//       thumbnail: 'https://randomuser.me/api/portraits/thumb/men/44.jpg',
//     },
//     nat: 'DE',
//   },
//   {
//     gender: 'female',
//     name: {
//       title: 'Miss',
//       first: 'Eléa',
//       last: 'Fontai',
//     },
//     location: {
//       street: {
//         number: 8039,
//         name: 'Rue des Cuirassiers',
//       },
//       city: 'Rouen',
//       state: 'Tarn',
//       country: 'France',
//       postcode: 85162,
//       coordinates: {
//         latitude: '51.8991',
//         longitude: '153.3237',
//       },
//       timezone: {
//         offset: '+6:00',
//         description: 'Almaty, Dhaka, Colombo',
//       },
//     },
//     email: 'elea.fontai@example.com',
//     login: {
//       uuid: 'df5a8fa1-dfa6-43cb-8710-1b9c7a35e8d4',
//       username: 'smallsnake633',
//       password: 'sigma',
//       salt: '5yqghEqg',
//       md5: 'c50bc14ca644d59b4be6cb1208cfe1fe',
//       sha1: 'e4399b80d70274ed1896b1a5021e38c60ed60a94',
//       sha256: '7c9f71ad36f0cba4106a5610b73572677685dede1f2a23d47d64026d5eec53b5',
//     },
//     dob: {
//       date: '1959-09-05T17:18:20.111Z',
//       age: 64,
//     },
//     registered: {
//       date: '2007-05-11T11:07:40.188Z',
//       age: 16,
//     },
//     phone: '02-98-81-02-16',
//     cell: '06-82-54-99-79',
//     id: {
//       name: 'INSEE',
//       value: '2590834495618 54',
//     },
//     picture: {
//       large: 'https://randomuser.me/api/portraits/women/89.jpg',
//       medium: 'https://randomuser.me/api/portraits/med/women/89.jpg',
//       thumbnail: 'https://randomuser.me/api/portraits/thumb/women/89.jpg',
//     },
//     nat: 'FR',
//   },
//   {
//     gender: 'female',
//     name: {
//       title: 'Ms',
//       first: 'Meral',
//       last: 'Körmükçü',
//     },
//     location: {
//       street: {
//         number: 5958,
//         name: 'Vatan Cd',
//       },
//       city: 'Şanlıurfa',
//       state: 'Giresun',
//       country: 'Turkey',
//       postcode: 70767,
//       coordinates: {
//         latitude: '5.6652',
//         longitude: '-50.6045',
//       },
//       timezone: {
//         offset: '+10:00',
//         description: 'Eastern Australia, Guam, Vladivostok',
//       },
//     },
//     email: 'meral.kormukcu@example.com',
//     login: {
//       uuid: 'a84a5842-7a8b-4754-b72e-773a250bd5e6',
//       username: 'smallswan846',
//       password: 'joyce',
//       salt: '5UrcYfcx',
//       md5: '8b2e5be7cccdfbf66eb36024991b5a00',
//       sha1: '618ae65194d247ec9fcbd1c52ecb0f75436e18b6',
//       sha256: '38cad538eb6e0a0b2c1494d0e6226cbedb45e25e15ce615c736595abdfe47d17',
//     },
//     dob: {
//       date: '1991-07-19T09:07:56.732Z',
//       age: 32,
//     },
//     registered: {
//       date: '2005-04-12T16:33:00.637Z',
//       age: 18,
//     },
//     phone: '(937)-637-4005',
//     cell: '(609)-276-6648',
//     id: {
//       name: '',
//       value: null,
//     },
//     picture: {
//       large: 'https://randomuser.me/api/portraits/women/18.jpg',
//       medium: 'https://randomuser.me/api/portraits/med/women/18.jpg',
//       thumbnail: 'https://randomuser.me/api/portraits/thumb/women/18.jpg',
//     },
//     nat: 'TR',
//   },
// ]
const members = [
  {
    id: '5612364666dac1cae4dc38b6',
    fullName: 'christina_matthews',
    username: 'brownfrog243',
    avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/43.jpg',
  },
  {
    id: '5612364666dac1cae4dc38b5',
    fullName: 'kristupas_løge',
    username: 'orangeladybug482',
    avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/80.jpg',
  },
  {
    id: '5612364666dac1cae4dc38b4',
    fullName: 'solmaz_bekkering',
    username: 'silvercat293',
    avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/83.jpg',
  },
  {
    id: '5612364666dac1cae4dc38b3',
    fullName: 'clyde_henry',
    username: 'crazyduck198',
    avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/53.jpg',
  },
  {
    id: '5612364666dac1cae4dc38b2',
    fullName: 'tonya_fleming',
    username: 'whitepanda345',
    avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/83.jpg',
  },
  {
    id: '5612364666dac1cae4dc38b1',
    fullName: 'cornelius_langenbach',
    username: 'silverrabbit846',
    avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
  },
]

const actions = [
  {
    id: 'a-0',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'comment',
    args: { text: '123' },
  },
  {
    id: 'a-01',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'comment',
    args: { text: '321' },
  },
  {
    id: 'a-1',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'addAttachment',
    args: {
      url: '/attachments/screen1.png',
      thumbnail: '/attachments/previews/screen1.png',
    },
  },
  {
    id: 'a-2',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'deleteAttachment',
    args: { url: '/attachments/LICENSE' },
  },
  {
    id: 'a-3',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'inviteMember',
    args: { member: members[0] },
  },
  {
    id: 'a-4',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'leftMember',
    args: { member: members[0] },
  },
  {
    id: 'a-5',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'addCard',
    args: { listTitle: 'Backlog' },
  },
  {
    id: 'a-51',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'moveCard',
    args: { oldListTitle: 'Backlog', newListTitle: 'To Do' },
  },
  {
    id: 'a-6',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'archiveCard',
  },
  {
    id: 'a-7',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'unarchiveCard',
  },
  {
    id: 'a-8',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'closeDueDate',
  },
  {
    id: 'a-9',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'reopenDueDate',
  },
  {
    id: 'a-10',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'setDueDate',
    args: { dueDate: '2023-02-23 20:21:22' },
  },
  {
    id: 'a-11',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'changeDueDate',
    args: { dueDate: '2023-02-23 20:21:22' },
  },
  {
    id: 'a-12',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'deleteDueDate',
  },
  {
    id: 'a-13',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'addChecklist',
    args: { checklistTitle: 'Чек-лист' },
  },
  {
    id: 'a-14',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'deleteChecklist',
    args: { checklistTitle: 'Чек-лист' },
  },
  {
    id: 'a-15',
    memberCreator: members[0],
    date: '2023-02-23 20:21:22',
    record: 'renameChecklist',
    args: { oldChecklistTitle: 'Чек-лист', newChecklistTitle: 'Проверить' },
  },
]

const labels = [
  {
    id: 1,
    colorId: '1-1',
    name: '1-1',
  },
  {
    id: 2,
    colorId: '1-2',
    name: '1-2',
  },
  {
    id: 3,
    colorId: '1-3',
    name: '1-3',
  },
  // {
  //   id: 4,
  //   colorId: '1-4',
  //   name: '1-4',
  // },
  // {
  //   id: 5,
  //   colorId: '1-5',
  //   name: '1-5',
  // },
  // {
  //   id: 6,
  //   colorId: '1-6',
  //   name: '1-6',
  // },
  // {
  //   id: 7,
  //   colorId: '4-2',
  //   name: 'Моя очень-очень-очень длинная метка',
  // },
]

let itemIdSequence = 0

function getCards(count, listId) {
  const cards = Array.from({ length: count }, () => {
    const id = ++itemIdSequence
    return {
      id: `${id}`,
      title: `#${id} ${generateSentence()}`,
      description: '',
      members,
      labels,
      actions,
    }
  }).reduce((accumulator, currentValue) => {
    accumulator[currentValue.id] = currentValue
    return accumulator
  }, {})
  return cards
}

function getInitialData({ boardId }) {
  const favorites = [
    {
      boardId,
      name: 'Minsk4',
      workspace: 'Andrew Ka',
      color: '#cd5a91',
      // wallpapper: '/wallpapper.jpg',
    },
    {
      boardId: nanoid(8),
      name: 'Minsk16',
      workspace: 'Andrew Ka',
      color: '#cd5a91',
      // wallpapper: '/wallpapper.jpg',
    },
  ]
  let cards = {}
  const listTitles = ['To Do', 'In Progress', 'Done']
  const lists = listTitles
    .map((listTitle) => {
      const listId = nanoid(8)
      const listCards = getCards(4, listId)
      cards = { ...cards, ...listCards }
      return {
        id: listId,
        title: listTitle,
        // cards: listCards,
        cardsOrder: Object.keys(listCards),
      }
    })
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue.id] = currentValue
      return accumulator
    }, {})
  const listsOrder = Object.keys(lists)
  return { favorites, members, lists, listsOrder, cards }
}

export default getInitialData

// + CardDetailWindow title - оставить: 453 462 572 661 818 824 825 828 1364 1364 1390 1401 1447 1455 1461 1506 1536
// + attachments[0].createdBy -> date
// + attachments[0].title -> name
// + actions[0].member -> memberCreator
// + actions[0].createdBy -> date
// + добавить данные в members через json2graphql
// + members[0].name.first + members[0].name.first -> fullName
// + members[0].login.uuid -> id
// + members[0].login.username -> username
// + members[0].picture.thumbnail -> avatarUrl
// favorites -> boardStars
// favorites[0].workspace -> organizations.displayName
// favorites[0].color -> boardPrefs.backgroundColor
// favorites[0].wallpapper -> boardPrefs.backgroundImage
// cards[0].title -> name
// cardsOrder
// list[0].title -> name
// list[0].description -> desc
// listsOrder
