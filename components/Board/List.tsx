import React from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, areEqual } from 'react-window'
import Item from './Item'

export const DynamicListContext = React.createContext<
  Partial<{ setSize: (index: number, size: number) => void }>
>({})

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
const Row = React.memo(function Row({ index, issue, style, width }) {
  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided) => (
        <Item provided={provided} index={index} issue={issue} style={style} width={width} />
      )}
    </Draggable>
  )
}, areEqual)

const List = React.memo(function List({ issues, provided }) {
  const listRef = React.useRef<VariableSizeList | null>(null)

  const sizeMap = React.useRef<{ [key: string]: number }>({})

  const setSize = React.useCallback((index: number, size: number) => {
    console.log('setSize', index, size)
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
    return sizeMap.current[index] || 100
  }, [])

  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  const calcEstimatedSize = React.useCallback(() => {
    const keys = Object.keys(sizeMap.current)
    const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0)
    return estimatedHeight / keys.length
  }, [])

  const width = 300
  const height = 500

  return (
    <DynamicListContext.Provider value={{ setSize }}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <Droppable
              droppableId="list"
              mode="virtual"
              renderClone={(provided, snapshot, rubric) => (
                <Item
                  provided={provided}
                  isDragging={snapshot.isDragging}
                  issue={issues[rubric.source.index]}
                />
              )}
            >
              {(provided, snapshot) => {
                return (
                  <VariableSizeList
                    ref={listRef}
                    outerRef={provided.innerRef}
                    width={width}
                    height={height}
                    itemData={issues}
                    itemCount={issues.length}
                    itemSize={getSize}
                    overscanCount={4}
                    // See notes at calcEstimatedSize
                    estimatedItemSize={calcEstimatedSize()}
                  >
                    {({ index, style }) => {
                      const issue = issues[index]
                      return <Row index={index} issue={issue} style={style} width={width} />
                    }}
                  </VariableSizeList>
                )
              }}
            </Droppable>
          )
        }}
      </AutoSizer>
    </DynamicListContext.Provider>
  )
})

export default List
