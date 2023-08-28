import { useQuery } from '@apollo/client'
import { graphql as gql } from 'generated/gql'
import { FragmentType, useFragment } from 'generated/fragment-masking'
import {
  // GetBoardQuery,
  BoardFragment,
  BoardPrefsFragment,
  LabelFragment,
  ListFragment,
  MemberFragment,
} from 'generated/graphql'
import client from '.../repositories/apollo'

// const BOARD_FRAGMENT = gql(`#graphql
//   fragment Board on boards {
//     name
//     desc
//   }
// `)

// const BOARD_PREFS_FRAGMENT = gql(`#graphql
//   fragment BoardPrefs on boardPrefs {
//     background
//   }
// `)

// const LABEL_FRAGMENT = gql(`#graphql
//   fragment Label on labels {
//     id
//     color
//   }
// `)

// const LIST_FRAGMENT = gql(`#graphql
//   fragment List on lists {
//     id
//     name
//   }
// `)

// const MEMBER_FRAGMENT = gql(`#graphql
//   fragment Member on members {
//     id
//     fullName
//   }
// `)

const GET_BOARD = gql(`#graphql
  query GetBoard($id: String!) {
    boards_by_pk(id: $id) {
      ...Board
      prefs {
        ...BoardPrefs
      }
      labels {
        ...Label
      }
      lists {
        ...List
      }
    }
    members(limit: 1) {
      ...Member
    }
  }
`)

// type BoardType = NonNullable<GetBoardQuery['boards_by_pk']>

interface GetDataResult {
  board?: BoardFragment & {
    prefs: BoardPrefsFragment
    labels: Array<LabelFragment>
    lists: Array<ListFragment>
  }
  members: Array<MemberFragment>
  // favorites: anyFragmentType<typeof FAVORITE_FRAGMENT>
  // favorites: any
  // members: any
  // columns: any
  // columnsOrder: any
  // issues: any
}

async function getData(route, boardId = '5c3b7bed55428850603f04dd'): GetDataResult {
  const {
    data: { boards_by_pk: board, members },
  } = await client.query({
    query: GET_BOARD,
    variables: { id: boardId },
  })
  return { board, members }
}

export default getData
