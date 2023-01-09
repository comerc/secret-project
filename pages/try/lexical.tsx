import Lexical from '.../components/Lexical'
import ClientOnly from '.../components/ClientOnly'
import prepopulatedRichText from '.../utils/prepopulatedRichText'

function TryLexicalPage() {
  return (
    <ClientOnly>
      <Lexical initialEditorState={prepopulatedRichText} isInitialEditable={true}></Lexical>
    </ClientOnly>
  )
}

export default TryLexicalPage
