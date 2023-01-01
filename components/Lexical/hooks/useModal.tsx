import { useCallback, useMemo, useState } from 'react'
import * as React from 'react'

import { Modal } from 'antd'

interface IModalContent {
  title: string
  children: JSX.Element
  footer?: React.ReactNode
  closeOnClickOutside?: boolean
}

export default function useModal(): [
  JSX.Element | null,
  (getModalContent: (onClose: () => void) => IModalContent) => void,
] {
  const [modalContent, setModalContent] = useState<null | IModalContent>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = useCallback(() => {
    console.log('onClose')
    setIsModalOpen(false)
  }, [])

  const afterClose = () => {
    setModalContent(null)
  }

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null
    }
    const { title, children, footer, closeOnClickOutside } = modalContent
    return (
      <Modal
        title={title}
        open={isModalOpen}
        maskClosable={closeOnClickOutside}
        afterClose={afterClose}
        onCancel={onClose}
        footer={footer || null}
      >
        {children}
      </Modal>
    )
  }, [modalContent, isModalOpen, onClose])

  const showModal = useCallback(
    (getModalContent: (onClose: () => void) => IModalContent) => {
      setModalContent(getModalContent(onClose))
      setIsModalOpen(true)
    },
    [onClose],
  )

  return [modal, showModal]
}
