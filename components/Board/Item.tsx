import React from 'react'

import cx from 'classnames'
import { DynamicListContext } from './List'

const GRID = 8

function getItemStyle({ draggableStyle, virtualStyle, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
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

function Item({ provided, index, issue, style, width, isDragging }) {
  const { setSize } = React.useContext(DynamicListContext)
  const rowRoot = React.useRef<null | HTMLDivElement>(null)

  if (!isDragging) {
    React.useEffect(() => {
      if (rowRoot.current) {
        console.info(`Updated ListRow @index: ${index}`)
        setSize && setSize(index, rowRoot.current.getBoundingClientRect().height)
      }
    }, [index, setSize, width])
  }

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
    >
      <div
        ref={rowRoot}
        className={cx(
          // isDragging ? styles['item__is-dragging'] : '',
          // index % 2 ? 'bg-white' : 'bg-gray-200',
          'px-6 py-4 text-sm font-medium leading-5 text-gray-900',
        )}
      >
        {issue.text}
      </div>
    </div>
  )
}

export default Item
