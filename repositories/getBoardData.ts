import { useQuery } from '@apollo/client'
import { graphql as gql } from 'generated/gql'
import {
  MemberFragment,
  BoardFragment,
  BoardPrefsFragment,
  LabelFragment,
  // ListFragment,
  // ListCardFragment,
} from 'generated/graphql'
import client from '.../repositories/apollo'

const GET_BOARD = gql(`#graphql
  query GetBoard($memberId: String!, $boardId: String!) {
    members_by_pk(id: $memberId) {
      ...Member
    }
    boards_by_pk(id: $boardId) {
      ...Board
    }
    # lists(where: {idBoard: {_eq: $boardId}}) {
    #   ...List
    # }
    # cards(where: {idBoard: {_eq: $boardId}}) {
    #   ...Card
    # }
  }
`)

// const GET_CARD = gql(`#graphql
//   query GetCard($cardId: String!) {
//     cards_by_pk(id: $cardId) {
//       ...Card
//     }
//   }
// `)

type GetBoardData = {
  member?: MemberFragment
  board?: Omit<BoardFragment, 'lists'> & {
    prefs: BoardPrefsFragment
    labels: LabelFragment[]
    listsOrder: String[]
  }
  // boardStars: any
  // members: any
  lists: Array<
    Omit<ListFragment, 'cards'> & {
      cardsOrder: String[]
    }
  >
  cards: ListCardFragment[]
}

export type ShortRoute = 'w' | 'u' | 'b' | 'c'

async function getBoardData(
  shortRoute: ShortRoute,
  boardId = '5c3b7bed55428850603f04dd',
  memberId = '5612364666dac1cae4dc38b1',
): GetBoardData {
  const {
    data: { members_by_pk: member, boards_by_pk: board },
  } = await client.query({
    query: GET_BOARD,
    variables: { memberId, boardId },
  })
  let allCards = {}
  const lists = board.lists
    .map((list) => {
      const cardsOrder = list.cards.map((card, index) => {
        allCards[card.id] = card
        return card.id
      })
      const { cards, ...restList } = list
      return {
        ...restList,
        cardsOrder,
      }
    })
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue.id] = currentValue
      return accumulator
    }, {})
  function normalizeBoard() {
    const { lists, ...restBoard } = board
    return {
      ...restBoard,
      listsOrder: Object.keys(lists),
    }
  }
  return { member, board: normalizeBoard(), lists, cards: allCards }
}

export default getBoardData
