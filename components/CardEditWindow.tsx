import React from 'react'
import { Modal } from 'antd'
import { useOnClickOutside } from 'usehooks-ts'
import cx from 'classnames'
import getParentItemId from '.../utils/getParentItemId'

function CardEditWindow() {
  const [isOpen, setIsOpen] = React.useState(false)
  React.useEffect(() => {
    const handleContextmenu = (event) => {
      const itemId = getParentItemId(event.target)
      if (itemId) {
        setIsOpen(true)
        event.preventDefault()
      }
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return () => {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])
  const close = () => {
    setIsOpen(false)
  }
  return (
    <Modal
      // transitionName="" // HACK: отменил анимацию для окна
      // maskTransitionName="dummy" // HACK: отменил анимацию для маски
      open={isOpen}
      onCancel={close}
      afterClose={() => {}}
      // // title="Карточка"
      // // style={null}
      // // closable={false}
      // footer={null}
      destroyOnClose
      // // centered
      // // width={768}
      // // mask={false}
      // // TODO: адаптивность для мобилки
      // className="card-detail-window min-w-[768px] max-w-[768px]"
      // wrapClassName="overflow-x-hidden"
    >
      <div>123</div>
    </Modal>
  )
}

export default CardEditWindow
