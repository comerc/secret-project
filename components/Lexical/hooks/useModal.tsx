import { useCallback, useMemo, useState } from 'react'
import * as React from 'react'

import { Modal } from 'antd'

interface IModalContent {
  title: string
  getBody: (close: () => void) => JSX.Element
  closeOnClickOutside?: boolean
}

export default function useModal(): [JSX.Element | null, (modalContent: IModalContent) => void] {
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
    const { title, getBody, closeOnClickOutside } = modalContent
    return (
      <Modal
        title={title}
        open={isModalOpen}
        maskClosable={closeOnClickOutside}
        afterClose={afterClose}
        onCancel={onClose}
        footer={null}
      >
        {getBody(onClose)}
      </Modal>
    )
  }, [modalContent, isModalOpen, onClose])

  const showModal = useCallback(
    (modalContent: IModalContent) => {
      setModalContent(modalContent)
      setIsModalOpen(true)
    },
    [onClose],
  )

  return [modal, showModal]
}
