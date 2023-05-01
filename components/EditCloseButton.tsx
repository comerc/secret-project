import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import cx from 'classnames'

function EditCloseButton({ onClick }) {
  return (
    <Button
      className={cx(
        [
          'text-[var(--ds-icon,#42526e)]',
          'bg-transparent',
          'hover:text-[var(--ds-icon,#172b4d)]',
          'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
          'active:bg-[var(--ds-background-neutral-pressed,#091e4221)]',
        ].join(' '),
        'min-w-[32px] rounded-[3px] border-0 bg-transparent shadow-none',
      )}
      aria-label="Отменить редактирование"
      icon={<CloseOutlined className="scale-125" />}
      {...{ onClick }}
    />
  )
}

export default EditCloseButton
