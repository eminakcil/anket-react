import { Fragment, useEffect, useState } from 'react'
import Loading from '../../components/Loading.jsx'
import { useParams } from 'react-router-dom'
import { SurveyService } from '../../services'
import Input from '../../components/Input'
import FormText from '../../components/FormText.jsx'
import { Checkbox, Table, Radio } from 'flowbite-react'

const AnswerCreatePage = () => {
  const { surveyId } = useParams()

  const [survey, setSurvey] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    SurveyService.getById(surveyId)
      .then(setSurvey)
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />
  if (error || !survey) return <div>Hata</div>

  return (
    <>
      {/*<pre>{JSON.stringify(survey, null, 2)}</pre>*/}
      <div className="flex flex-col gap-3">
        <div>
          <span>logo --#-- {survey.logo.path}</span>
        </div>
        <div className="py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span className="font-medium">{survey.firstTitle}</span>
        </div>

        {survey.questions.reduce((acc, curr) => {
          let question = false
          const generalProps = { key: curr._id }

          switch (curr.questionType) {
            case 'text': {
              question = (
                <div {...generalProps}>
                  <Input label={curr.question.title} />
                </div>
              )
              break
            }
            case 'select': {
              question = (
                <div
                  className="flex flex-col"
                  {...generalProps}
                >
                  <FormText>{curr.question.title}</FormText>
                  {curr.question.options.map((option) => (
                    <div
                      key={option._id}
                      className="flex items-center gap-2"
                    >
                      {curr.question.multiSelect ? (
                        <Checkbox />
                      ) : (
                        <Radio name={curr.question._id} />
                      )}{' '}
                      {option.option}
                    </div>
                  ))}
                </div>
              )
              break
            }
            case 'rate': {
              question = (
                <div {...generalProps}>
                  <FormText>{curr.question.title}</FormText>
                  <Table>
                    <Table.Head>
                      <Table.HeadCell></Table.HeadCell>
                      {curr.question.columnOptions.map((col) => (
                        <Table.HeadCell key={col._id}>{col.column}</Table.HeadCell>
                      ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {curr.question.rowOptions.map((row) => (
                        <Table.Row key={row._id}>
                          <Table.Cell>{row.row}</Table.Cell>
                          {curr.question.columnOptions.map((col) => (
                            <Table.Cell key={col._id}>
                              <Radio name={row._id} />
                            </Table.Cell>
                          ))}
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )
            }
          }

          if (question) {
            return acc.concat(question)
          }
          return acc
        }, [])}

        <div className="py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span className="font-medium">{survey.finishTitle}</span>
        </div>
      </div>
    </>
  )
}

export default AnswerCreatePage
