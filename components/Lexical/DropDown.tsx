import React from 'react'
import { createPortal } from 'react-dom'
import styles from './Editor.module.css'

type DropDownContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void
}

const DropDownContext = React.createContext<DropDownContextType | null>(null)

export function DropDownItem({
  children,
  className,
  onClick,
  title,
}: {
  children: React.ReactNode
  className: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  const dropDownContext = React.useContext(DropDownContext)

  if (dropDownContext === null) {
    throw new Error('DropDownItem must be used within a DropDown')
  }

  const { registerItem } = dropDownContext

  React.useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref)
    }
  }, [ref, registerItem])

  return (
    <button className={className} onClick={onClick} ref={ref} title={title} type="button">
      {children}
    </button>
  )
}

function DropDownItems({
  children,
  dropDownRef,
  onClose,
}: {
  children: React.ReactNode
  dropDownRef: React.Ref<HTMLDivElement>
  onClose: () => void
}) {
  const [items, setItems] = React.useState<React.RefObject<HTMLButtonElement>[]>()
  const [highlightedItem, setHighlightedItem] = React.useState<React.RefObject<HTMLButtonElement>>()

  const registerItem = React.useCallback(
    (itemRef: React.RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]))
    },
    [setItems],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) return

    const key = event.key

    if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
      event.preventDefault()
    }

    if (key === 'Escape' || key === 'Tab') {
      onClose()
    } else if (key === 'ArrowUp') {
      setHighlightedItem((prev) => {
        if (!prev) return items[0]
        const index = items.indexOf(prev) - 1
        return items[index === -1 ? items.length - 1 : index]
      })
    } else if (key === 'ArrowDown') {
      setHighlightedItem((prev) => {
        if (!prev) return items[0]
        return items[items.indexOf(prev) + 1]
      })
    }
  }

  const contextValue = React.useMemo(
    () => ({
      registerItem,
    }),
    [registerItem],
  )

  React.useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0])
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus()
    }
  }, [items, highlightedItem])

  return (
    <DropDownContext.Provider value={contextValue}>
      <div className={styles.dropdown} ref={dropDownRef} onKeyDown={handleKeyDown}>
        {children}
      </div>
    </DropDownContext.Provider>
  )
}

export default function DropDown({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
  stopCloseOnClickSelf,
}: {
  disabled?: boolean
  buttonAriaLabel?: string
  buttonClassName: string
  buttonIconClassName?: string
  buttonLabel?: string
  children: React.ReactNode
  stopCloseOnClickSelf?: boolean
}): JSX.Element {
  const dropDownRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [showDropDown, setShowDropDown] = React.useState(false)

  const handleClose = () => {
    setShowDropDown(false)
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus()
    }
  }

  React.useEffect(() => {
    const button = buttonRef.current
    const dropDown = dropDownRef.current

    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect()
      dropDown.style.top = `${top + 40}px`
      dropDown.style.left = `${Math.min(left, window.innerWidth - dropDown.offsetWidth - 20)}px`
    }
  }, [dropDownRef, buttonRef, showDropDown])

  React.useEffect(() => {
    const button = buttonRef.current

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target
        if (stopCloseOnClickSelf) {
          if (dropDownRef.current && dropDownRef.current.contains(target as Node)) return
        }
        if (!button.contains(target as Node)) {
          setShowDropDown(false)
        }
      }
      document.addEventListener('click', handle)

      return () => {
        document.removeEventListener('click', handle)
      }
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf])

  return (
    <>
      <button
        disabled={disabled}
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        onClick={() => setShowDropDown(!showDropDown)}
        ref={buttonRef}
      >
        {buttonIconClassName && <span className={buttonIconClassName} />}
        {buttonLabel && <span className="text dropdown_button_text">{buttonLabel}</span>}
        <i className="chevron_down" />
      </button>

      {showDropDown &&
        createPortal(
          <DropDownItems dropDownRef={dropDownRef} onClose={handleClose}>
            {children}
          </DropDownItems>,
          document.body,
        )}
    </>
  )
}
