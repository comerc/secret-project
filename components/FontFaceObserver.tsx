import useFontFaceObserver from 'use-font-face-observer'

// TODO: вероятно, что useFontFaceObserver больше не нужен? (заменил на rel="preload")

function FontFaceObserver({ children }) {
  const isFontListLoaded = useFontFaceObserver([{ family: 'Bellota' }])
  return isFontListLoaded ? children : null
}

export default FontFaceObserver
