import ReactWindowBoard from '.../components/ReactWindowBoard'
// import { resetServerContext } from 'react-beautiful-dnd'
import ClientOnly from '.../components/ClientOnly'

export const getServerSideProps = async ({ query }) => {
  // resetServerContext() // https://github.com/hello-pangea/dnd/commit/bcb66d32683519fb09f6a651ec2a0f63bd90d304
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
