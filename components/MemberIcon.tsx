import React from 'react'
import { Avatar } from 'antd'
import cx from 'classnames'

// TODO: при drag должна быть круглая форма (overflow:clip; overflow-clip-margin:content-box;)
// TODO: drag'n'drop для Avatar на ListCard
function MemberIcon({ login: { uuid, username }, picture: { thumbnail }, name, zIndex }) {
  return (
    <button
      title={`${name.first} ${name.last} (${username})`}
      className={cx(
        '[&>.ant-avatar]:bg-[var(--ds-background-accent-gray-subtlest,#dfe1e6)]',
        'hover:[&>.ant-avatar]:bg-[var(--ds-background-accent-gray-subtler,#c1c7d0)] hover:[&>.ant-avatar>img]:opacity-80',
        'active:[&>.ant-avatar]:bg-[var(--ds-background-accent-gray-subtle,#b3bac5)] active:[&>.ant-avatar>img]:opacity-70',
      )}
      onClick={(event) => {
        // event.preventDefault()
        // TODO: popup профиля
      }}
    >
      <Avatar draggable={false} src={thumbnail} style={{ zIndex }} />
    </button>
  )
}

export default MemberIcon
