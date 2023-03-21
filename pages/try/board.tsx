import Board from '.../components/try/Board'
import { resetServerContext } from 'react-beautiful-dnd'
import generateSentence from '.../utils/generateSentence'

export const getServerSideProps = async ({ query }) => {
  resetServerContext()
  const issues = Array.from({ length: 100 }, (v, k) => k).map((k) => ({
    id: `id-${k}`,
    text: `Issue ${k} ` + generateSentence(),
  }))
  return { props: { issues } }
}

function TryBoardPage({ issues }) {
  return <Board issues={issues} />
}

export default TryBoardPage
