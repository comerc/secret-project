import React from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList } from 'react-window'
import ListRow from './ListRow'

export const DynamicListContext = React.createContext<
  Partial<{ setSize: (index: number, size: number) => void }>
>({})

const List = React.memo(function List({ issues }) {
  const listRef = React.useRef<VariableSizeList | null>(null)

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
    return sizeMap.current[index] || 100
  }, [])

  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  const calcEstimatedSize = React.useCallback(() => {
    const keys = Object.keys(sizeMap.current)
    const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0)
    return estimatedHeight / keys.length
  }, [])

  const width = 200
  const height = 200

  return (
    <DynamicListContext.Provider value={{ setSize }}>
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            ref={listRef}
            width={width}
            height={height}
            itemData={issues}
            itemCount={issues.length}
            itemSize={getSize}
            overscanCount={4}
            // See notes at calcEstimatedSize
            estimatedItemSize={calcEstimatedSize()}
          >
            {({ index, style }) => (
              <ListRow index={index} issue={issues[index]} style={style} width={width} />
            )}
          </VariableSizeList>
        )}
      </AutoSizer>
    </DynamicListContext.Provider>
  )
})

// {/* <Droppable
//   droppableId="list"
//   mode="virtual"
//   renderClone={(provided, snapshot, rubric) => (
//     <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//       1234
//     </div>
//     // <Item
//     //   provided={provided}
//     //   isDragging={snapshot.isDragging}
//     //   item={column.items[rubric.source.index]}
//     // />
//   )}
// >
//   {(provided) => (
//     <div className="h-full w-full" ref={provided.innerRef} {...provided.droppableProps}>
//     </div>
//   )}
// </Droppable> */}

export default List
