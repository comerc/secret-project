import React, { useRef, createContext } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList } from 'react-window'
import ListRow from './_ListRow'

export const DynamicListContext = createContext<
  Partial<{ setSize: (index: number, size: number) => void }>
>({})

const List = ({ issues }) => {
  const mockListItems = issues.map((issue) => issue.text)

  const listRef = useRef<VariableSizeList | null>(null)

  const sizeMap = React.useRef<{ [key: string]: number }>({})

  const setSize = React.useCallback((index: number, size: number) => {
    // Performance: Only update the sizeMap and reset cache if an actual value changed
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size }
      if (listRef.current) {
        // Clear cached data and rerender
        listRef.current.resetAfterIndex(0)
      }
    }
  }, [])

  const getSize = React.useCallback((index) => {
    return sizeMap.current[index] || 0
  }, [])

  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  const calcEstimatedSize = React.useCallback(() => {
    const keys = Object.keys(sizeMap.current)
    const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0)
    return estimatedHeight / keys.length
  }, [])

  return (
    <DynamicListContext.Provider value={{ setSize }}>
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            ref={listRef}
            width={width}
            height={height}
            itemData={mockListItems}
            itemCount={mockListItems.length}
            itemSize={getSize}
            overscanCount={4}
            // See notes at calcEstimatedSize
            estimatedItemSize={calcEstimatedSize()}
          >
            {({ ...props }) => <ListRow {...props} width={width} />}
          </VariableSizeList>
        )}
      </AutoSizer>
    </DynamicListContext.Provider>
  )
}

export default List
