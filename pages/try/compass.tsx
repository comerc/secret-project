import Editor from '.../components/Compass'
import ClientOnly from '.../components/ClientOnly'
import prepopulatedRichText from '.../utils/prepopulatedRichText'

function TryCompassPage() {
  return (
    <ClientOnly>
      <Editor initialEditorState={prepopulatedRichText}></Editor>
    </ClientOnly>
  )
}

export default TryCompassPage
