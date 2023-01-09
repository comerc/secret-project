import ReactVirtuozoBoard from '.../components/ReactVirtuozoBoard'
import { resetServerContext } from 'react-beautiful-dnd'

export const getServerSideProps = async ({ query }) => {
  resetServerContext()
  return { props: {} }
}

function TryReactVirtuozoBoardPage() {
  return <ReactVirtuozoBoard />
}

export default TryReactVirtuozoBoardPage
