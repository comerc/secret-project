import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Virtuoso } from 'react-virtuoso'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { CAN_USE_DOM } from 'shared/canUseDOM'
import styles from './Board.module.css'
import generateSentence from '.../utils/generateSentence'

// Virtuoso's resize observer can this error,
// which is caught by DnD and aborts dragging.
if (CAN_USE_DOM) {
  window.addEventListener('error', (e) => {
    if (
      e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
      e.message === 'ResizeObserver loop limit exceeded'
    ) {
      e.stopImmediatePropagation()
    }
  })
}

function Board() {
  const [items, setItems] = useState(() => {
    return Array.from({ length: 1000 }, (_, k) => ({
      id: `id:${k}`,
      text: `item ${k} ` + generateSentence(),
    }))
  })

  const reorder = React.useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }, [])

  const onDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) {
        return
      }
      if (result.source.index === result.destination.index) {
        return
      }

      setItems((items) => reorder(items, result.source.index, result.destination.index))
    },
    [setItems, reorder],
  )

  const Item = React.useMemo(() => {
    return ({ provided, item, isDragging }) => {
      // For borders and visual space,
      // use container with padding rather than a margin
      // margins confuse virtuoso rendering
      return (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{ ...provided.draggableProps.style, paddingBottom: '8px' }}
        >
          <div
            style={{
              backgroundColor: 'gray',
              border: `1px solid ${isDragging ? 'red' : 'black'}`,
            }}
          >
            {item.text}
          </div>
        </div>
      )
    }
  }, [])

  // const HeightPreservingItem = React.useMemo(() => {
  //   return ({ children, ...props }) => {
  //     return (
  //       // the height is necessary to prevent the item container from collapsing, which confuses Virtuoso measurements
  //       <div {...props} style={{ height: props['data-known-size'] || undefined }}>
  //         {children}
  //       </div>
  //     )
  //   }
  // }, [])

  const HeightPreservingItem = React.useCallback(({ children, ...props }) => {
    const [size, setSize] = useState(0)
    const knownSize = props['data-known-size']
    useEffect(() => {
      setSize((prevSize) => {
        return knownSize == 0 ? prevSize : knownSize
      })
    }, [knownSize])
    // check style.css for the height-preserving-container rule
    return (
      <div
        {...props}
        className={styles['height-preserving-container']}
        style={{
          '--child-height': `${size}px`,
        }}
      >
        {children}
      </div>
    )
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.shell}>
        <div className="container">
          <Droppable
            droppableId="droppable"
            mode="virtual"
            renderClone={(provided, snapshot, rubric) => (
              <Item
                provided={provided}
                isDragging={snapshot.isDragging}
                item={items[rubric.source.index]}
              />
            )}
          >
            {(provided) => {
              return (
                <div ref={provided.innerRef}>
                  <Virtuoso
                    style={{ width: 300, height: 500 }}
                    scrollerRef={provided.innerRef}
                    components={{
                      Item: HeightPreservingItem,
                    }}
                    data={items}
                    itemContent={(index, item) => {
                      return (
                        <Draggable draggableId={item.id} index={index} key={item.id}>
                          {(provided) => (
                            <Item provided={provided} item={item} isDragging={false} />
                          )}
                        </Draggable>
                      )
                    }}
                  />
                </div>
              )
            }}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  )
}

export default Board
