import React from 'react'
import type { HistoryState } from '@lexical/react/LexicalHistoryPlugin'
import { createEmptyHistoryState } from '@lexical/react/LexicalHistoryPlugin'

type ContextShape = {
  historyState?: HistoryState
}

const Context: React.Context<ContextShape> = React.createContext({})

export const SharedHistoryContext = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const historyContext = React.useMemo(() => ({ historyState: createEmptyHistoryState() }), [])
  return <Context.Provider value={historyContext}>{children}</Context.Provider>
}

export const useSharedHistoryContext = (): ContextShape => {
  return React.useContext(Context)
}
