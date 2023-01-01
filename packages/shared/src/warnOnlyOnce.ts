export default function warnOnlyOnce(message: string) {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  // if (!__DEV__) {
  //   return
  // }
  let run = false
  return () => {
    if (!run) {
      console.warn(message)
    }
    run = true
  }
}
