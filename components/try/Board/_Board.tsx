import React from 'react'
import List from './_List'

const Board = ({ issues }) => {
  return (
    <div className="h-screen w-full rounded bg-gray-50 p-6 antialiased">
      <div className="h-full w-full overflow-hidden rounded shadow">
        <List issues={issues} />
      </div>
    </div>
  )
}

export default Board
