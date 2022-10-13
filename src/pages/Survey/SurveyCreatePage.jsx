import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { plus } from '../../icons'
import AddQuestionModal from './components/AddQuestionModal'
import ImageModal from './components/ImageModal'
import SurveyForm from './components/SurveyForm'
import { SurveyService } from '../../services'

const SurveyCreatePage = () => {
  const [imageModalVisibility, setImageModalVisibility] = useState(false)
  const [questionModalVisibility, setQuestionModalVisibility] = useState(false)

  const [survetData, setSurvetData] = useState({
    title: '',
    firstTitle: '',
    finishTitle: '',
    active: false,
    logo: '63480f14fae8dace7565df47',
  })

  const [formData, setFormData] = useState([])

  const onDelete = (id) => {
    setFormData((x) => x.filter((item) => item.id !== id))
  }

  const submitHandle = () => {
    console.log({ ...survetData, questions: formData })
    const questions = formData.map((formItem) => {
      switch (formItem.type) {
        case 'text':
          return {
            questionType: 'text',
            required: true,
            question: {
              title: formItem.value,
            },
          }
        case 'select':
          return {
            questionType: 'select',
            required: true,
            question: {
              title: formItem.title,
              multiSelect: formItem.multiSelect,
              options: formItem.selectItems
                .map((option) => ({ option: option.value.trim() }))
                .filter((option) => option.option.length !== 0),
            },
          }

        default:
          return formItem
      }
    })

    SurveyService.newSurvey({
      firstTitle: survetData.firstTitle,
      finishTitle: survetData.finishTitle,
      active: survetData.active,
      title: survetData.title,
      logo: survetData.logo,
      questions,
    })
  }

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
          <TextInput
            value={survetData.title}
            onChange={(e) => setSurvetData((x) => ({ ...x, title: e.target.value }))}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label value="Selamlama / Giriş / Açıklama" />
          </div>
          <Textarea
            rows={4}
            value={survetData.firstTitle}
            onChange={(e) => setSurvetData((x) => ({ ...x, firstTitle: e.target.value }))}
          />
        </div>

        <SurveyForm
          formData={formData}
          onDelete={onDelete}
        />

        <Button
          gradientDuoTone="tealToLime"
          onClick={() => setQuestionModalVisibility(true)}
        >
          Soru Ekle
        </Button>

        <div>
          <div className="mb-2 block">
            <Label value={'Özel "Teşekkür" Metni'} />
          </div>
          <Textarea
            rows={4}
            value={survetData.finishTitle}
            onChange={(e) => setSurvetData((x) => ({ ...x, finishTitle: e.target.value }))}
          />
        </div>

        <Button
          gradientDuoTone="cyanToBlue"
          onClick={submitHandle}
        >
          Kaydet
        </Button>
      </div>
      <ImageModal
        show={imageModalVisibility}
        onClose={() => setImageModalVisibility(false)}
      />
      <AddQuestionModal
        show={questionModalVisibility}
        onClose={() => setQuestionModalVisibility(false)}
        onSubmit={(data) => {
          setFormData((x) => [...x, data])
        }}
      />
    </>
  )
}
export default SurveyCreatePage
