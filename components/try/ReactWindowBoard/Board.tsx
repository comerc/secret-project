import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { VariableSizeList, areEqual } from 'react-window'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd' // 'react-beautiful-dnd'
import getInitialData from './getInitialData'
import styles from './Board.module.css'
import useHasMounted from '.../utils/useHasMounted'
// import AutoSizer from 'react-virtualized-auto-sizer'
import useFontFaceObserver from 'use-font-face-observer'
import { nanoid } from 'nanoid'
import cx from 'classnames'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { COLUMN_FOOTER_HEIGHT } from '.../constants'

// TODO: полупрозрачная карточка при перетаскивании (как в mattermost)

const GRID = 8
const WIDTH = 300
const FONT_FAMILY = 'Vibur'
const _listRefMap = {}
let _cloneSize = 0

const BoardContext = React.createContext({})

function getItemStyle({ draggableStyle, virtualStyle, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
  }
  // when dragging we want to use the draggable style for placement, otherwise use the virtual style
  const result = {
    ...combined,
    height: isDragging ? combined.height : combined.height - GRID,
    left: isDragging ? combined.left : combined.left + GRID,
    width: isDragging ? draggableStyle.width : `calc(${combined.width} - ${GRID * 2}px)`,
    marginBottom: GRID,
    '--item-fontFamily': FONT_FAMILY,
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
  const { onDeleteItem, isSelectedId, setSelectedId, isArrowKeyPressed } =
    React.useContext(BoardContext)
  return (
    <div
      id={item.id}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getItemStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
      className={cx(styles.item, {
        [styles['is-dragging']]: isDragging,
        [styles['is-selected']]: !isDragging && isSelectedId(item.id),
      })}
      onMouseEnter={(event) => {
        if (isArrowKeyPressed.current) {
          return
        }
        const itemId = event.target.id
        setSelectedId(itemId)
      }}
      onMouseLeave={(event) => {
        if (isArrowKeyPressed.current) {
          return
        }
        setSelectedId('')
      }}
      onFocus={(event) => {
        const attribute = event.target.attributes['data-rfd-draggable-id']
        if (!attribute) {
          return // for child controls
        }
        const itemId = event.target.id
        setSelectedId(itemId)
      }}
    >
      {item.text}
      <button tabIndex="-1" onClick={onDeleteItem(item.columnId, item.id)}>
        x
      </button>
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
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => <Item provided={provided} item={item} style={style} />}
    </Draggable>
  )
}, areEqual)

const withoutScrollbars = React.forwardRef(({ children, onScroll, style }, ref) => {
  return (
    <div
      className="a1"
      {...{ ref, style, onScroll }}
      // className={cx(
      //   'disable-system-scrollbar',
      //   '[&>:first-child]:bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]',
      // )}
    >
      {children}
      {/* <div className="sticky bottom-0 z-[1000] rounded-b-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
        <ColumnFooter height={COLUMN_FOOTER_HEIGHT} />
      </div> */}
    </div>
  )
})

