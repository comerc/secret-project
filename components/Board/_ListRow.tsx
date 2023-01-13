import React, { useRef, useEffect, useContext, CSSProperties } from 'react'
import cx from 'classnames'
import { DynamicListContext } from './_List'

interface Props {
  index: number
  width: number
  data: Array<string>
  style: CSSProperties
}

const ListRow = ({ index, width, data, style }: Props) => {
  const { setSize } = useContext(DynamicListContext)
  const rowRoot = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (rowRoot.current) {
      // console.info(`Updated ListRow @index: ${index}`);
      setSize && setSize(index, rowRoot.current.getBoundingClientRect().height)
    }
  }, [index, setSize, width])

  return (
    <div style={style}>
      <div
        ref={rowRoot}
        className={cx(
          index % 2 ? 'bg-white' : 'bg-gray-200',
          'px-6 py-4 text-sm font-medium leading-5 text-gray-900',
        )}
      >
        {data[index]}
      </div>
    </div>
  )
}

export default ListRow
