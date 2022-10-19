import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { plus } from '../../icons'
import AddQuestionModal from './components/AddQuestionModal'
import ImageModal from './components/ImageModal'
import SurveyForm from './components/SurveyForm'
import { toast } from 'react-toastify'
import { SurveyService } from '../../services'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../../utils.js'

const SurveyCreatePage = () => {
  const [imageModalVisibility, setImageModalVisibility] = useState(false)
  const [questionModalVisibility, setQuestionModalVisibility] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [survetData, setSurvetData] = useState({
    title: '',
    firstTitle: '',
    finishTitle: '',
    active: false,
    logo: '6349184f41e3495a18c16418',
  })

  const [formData, setFormData] = useState([])

  const onDelete = (id) => {
    setFormData((x) => x.filter((item) => item.id !== id))
  }

  const submitHandle = () => {
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
        case 'rate':
          return {
            questionType: 'rate',
            required: true,
            question: {
              title: formItem.title,
              columnOptions: formItem.columns
                .map((column) => ({ column: column.value }))
                .filter(({ column }) => column.length !== 0),
              rowOptions: formItem.rows
                .map((row) => ({ row: row.value }))
                .filter(({ row }) => row.length !== 0),
            },
          }

        default:
          return undefined
      }
    })

    setLoading(true)
    SurveyService.newSurvey({
      firstTitle: survetData.firstTitle,
      finishTitle: survetData.finishTitle,
      active: survetData.active,
      title: survetData.title,
      logo: survetData.logo,
      questions,
    })
      .then((response) => {
        console.log(response)
        toast.success('Kaydedildi', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })

        navigate(getPath('surveys'))
      })
      .finally(() => {
        setLoading(false)
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
          disabled={loading}
        >
          <div className="flex gap-3 items-center">{loading && <Loading size={5} />} Kaydet</div>
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