const withScrollbars = React.forwardRef(({ children, onScroll, style }, ref) => {
  const ofRef = React.useRef(null)
  React.useEffect(() => {
    const viewport = ofRef.current.osInstance().elements().viewport
    if (onScroll) viewport.addEventListener('scroll', onScroll)
    return () => {
      if (onScroll) viewport.removeEventListener('scroll', onScroll)
    }
  }, [ofRef, onScroll])
  return (
    <div ref={ref}>
      <OverlayScrollbarsComponent
        ref={ofRef}
        options={{
          overflow: {
            x: 'hidden',
            y: 'scroll',
          },
          // paddingAbsolute: true,
          // showNativeOverlaidScrollbars: true,
          scrollbars: {
            theme: 'os-theme-light',
            visibility: 'auto',
            // autoHide: 'leave',
            // autoHideDelay: 1300,
            dragScroll: true,
            clickScroll: false,
            pointers: ['mouse', 'touch', 'pen'],
          },
        }}
        {...{ style }}
      >
        <div>
          {children}
          <div
            className="sticky bottom-0 bg-[red] text-3xl"
            style={{ height: COLUMN_FOOTER_HEIGHT }}
          >
            Footer
          </div>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
})

const ItemList = React.memo(function ItemList({ column, index, height }) {
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
    _listRefMap[column.id] = listRef
  }, [])
  const getSize = (index) => {
    const item = column.items[index]
    if (!item) {
      return _cloneSize
    }
    const dummy = document.getElementById('board-dummy')
    dummy.innerText = item.text
    const rect = dummy.getBoundingClientRect()
    const size = rect.height + GRID
    return size
  }
  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  // const calcEstimatedSize = React.useCallback(() => {
  //   const keys = Object.keys(column.items)
  //   if (keys.length === 0) {
  //     return 0
  //   }
  //   const estimatedHeight = keys.reduce((p, i) => p + getSize(i), 0)
  //   const result = estimatedHeight / keys.length
  //   return result
  // }, []) // TODO: оптимизировать

  return (
    <Droppable
      droppableId={column.id}
      mode="virtual"
      renderClone={(provided, snapshot, rubric) => {
        _cloneSize = getSize(rubric.source.index)
        return (
          <Item
            provided={provided}
            isDragging={snapshot.isDragging}
            item={column.items[rubric.source.index]}
          />
        )
      }}
    >
      {(provided, snapshot) => {
        // Add an extra item to our list to make space for a dragging item
        // Usually the DroppableProvided.placeholder does this, but that won't
        // work in a virtual list
        let itemCount =
          snapshot.isUsingPlaceholder &&
          snapshot.isDraggingOver &&
          snapshot.draggingOverWith !== null &&
          snapshot.draggingFromThisWith === null
            ? column.items.length + 1
            : column.items.length
        // TODO: не работает из-за правил: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/changes-while-dragging.md#rules
        // Can only recollect Droppable client for Droppables that have a scroll container
        // if (
        //   snapshot.isUsingPlaceholder &&
        //   !snapshot.isDraggingOver &&
        //   snapshot.draggingOverWith === null &&
        //   snapshot.draggingFromThisWith !== null
        // ) {
        //   itemCount = column.items.length - 1
        //   console.log(itemCount)
        // }
        return (
          <VariableSizeList
            height={height - 80} // TODO: высчитывать точно высоту, учитывая скрол
            itemCount={itemCount}
            itemSize={getSize}
            width={WIDTH}
            outerRef={provided.innerRef}
            outerElementType={withScrollbars}
            itemData={column.items}
            className={styles['task-list']}
            ref={listRef}
            overscanCount={4}
            // See notes at calcEstimatedSize
            // estimatedItemSize={calcEstimatedSize()}
          >
            {Row}
          </VariableSizeList>
        )
      }}
    </Droppable>
  )
})

const Column = React.memo(function Column({ column, index, height }) {
  const { onAddItem } = React.useContext(BoardContext)
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div className={styles.column} {...provided.draggableProps} ref={provided.innerRef}>
          <h3 id={column.id} className={styles['column-title']} {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <button tabIndex="-1" onClick={onAddItem(column.id)}>
            +
          </button>
          <ItemList column={column} index={index} height={height} />
        </div>
      )}
    </Draggable>
  )
})

