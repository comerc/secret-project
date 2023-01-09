import ReactWindowBoard from '.../components/ReactWindowBoard'
import { resetServerContext } from 'react-beautiful-dnd'

export const getServerSideProps = async ({ query }) => {
  resetServerContext()
  return { props: {} }
}

function TryReactWindowBoardPage() {
  return <ReactWindowBoard />
}

export default TryReactWindowBoardPage
