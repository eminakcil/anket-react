import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SurveyService } from '../../../services'
import Loading from '../../../components/Loading'
import TextQuestion from './components/TextQuestion.jsx'
import SelectQuestion from './components/SelectQuestion.jsx'
import RateQuestion from './components/RateQuestion.jsx'

const SurveyDetailPage = () => {
  const { id } = useParams()
  const [survey, setSurvey] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    SurveyService.getById(id)
      .then((response) => {
        setSurvey(response)
      })
      .catch((err) => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />
  if (error) return <div>Bir sorun oluştu!</div>

  return (
    <>
      <pre>{JSON.stringify(survey)}</pre>
      <div className="flex flex-col gap-3">
        <span className="text-2xl font-medium self-center">{survey.title}</span>
        <div className="flex flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span className="font-medium">Selamlama / Giriş / Açıklama</span>
          <span>{survey.firstTitle}</span>
        </div>

        <div className="flex flex-col gap-3">
          {survey.questions.reduce((acc, curr) => {
            if (curr.questionType === 'text') return acc.concat(<TextQuestion question={curr} />)
            if (curr.questionType === 'select') return acc.concat(<SelectQuestion />)
            if (curr.questionType === 'rate') return acc.concat(<RateQuestion />)
            return acc
          }, [])}
        </div>

        <div className="flex flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span className="font-medium">Özel "Teşekkür" Metni</span>
          <span>{survey.finishTitle}</span>
        </div>
      </div>
    </>
  )
}

export default SurveyDetailPage