function Board({ height, right }) {
  const [state, setState] = useState(() => getInitialData())

  React.useLayoutEffect(() => {
    const element = document.getElementById('board')
    element.focus()
  }, [])

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
      const index = Math.min(result.source.index, result.destination.index)
      _listRefMap[column.id].current.resetAfterIndex(index)
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
    newDestinationColumn.items.splice(result.destination.index, 0, {
      ...item,
      columnId: destinationColumn.id,
    })

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    }
    setState(newState)
    _listRefMap[newDestinationColumn.id].current.resetAfterIndex(result.destination.index)
    _listRefMap[newSourceColumn.id].current.resetAfterIndex(result.source.index)
  }

  const hasMounted = useHasMounted()

  const isFontListLoaded = useFontFaceObserver([{ family: FONT_FAMILY }])

  const onAddItem = (columnId) => () => {
    let text = prompt('Please enter title')
    const column = state.columns[columnId]
    const items = column.items
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [column.id]: {
          ...column,
          items: [{ id: nanoid(), text, columnId }, ...items],
        },
      },
    }
    setState(newState)
    _listRefMap[column.id].current.resetAfterIndex(0)
  }

  const onDeleteItem = (columnId, itemId) => () => {
    const column = state.columns[columnId]
    const items = column.items
    const index = items.findIndex((item) => item.id === itemId)
    const newColumn = {
      ...column,
      items: [...column.items],
    }
    newColumn.items.splice(index, 1)
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [columnId]: newColumn,
      },
    }
    setState(newState)
    _listRefMap[column.id].current.resetAfterIndex(index)
  }

  const isSelectedId = (itemId) => itemId === state.selectedId

  const setSelectedId = (selectedId) => {
    const newState = { ...state, selectedId }
    setState(newState)
  }

  const isArrowKeyPressed = React.useRef(false)

  function selectFirstItem(columnId) {
    const column = state.columns[columnId]
    const listRef = _listRefMap[column.id]
    const list = listRef.current
    list.scrollTo(0)
    const item = column.items[0]
    // setSelectedId(item.id)
    setTimeout(() => {
      const element = document.getElementById(item.id)
      element.focus()
    }, 0)
  }

  function onKeyDown(event) {
    if (event.code === 'Tab') {
      isArrowKeyPressed.current = true
      if (event.target.classList.contains(styles['column-title'])) {
        if (event.shiftKey) {
          const oldColumnId = event.target.id
          const columnOrderIndex = state.columnOrder.findIndex(
            (columnId) => columnId === oldColumnId,
          )
          if (columnOrderIndex > 0) {
            const columnId = state.columnOrder[columnOrderIndex - 1]
            selectFirstItem(columnId)
            event.preventDefault()
          }
        } else {
          const columnId = event.target.id
          selectFirstItem(columnId)
        }
      }
      return
    }
    const cases = {
      ArrowDown: () => {
        isArrowKeyPressed.current = true
        for (const column of Object.values(state.columns)) {
          const index = column.items.findIndex((item) => item.id === state.selectedId)
          if (index !== -1) {
            if (column.items.length === index + 1) {
              const item = column.items[index]
              // setSelectedId(item.id)
              const element = document.getElementById(item.id)
              element.focus()
            } else {
              const item = column.items[index + 1]
              // setSelectedId(item.id)
              const element = document.getElementById(item.id)
              element.scrollIntoView({ alignToTop: false, block: 'nearest' }) // TODO: портит курсор
              element.focus()
            }
            break
          }
        }
      },
      ArrowUp: () => {
        isArrowKeyPressed.current = true
        for (const column of Object.values(state.columns)) {
          const index = column.items.findIndex((item) => item.id === state.selectedId)
          if (index !== -1) {
            if (index === 0) {
              const item = column.items[index]
              const element = document.getElementById(item.id)
              element.focus()
            } else {
              const item = column.items[index - 1]
              // setSelectedId(item.id)
              const element = document.getElementById(item.id)
              element.scrollIntoView({ alignToTop: false, block: 'nearest' }) // TODO: портит курсор
              element.focus()
            }
            break
          }
        }
      },
      ArrowLeft: () => {
        isArrowKeyPressed.current = true
        for (const column of Object.values(state.columns)) {
          const index = column.items.findIndex((item) => item.id === state.selectedId)
          if (index !== -1) {
            const columnOrderIndex = state.columnOrder.findIndex(
              (columnId) => columnId === column.id,
            )
            if (columnOrderIndex > 0) {
              const columnId = state.columnOrder[columnOrderIndex - 1]
              selectFirstItem(columnId)
            }
            break
          }
        }
      },
      ArrowRight: () => {
        isArrowKeyPressed.current = true
        for (const column of Object.values(state.columns)) {
          const index = column.items.findIndex((item) => item.id === state.selectedId)
          if (index !== -1) {
            const columnOrderIndex = state.columnOrder.findIndex(
              (columnId) => columnId === column.id,
            )
            if (columnOrderIndex + 1 !== state.columnOrder.length) {
              const columnId = state.columnOrder[columnOrderIndex + 1]
              selectFirstItem(columnId)
            }
            break
          }
        }
      },
    }
    const onCase = cases[event.code]
    if (onCase) {
      onCase()
      if (state.selectedId === '') {
        const columnId = state.columnOrder[0]
        selectFirstItem(columnId)
      }
      event.preventDefault()
    }
  }

  function onKeyUp() {
    isArrowKeyPressed.current = false
  }

  return (
    <div
      id="board"
      className={styles.shell}
      style={{
        '--block-grid': `${GRID}px`,
        '--board-pink': '#fd3afd',
        '--board-pinkDark': '#690169',
        '--board-greyLight': '#515b7d',
        '--board-black': '#1d212e',
        '--board-borderRadius': '4px',
        '--block-scrollbarWidth': '0px', // TODO: hover scrollbar
        '--block-fontFamily': FONT_FAMILY,
      }}
      tabIndex="-1" // for fire onKeyDown
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      <div
        className={styles['task-list']}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          width: WIDTH,
          // zIndex: -1,
        }}
      >
        <div
          id="board-dummy"
          style={{
            width: '100%',
          }}
          className={styles.item}
        ></div>
      </div>
      {hasMounted && isFontListLoaded && (
        <BoardContext.Provider
          value={{ onAddItem, onDeleteItem, isSelectedId, setSelectedId, isArrowKeyPressed }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            {/* <AutoSizer>
              {({ height }) => ( */}
            <div className={styles.container}>
              <Droppable droppableId="all-droppables" direction="horizontal" type="column">
                {(provided) => (
                  <div
                    className={styles.columns}
                    style={{
                      paddingRight: right,
                    }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {state.columnOrder.map((columnId, index) => (
                      <Column
                        key={columnId}
                        column={state.columns[columnId]}
                        index={index}
                        height={height}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            {/* )}
            </AutoSizer> */}
          </DragDropContext>
        </BoardContext.Provider>
      )}
    </div>
  )
}

export default Board
