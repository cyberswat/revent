import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal, ModalContent } from 'semantic-ui-react'
import { closeModal } from './modalReducer'

export default function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch()
  return (
    <Modal
      open={true}
      onClose={() =>
        setTimeout(function () {
          dispatch(closeModal())
        }, 0)
      }
      size={size}
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
}
