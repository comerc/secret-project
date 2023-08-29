import { useQuery } from '@apollo/client'
import { graphql as gql } from 'generated/gql'
import { FragmentType, useFragment } from 'generated/fragment-masking'
import { BoardFragment, MemberFragment } from 'generated/graphql'
import client from '.../repositories/apollo'

const GET_BOARD = gql(`#graphql
  query GetBoard($boardId: String!, $memberId: String!) {
    boards_by_pk(id: $boardId) {
      ...Board
    }
    members_by_pk(id: $memberId) {
      ...Member
    }
  }
`)

const GET_CARD = gql(`#graphql
  query GetCard($id: String!) {
    cards_by_pk(id: $id) {
      ...Card
    }
  }
`)

interface GetDataResult {
  board?: BoardFragment
  member?: MemberFragment
  // favorites: any
  // members: any
  // columns: any
  // columnsOrder: any
  // issues: any
}

export type ShortRoute = 'w' | 'u' | 'b' | 'c'

async function getData(
  shortRoute: ShortRoute,
  boardId = '5c3b7bed55428850603f04dd',
  memberId = '5612364666dac1cae4dc38b1',
): GetDataResult {
  const {
    data: { boards_by_pk: board, members_by_pk: member },
  } = await client.query({
    query: GET_BOARD,
    variables: { boardId, memberId },
  })
  return { board, member }
}

export default getData
