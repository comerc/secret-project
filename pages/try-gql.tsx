import { useQuery } from '@apollo/client'
import { graphql } from '.../gql/gql'
import { FragmentType, useFragment } from '.../gql/fragment-masking'

const MEMBER_FRAGMENT = graphql(`#graphql
  fragment MemberItem on member {
    display_name
    phone
  }
`)

const Member = (props: {
  /* `member` property has the correct type 🎉 */
  member: FragmentType<typeof MEMBER_FRAGMENT>
}) => {
  // `member` is typed!
  const member = useFragment(MEMBER_FRAGMENT, props.member)
  return <>{member.display_name}</>
}

const GET_MEMBERS = graphql(`#graphql
  query GetMembers($limit: Int!) {
    members(limit: $limit) {
      id
      ...MemberItem
    }
  }
`)

function TryPage() {
  // `data` is typed!
  const { loading, error, data } = useQuery(GET_MEMBERS, { variables: { limit: 3 } })
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>
  return (
    <div>
      {data?.member.map((member) => <p key={member.id}><Member member={member} /></p>)}
    </div>
  )
}
 
export default TryPage