import React from 'react'
import type { CSSProperties } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import cx from 'classnames'
import { DynamicListContext } from './List'

interface Props {
  index: number
  width: number
  issue: {
    id: string
    text: string
  }
  style: CSSProperties
}

const ListRow = ({ index, width, issue, style }: Props) => {
  const { setSize } = React.useContext(DynamicListContext)
  const rowRoot = React.useRef<null | HTMLDivElement>(null)

  React.useEffect(() => {
    if (rowRoot.current) {
      // console.info(`Updated ListRow @index: ${index}`);
      setSize && setSize(index, rowRoot.current.getBoundingClientRect().height)
    }
  }, [index, setSize, width])

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided) => (
        <div
          style={style}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            ref={rowRoot}
            className={cx(
              index % 2 ? 'bg-white' : 'bg-gray-200',
              'px-6 py-4 text-sm font-medium leading-5 text-gray-900',
            )}
          >
            {issue.text}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default ListRow
