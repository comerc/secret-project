import { Button } from 'antd'
import Lexical from '.../components/try/Lexical'
import ClientOnly from '.../components/ClientOnly'
import prepopulatedRichText from '.../utils/prepopulatedRichText'

function TryLexicalPage() {
  return (
    <ClientOnly>
      {/* // HACK: рендер Button переопределяет стиль кнопки внутри Modal.confirm() */}
      <Button>DUMMY</Button>
      <Lexical initialEditorState={prepopulatedRichText} isInitialEditable={true}></Lexical>
    </ClientOnly>
  )
}

export default TryLexicalPage
