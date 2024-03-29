import { useQuery } from '@apollo/client'
import { graphql as gql } from 'generated/gql'
import { FragmentType, useFragment } from 'generated/fragment-masking'

// когда graphql-запросы внутри .tsx

const MEMBER_FRAGMENT = gql(`#graphql
  fragment MemberItem on members {
    fullName
  }
`)

const Member = (props: {
  /* `member` property has the correct type 🎉 */
  member: FragmentType<typeof MEMBER_FRAGMENT>
}) => {
  // `member` is typed!
  const member = useFragment(MEMBER_FRAGMENT, props.member)
  return <>{member.fullName}</>
}

const GET_MEMBERS = gql(`#graphql
  query GetMembers($limit: Int!) {
    members(limit: $limit) {
      id
      ...MemberItem
    }
  }
`)

function TryGQLPage() {
  // `data` is typed!
  const { loading, error, data } = useQuery(GET_MEMBERS, {
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

export default TryGQLPage
