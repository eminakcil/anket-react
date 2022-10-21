import { Modal, TextInput } from 'flowbite-react'
import { upload } from '../../../icons'
import { useEffect, useRef, useState } from 'react'
import Button from '../../../components/Button'

const ImageModal = ({ show, onClose, logos, onChange = (logo) => {} }) => {
  const clickHandle = (logo) => {
    onChange(logo)
    onClose()
  }

  const fileInputRef = useRef(false)
  const [selectedFile, setSelectedFile] = useState(false)
  const [selectedFileDataUrl, setSelectedFileDataUrl] = useState(false)

  const fileChangeHandle = (files) => {
    console.log(files)
    if (files.length > 0) setSelectedFile(files[0])
  }

  useEffect(() => {
    if (selectedFile) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result) {
          setSelectedFileDataUrl(result)
        }
      }
      fileReader.readAsDataURL(selectedFile)
    }
  }, [selectedFile])

  const uploadClickHandle = (e) => {
    e.stopPropagation()
    console.log('2')
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
          <div
            className="relative aspect-square flex justify-center items-center border border-solid border-gray-200 hover:shadow-2xl cursor-pointer active:bg-gray-100"
            onClick={() => fileInputRef.current.click()}
          >
            {selectedFileDataUrl ? (
              <img
                src={selectedFileDataUrl}
                className="max-w-full max-h-full"
              />
            ) : (
              upload
            )}
            {selectedFileDataUrl && (
              <div
                className="absolute left-0 bottom-0 w-full flex"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex-1">
                  <TextInput
                    type="text"
                    sizing="sm"
                  />
                </div>
                <div>
                  <Button className="py-[0.3rem]">Yükle</Button>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => fileChangeHandle(e.target.files)}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ImageModal
