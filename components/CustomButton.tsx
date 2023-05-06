import React from 'react'
import { Button } from 'antd'
import cx from 'classnames'

// TODO: объединить с HeaderButton - формировать className, а не врапить Button
function CustomButton({
  className,
  icon,
  shape = 'default',
  children,
  onClick,
  disabled,
  truncated,
  primary,
  danger,
  asLink,
  ghost,
  htmlType, // TODO: применять 'submit' для form.onSubmit, как в AddColumnButton
  tabIndex,
}) {
  const withOverflowHidden = (сondition, children) => {
    return сondition ? <div className="p-[8px] m-[-8px] overflow-hidden">{children}</div> : children
  }
  return withOverflowHidden(
    truncated,
    <Button
      className={cx(
        truncated ? 'flex w-full items-center [&>:last-child]:truncate' : 'whitespace-normal',
        children && 'px-3 text-start',
        // indent && 'mr-1 mb-1',
        shape === 'default' && 'rounded-[3px]',
        'h-auto min-h-[32px] border-0 leading-5 shadow-none',
        (disabled
          ? [
              'text-[var(--ds-text-disabled,#a5adba)]',
              'bg-[var(--ds-background-disabled,#091e420a)]',
            ]
          : danger
          ? [
              'text-[var(--ds-text-inverse,#fff)]',
              'bg-[var(--ds-background-danger-bold,#b04632)]',
              'hover:bg-[var(--ds-background-danger-bold-hovered,#933b27)]',
              'active:bg-[var(--ds-background-danger-bold-pressed,#6e2f1a)]',
            ]
          : primary
          ? [
              'text-[var(--ds-text-inverse,#fff)]',
              'bg-[var(--ds-background-brand-bold,#0079bf)]',
              'hover:bg-[var(--ds-background-brand-bold-hovered,#026aa7)]',
              'active:bg-[var(--ds-background-brand-bold-pressed,#055a8c)]',
            ]
          : asLink
          ? [
              'text-[var(--ds-text-subtle,#5e6c84)]',
              'bg-transparent',
              'hover:text-[var(--ds-text,#172b4d)]',
              'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
              'active:bg-[var(--ds-background-neutral-pressed,#091e4221)]',
            ]
          : [
              'text-[var(--ds-text,inherit)]',
              ghost ? 'bg-transparent' : 'bg-[var(--ds-background-neutral,#091e420a)]',
              'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
              'active:text-[var(--ds-text,#0079bf)]',
              'active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]',
            ]
        ).join(' '),
        asLink && children && 'underline hover:no-underline',
        asLink &&
          icon &&
          '[&:hover>.anticon]:text-[var(--ds-icon,#172b4d)] [&>.anticon]:text-[var(--ds-icon,#42526e)]',
        asLink && children && icon && '[&>:last-child]:ml-1',
        className,
      )}
      {...{ shape, icon, onClick, disabled, htmlType, tabIndex }}
    >
      {children}
    </Button>,
  )
}

export default CustomButton
