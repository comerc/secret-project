import React from 'react'
import { Modal } from 'antd'
import styles from '../Lexical.module.css'

interface IModalContent {
  title: string
  getBody: (close: () => void) => JSX.Element
  closeOnClickOutside?: boolean
}

export default function useModal(): [JSX.Element | null, (modalContent: IModalContent) => void] {
  const [modalContent, setModalContent] = React.useState<null | IModalContent>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const onClose = React.useCallback(() => {
    console.log('onClose')
    setIsModalOpen(false)
  }, [])

  const afterClose = () => {
    setModalContent(null)
  }

  const modal = React.useMemo(() => {
    if (modalContent === null) {
      return null
    }
    const { title, getBody, closeOnClickOutside } = modalContent
    return (
      <Modal
        wrapClassName={styles.modal}
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

  const showModal = React.useCallback(
    (modalContent: IModalContent) => {
      setModalContent(modalContent)
      setIsModalOpen(true)
    },
    [onClose],
  )

  return [modal, showModal]
}
