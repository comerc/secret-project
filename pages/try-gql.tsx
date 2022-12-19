import { useQuery } from '@apollo/client'
import { graphql as gql } from '.../gql/gql'
import { MemberItemFragment, GetMembersQuery, GetMembersQueryVariables } from '.../gql/graphql'
import { FragmentType, useFragment } from '.../gql/fragment-masking'

const MEMBER_FRAGMENT = gql`
  fragment MemberItem on member {
    display_name
    phone
  }
`

const Member = (props) => {
  // `member` is typed!
  const member = useFragment<MemberItemFragment>(MEMBER_FRAGMENT, props.member)
  return <>{member.display_name}</>
}

const GET_MEMBERS = gql`
  query GetMembers($limit: Int!) {
    members(limit: $limit) {
      id
      ...MemberItem
    }
  }
`

function TryPage() {
  // `data` is typed!
  const { loading, error, data } = useQuery<GetMembersQuery, GetMembersQueryVariables>(GET_MEMBERS, { variables: { limit: 3 } })
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>
  return (
    <div>
      {data?.members.map((member) => <p key={member.id}><Member member={member} /></p>)}
    </div>
  )
}
 
export default TryPage