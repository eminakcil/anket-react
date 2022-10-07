import { Modal } from 'flowbite-react'

const ImageModal = ({ show, onClose }) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header>Logo Seç</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-yellow-300 p-5 aspect-square"></div>
          <div className="bg-green-400 p-5 aspect-square"></div>
          <div className="bg-red-600 p-5 aspect-square"></div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ImageModal
