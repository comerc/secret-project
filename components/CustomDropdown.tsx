import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Dropdown, theme } from 'antd'
import cx from 'classnames'
// import { useWindowSize } from 'usehooks-ts'

function CustomDropdownItem({ children }) {
  return (
    <a
      tabIndex="-1"
      href="#" // TODO: replace to role="button" or <button />
      onClick={(event) => {
        event.preventDefault()
      }}
      className="mx-[-12px] block px-[12px] py-[6px] text-sm text-[var(--ds-text,#172b4d)] hover:bg-[var(--ds-background-neutral-hovered,#091e420a)] active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]"
    >
      {children}
    </a>
  )
}

function CustomDropdown({
  header,
  footer,
  items = [],
  onClick,
  onOpenChange,
  placement = 'bottomLeft',
  smallSize = false,
  children,
  isOpen,
  setIsOpen,
}) {
  // const [open, setOpen] = React.useState(isOpen)
  // const { width, height } = useWindowSize() // TODO: ошибки в смещении при уменьшении размера экрана
  const { token } = theme.useToken()
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    // borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  }
  const menuStyle = {
    boxShadow: 'none',
  }
  return (
    <Dropdown
      transitionName="" // HACK: отменил анимацию
      getPopupContainer={() => document.getElementById('board-screen-width')}
      menu={{
        items,
        onClick: (event) => {
          if (onClick) {
            onClick(event)
          }
          setIsOpen(false)
        },
      }}
      dropdownRender={(menu) => (
        <div
          style={{
            ...contentStyle,
            // TODO: ошибки в смещении при уменьшении размера экрана
            // width: `${width}px`
          }}
          className={cx(
            'rounded-[3px]',
            // TODO: max-w-
            // TODO: FilterButton - 384px (а надо?)
            smallSize ? 'w-[304px]' : 'w-[370px]',
          )}
        >
          {header && (
            <div className="relative mb-2">
              <span className="mx-3 block truncate border-b border-[var(--ds-border,#091e4221)] px-7 text-center leading-10 text-[var(--ds-text-subtle,#5e6c84)]">
                {header}
              </span>
              <a
                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-[var(--ds-icon-subtle,#6b778c)]  hover:text-[var(--ds-icon,#172b4d)]"
                href="#" // TODO: replace to role="button" or <button />
                onClick={(event) => {
                  event.preventDefault()
                  setIsOpen(false)
                }}
              >
                <CloseOutlined />
              </a>
            </div>
          )}
          {!header && !footer && <div className="pt-3" />}
          {items.length > 0 && (
            <div
              className={cx(
                'overflow-y-auto overflow-x-hidden px-3 pb-3',
                '[&>.ant-dropdown-menu]:p-0',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item]:p-0',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item:hover]:bg-black/0',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item-divider]:my-2',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item-divider]:bg-[var(--ds-border,#091e4221)]',
              )}
            >
              {React.cloneElement(menu as React.ReactElement, {
                tabIndex: '-1',
                style: menuStyle,
              })}
            </div>
          )}
          {footer && <div className="px-3 py-3">{footer}</div>}
        </div>
      )}
      trigger={['click']}
      onOpenChange={(flag) => {
        setIsOpen(flag)
        if (onOpenChange) {
          onOpenChange(flag)
        }
      }}
      open={isOpen}
      // TODO: placement - ошибки в смещении при уменьшении размера экрана
      {...{ placement }}
    >
      {children}
    </Dropdown>
  )
}

CustomDropdown.Item = CustomDropdownItem

export default CustomDropdown
