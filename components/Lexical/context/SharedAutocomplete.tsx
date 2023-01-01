import React from 'react'

type Suggestion = null | string
type CallbackFn = (newSuggestion: Suggestion) => void
type SubscribeFn = (callbackFn: CallbackFn) => () => void
type PublishFn = (newSuggestion: Suggestion) => void
type ContextShape = [SubscribeFn, PublishFn]
type HookShape = [suggestion: Suggestion, setSuggestion: PublishFn]

const Context: React.Context<ContextShape> = React.createContext([
  (_cb) => () => {
    return
  },
  (_newSuggestion: Suggestion) => {
    return
  },
])

export const SharedAutocompleteContext = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const contextShape: ContextShape = React.useMemo(() => {
    let suggestion: Suggestion | null = null
    const listeners: Set<CallbackFn> = new Set()
    return [
      (cb: (newSuggestion: Suggestion) => void) => {
        cb(suggestion)
        listeners.add(cb)
        return () => {
          listeners.delete(cb)
        }
      },
      (newSuggestion: Suggestion) => {
        suggestion = newSuggestion
        listeners.forEach((listener) => {
          listener(newSuggestion)
        })
      },
    ]
  }, [])
  return <Context.Provider value={contextShape}>{children}</Context.Provider>
}

export const useSharedAutocompleteContext = (): HookShape => {
  const [subscribe, publish]: ContextShape = React.useContext(Context)
  const [suggestion, setSuggestion] = React.useState<Suggestion>(null)
  React.useEffect(() => {
    return subscribe((newSuggestion: Suggestion) => {
      setSuggestion(newSuggestion)
    })
  }, [subscribe])
  return [suggestion, publish]
}
