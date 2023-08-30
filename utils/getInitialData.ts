import { nanoid } from 'nanoid'
import generateSentence from '.../utils/generateSentence'

let itemIdSequence = 0

function getCards(count, listId, { members, actions }) {
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

function getInitialData({ members, actions }) {
  let cards = {}
  const listTitles = ['To Do', 'In Progress', 'Done']
  const lists = listTitles
    .map((listTitle) => {
      const listId = nanoid(8)
      const listCards = getCards(4, listId, { members, actions })
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
  return { lists, listsOrder, cards }
}

export default getInitialData
