import Editor from '.../components/Lexical'
import ClientOnly from '.../components/ClientOnly'
import prepopulatedRichText from '.../utils/prepopulatedRichText'

function TryLexicalPage() {
  return (
    <ClientOnly>
      <Editor initialEditorState={prepopulatedRichText} isInitialEditable={false}></Editor>
    </ClientOnly>
  )
}

export default TryLexicalPage
