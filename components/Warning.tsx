import React from 'react'
import cx from 'classnames'

function Warning() {
  return (
    <div
      className={cx(
        'bg-[var(--ds-background-warning,#faf3c0)]',
        'text-[var(--ds-text-inverse,#ffffff)]',
        'm-0 py-[10px] pl-[38px] pr-[8px]',
        'flex flex-row items-center justify-start',
      )}
    >
      <div className="grow pr-[25px] text-[14px] leading-6 text-[var(--ds-text,#172b4d)]">
        <div className="text-center">
          <strong>У нас возникли неполадки. Мы постараемся устранить их как можно быстрее.</strong>
          &nbsp;
          <a href="http://status.trello.com" target="_blank">
            https://status.trello.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default Warning
