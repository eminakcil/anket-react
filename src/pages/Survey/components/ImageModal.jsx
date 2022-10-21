import { Modal } from 'flowbite-react'

const ImageModal = ({ show, onClose, logos, onChange = (logo) => {} }) => {
  const clickHandle = (logo) => {
    onChange(logo)
    onClose()
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header>Logo Seç</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-3 gap-3">
          {logos.map((logo) => (
            <div
              key={logo._id}
              className="aspect-square flex justify-center items-center border border-solid border-gray-200 hover:shadow-2xl cursor-pointer active:bg-gray-100"
              onClick={() => clickHandle(logo)}
            >
              <img
                crossOrigin="anonymous"
                src={'http://localhost:3000'.concat(logo.path)}
                className="max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ImageModal
