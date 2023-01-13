import ReactWindowBoard from '.../components/ReactWindowBoard'
import { resetServerContext } from 'react-beautiful-dnd'
import ClientOnly from '.../components/ClientOnly'

export const getServerSideProps = async ({ query }) => {
  resetServerContext()
  return { props: {} }
}

function TryReactWindowBoardPage() {
  return (
    <ClientOnly>
      <ReactWindowBoard />
    </ClientOnly>
  )
}

export default TryReactWindowBoardPage
