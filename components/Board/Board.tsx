import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import List from './List'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const Board = ({ issues }) => {
  const [state, setState] = React.useState({ issues: issues })

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }
    const issues = reorder(state.issues, result.source.index, result.destination.index)
    setState({ issues })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <React.StrictMode> */}
      <div className="h-screen w-full rounded bg-gray-50 p-6 antialiased">
        <div className="h-full w-full overflow-hidden shadow">
          <List issues={state.issues} />
        </div>
      </div>
      {/* </React.StrictMode> */}
    </DragDropContext>
  )
}

export default Board
