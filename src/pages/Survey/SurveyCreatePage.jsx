import { Label, Textarea, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { plus } from '../../icons'
import ImageModal from './components/ImageModal'
import SurveyForm from './components/SurveyForm'

const SurveyCreatePage = () => {
  const [imageModalVisibility, setImageModalVisibility] = useState(false)

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-center">
          <div
            onClick={() => setImageModalVisibility(true)}
            className="bg-gray-300 p-10 rounded-2xl text-gray-700 hover:bg-gray-400 hover:text-gray-100 cursor-pointer select-none"
          >
            {plus}
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label value="Anket Başlığı" />
          </div>
          <TextInput />
        </div>

        <div>
          <div className="mb-2 block">
            <Label value="Selamlama / Giriş / Açıklama" />
          </div>
          <Textarea rows={4} />
        </div>

        <SurveyForm />

        <div>
          <div className="mb-2 block">
            <Label value={'Özel "Teşekkür" Metni'} />
          </div>
          <Textarea rows={4} />
        </div>
      </div>
      <ImageModal
        show={imageModalVisibility}
        onClose={() => setImageModalVisibility((x) => !x)}
      />
    </>
  )
}
export default SurveyCreatePage
