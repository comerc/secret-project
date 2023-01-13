import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { VariableSizeList, areEqual } from 'react-window'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import getInitialData from './getInitialData'
import styles from './Board.module.css'
// import { useIsMounted } from 'usehooks-ts'
import useHasMounted from '.../utils/useHasMounted'

// TODO: resize-observer-polyfill /
// import AutoSizer from "react-virtualized-auto-sizer";

// TODO: https://stackoverflow.com/questions/5680013/how-to-be-notified-once-a-web-font-has-loaded

// TODO: fontfaceobserver

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const GRID = 8

let _listRef

function getItemStyle({ draggableStyle, virtualStyle, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
    '--board-itemBorderWidth': '4px',
    '--board-itemBorderRadius': '8px',
  }
  // Being lazy: this is defined in our css file
  // const grid = parseInt(styles.grid, 10)
  const grid = GRID
  // when dragging we want to use the draggable style for placement, otherwise use the virtual style
  const result = {
    ...combined,
    height: isDragging ? combined.height : combined.height - grid,
    left: isDragging ? combined.left : combined.left + grid,
    width: isDragging ? draggableStyle.width : `calc(${combined.width} - ${grid * 2}px)`,
    marginBottom: grid,
  }
  return result
}

function reorderList(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

function Item({ provided, item, style, isDragging }) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getItemStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
      className={`${styles.item} ${isDragging ? styles['item__is-dragging'] : ''}`}
    >
      {item.text}
    </div>
  )
}

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
const Row = React.memo(function Row(props) {
  const { data: items, index, style } = props
  const item = items[index]
  // We are rendering an extra item for the placeholder
  if (!item) {
    return null
  }
  // console.log(style)
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => <Item provided={provided} item={item} style={style} />}
    </Draggable>
  )
}, areEqual)

const ItemList = React.memo(function ItemList({ column, index, getListRef }) {
  // There is an issue I have noticed with react-window that when reordered
  // react-window sets the scroll back to 0 but does not update the UI
  // I should raise an issue for this.
  // As a work around I am resetting the scroll to 0
  // on any list that changes it's index
  const listRef = useRef()
  useLayoutEffect(() => {
    const list = listRef.current
    if (list) {
      list.scrollTo(0)
    }
  }, [index])
  React.useEffect(() => {
    // getListRef(listRef)
    _listRef = listRef
    // listRef.current.resetAfterIndex(0)
  }, [])
  // const sizeMap = React.useRef<{ [key: string]: number }>({})
  const getSize = (index) => {
    const dummy = document.getElementById('dummy')
    const item = column.items[index]
    dummy.innerText = item.text
    const rect = dummy.getBoundingClientRect()
    return rect.height
    // return sizeMap.current[index] || 0
  }
  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  const calcEstimatedSize = React.useCallback(() => {
    console.log('calcEstimatedSize')
    return 100
    // const keys = Object.keys(sizeMap.current)
    // const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0)
    // return estimatedHeight / keys.length
  }, [])
  return (
    <Droppable
      droppableId={column.id}
      mode="virtual"
      renderClone={(provided, snapshot, rubric) => (
        <Item
          provided={provided}
          isDragging={snapshot.isDragging}
          item={column.items[rubric.source.index]}
        />
      )}
    >
      {(provided, snapshot) => {
        // Add an extra item to our list to make space for a dragging item
        // Usually the DroppableProvided.placeholder does this, but that won't
        // work in a virtual list
        const itemCount = snapshot.isUsingPlaceholder
          ? column.items.length + 1
          : column.items.length
        return (
          <VariableSizeList
            height={500}
            itemCount={itemCount}
            itemSize={getSize}
            width={300}
            outerRef={provided.innerRef}
            itemData={column.items}
            className="task-list"
            ref={listRef}
            overscanCount={4}
            // See notes at calcEstimatedSize
            estimatedItemSize={calcEstimatedSize()}
          >
            {Row}
          </VariableSizeList>
        )
      }}
    </Droppable>
  )
})

const Column = React.memo(function Column({ column, index, getListRef }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div className="column" {...provided.draggableProps} ref={provided.innerRef}>
          <h3 className="column-title" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <ItemList column={column} index={index} getListRef={getListRef} />
        </div>
      )}
    </Draggable>
  )
})

function Board() {
  const [state, setState] = useState(() => getInitialData())

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    if (result.type === 'column') {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index,
      )
      setState({
        ...state,
        columnOrder,
      })
      return
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId]
      const items = reorderList(column.items, result.source.index, result.destination.index)

      // updating column entry
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      }
      setState(newState)
      _listRef.current.resetAfterIndex(0)
      // _listRef.current.resetAfterIndex(Math.min([result.source.index, result.destination.index]))
      return
    }

    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId]
    const destinationColumn = state.columns[result.destination.droppableId]
    const item = sourceColumn.items[result.source.index]

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    }
    newSourceColumn.items.splice(result.source.index, 1)

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    }
    // in line modification of items
    newDestinationColumn.items.splice(result.destination.index, 0, item)

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    }
    setState(newState)
  }

  const getListRef = (listRef) => {
    _listRef = listRef
  }

  const hasMounted = useHasMounted()

  return (
    hasMounted && (
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            // display: 'block',
            width: 262 + 4 + 4,
            zIndex: -10000,
          }}
        >
          <div
            id="dummy"
            style={{
              width: '100%',
              // display: 'inline-block',
              // height: 0,
              // clear: 'both',
              // content: '',
              // display: 'block',
              '--board-itemBorderWidth': '4px',
              '--board-itemBorderRadius': '8px',
            }}
            className={styles.item}
          ></div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div
            className={styles.shell}
            style={{
              '--block-grid': `${GRID}px`,
              '--board-pink': '#fd3afd',
              '--board-pinkDark': '#690169',
              '--board-greyLight': '#515b7d',
              '--board-black': '#1d212e',
              '--board-borderWidth': '4px',
              '--board-borderRadius': '8px',
            }}
          >
            <div className="container">
              <Droppable droppableId="all-droppables" direction="horizontal" type="column">
                {(provided) => (
                  <div className="columns" {...provided.droppableProps} ref={provided.innerRef}>
                    {state.columnOrder.map((columnId, index) => (
                      <Column
                        key={columnId}
                        column={state.columns[columnId]}
                        index={index}
                        getListRef={getListRef}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </>
    )
  )
}

export default Board
