import React from 'react'
import { Button } from 'antd'
import cx from 'classnames'

function HeaderButton({
  className,
  title,
  children,
  icon,
  onClick,
  'aria-label': ariaLabel,
  tabIndex = 0,
  indent = true,
  colors,
  shape = 'default',
}) {
  return (
    <Button
      aria-label={ariaLabel}
      className={cx(
        // FIX: вынес, т.к. не работает переопределение цветов в className (для FilterButton)
        colors ||
          [
            'bg-[var(--dynamic-button)]',
            'text-[var(--dynamic-text)]',
            'hover:bg-[var(--dynamic-button-hovered)]',
            'active:bg-[var(--dynamic-button-pressed)]',
          ].join(' '),
        'border-0 leading-5 shadow-none',
        shape === 'default' && 'rounded-[3px]',
        indent && 'mr-1 mb-1',
        children && 'px-3',
        className,
      )}
      {...{ title, icon, onClick, tabIndex, shape }}
    >
      {children}
    </Button>
  )
}

export default HeaderButton
