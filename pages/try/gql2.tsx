import { useQuery } from '@apollo/client'
// import { graphql as gql } from 'generated/gql'
import { FragmentType, useFragment } from 'generated/fragment-masking'
import { MemberItem2FragmentDoc, GetMembers2Document } from 'generated/graphql'

// когда graphql-запросы в graphqls/**/*.graphql

// const MEMBER_FRAGMENT = gql(`#graphql
//   fragment MemberItem on members {
//     fullName
//   }
// `)

const Member = (props: {
  /* `member` property has the correct type 🎉 */
  member: FragmentType<typeof MemberItem2FragmentDoc>
}) => {
  // `member` is typed!
  const member = useFragment(MemberItem2FragmentDoc, props.member)
  return <>{member.fullName}</>
}

// const GET_MEMBERS = gql(`#graphql
//   query GetMembers($limit: Int!) {
//     members(limit: $limit) {
//       id
//       ...MemberItem
//     }
//   }
// `)

function TryGQL2Page() {
  // `data` is typed!
  const { loading, error, data } = useQuery(GetMembers2Document, {
    variables: { limit: 3 },
  })
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>
  return (
    <div>
      {data?.members.map((member) => (
        <p key={member.id}>
          <Member member={member} />
        </p>
      ))}
    </div>
  )
}

export default TryGQL2Page
