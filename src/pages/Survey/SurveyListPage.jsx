import { useEffect, useState } from 'react'
import { SurveyService } from '../../services'
import Loading from '../../components/Loading.jsx'
import { dateFormat, getPath } from '../../utils.js'
import { useNavigate } from 'react-router-dom'

const SurveyListPage = () => {
  const [surveyList, setSurveyList] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    SurveyService.list()
      .then((response) => {
        setSurveyList(response)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (error) return <>Hata</>
  if (loading) return <Loading />

  return (
    <>
      {surveyList && (
        <div className="flex flex-col gap-3">
          {surveyList.map((survey) => (
            <div
              key={survey._id}
              className="flex justify-between px-7 py-5 shadow rounded-md hover:bg-gray-100 border- hover:border hover:border-solid hover:border-gray-300 cursor-pointer"
              onClick={() => {
                navigate(getPath('surveys.detail', { id: survey._id }))
              }}
            >
              <span>{survey.title}</span>
              <span className="flex gap-2">
                <span>{dateFormat(survey.createdAt)}</span>
                <span> {survey.active ? 'aktif' : 'pasif'}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
export default SurveyListPage
