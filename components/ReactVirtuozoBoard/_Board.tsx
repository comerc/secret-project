import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Virtuoso } from 'react-virtuoso'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { CAN_USE_DOM } from 'shared/canUseDOM'
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

// Generate our initial big data set
const initial = Array.from({ length: 1000 }, (_, k) => ({
  id: `id:${k}`,
  text: `item ${k} ` + generateSentence,
}))

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function Item({ provided, item, isDragging }) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={{ ...provided.draggableProps.style, paddingBottom: '8px' }}
      style={provided.draggableProps.style}
      className={`item ${isDragging ? 'is-dragging' : ''}`}
    >
      {item.text}
    </div>
  )
}

const HeightPreservingItem = ({ children, ...props }) => {
  const [size, setSize] = useState(0)
  const knownSize = props['data-known-size']
  useEffect(() => {
    setSize((prevSize) => {
      return knownSize == 0 ? prevSize : knownSize
    })
  }, [knownSize])
  return (
    <div
      {...props}
      className="height-preserving-container"
      // check styling in the style tag below
      style={{ '--child-height': `${size}px` }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [items, setItems] = useState(initial)

  const onDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) {
        return
      }
      if (result.source.index === result.destination.index) {
        return
      }

      // void setItems
      setItems((items) => reorder(items, result.source.index, result.destination.index))
    },
    [setItems],
  )

  return (
    <div style={{ padding: '1rem' }}>
      <style>
        {`
          .height-preserving-container:empty {
            min-height: calc(var(--child-height));
            box-sizing: border-box;
          }
      `}
      </style>
      <DragDropContext onDragEnd={onDragEnd}>
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
              <Virtuoso
                components={{
                  Item: HeightPreservingItem,
                }}
                scrollerRef={provided.innerRef}
                data={items}
                style={{ width: 300, height: 500 }}
                itemContent={(index, item) => {
                  return (
                    <Draggable draggableId={item.id} index={index} key={item.id}>
                      {(provided) => <Item provided={provided} item={item} isDragging={false} />}
                    </Draggable>
                  )
                }}
              />
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
