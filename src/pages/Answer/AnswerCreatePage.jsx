import { Fragment, useEffect, useState } from 'react'
import Loading from '../../components/Loading.jsx'
import { useParams } from 'react-router-dom'
import { SurveyService } from '../../services'
import Input from '../../components/Input'
import FormText from '../../components/FormText.jsx'
import { Checkbox, Table, Radio } from 'flowbite-react'
import Button from '../../components/Button'
import { AnswerService } from '../../services'

const AnswerCreatePage = () => {
  const { surveyId } = useParams()

  const [survey, setSurvey] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [answers, setAnswers] = useState([])

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

  const answerChangeHandle = (value, question) => {
    const answerType = `${question.questionType}-answer`

    const existingAnswer = answers.find((answer) => answer.question === question._id)
    if (existingAnswer) {
      // cevap var güncellesek kafi
      console.log('cevap var')
      switch (answerType) {
        case 'text-answer': {
          let newAnswer
          if (value.length > 0) {
            newAnswer = { ...existingAnswer, answer: { ...existingAnswer.answer, answer: value } }
          }
          setAnswers((x) =>
            x
              .map((answer) => (answer.question === existingAnswer.question ? newAnswer : answer))
              .filter((x) => x)
          )
          break
        }
        case 'select-answer': {
          let options

          if (question.question.multiSelect) {
            if (value.checked) options = existingAnswer.answer.options.concat(value.option)
            else options = existingAnswer.answer.options.filter((x) => x !== value.option)
          } else {
            if (value.checked) options = [value.option]
            else options = []
          }

          let newAnswer
          if (options?.length > 0)
            newAnswer = {
              ...existingAnswer,
              answer: {
                ...existingAnswer.answer,
                options,
              },
            }

          setAnswers((x) =>
            x
              .map((answer) => (answer.question === existingAnswer.question ? newAnswer : answer))
              .filter((x) => x)
          )
          break
        }
        case 'rate-answer': {
          let newAnswer

          const existingRow = existingAnswer.answer.matrix.find((x) => x.row === value.row)

          if (existingRow) {
            newAnswer = {
              ...existingAnswer,
              answer: {
                ...existingAnswer.answer,
                matrix: existingAnswer.answer.matrix.map((x) =>
                  x.row === value.row ? { ...x, col: value.col } : x
                ),
              },
            }
          } else {
            newAnswer = {
              ...existingAnswer,
              answer: {
                ...existingAnswer.answer,
                matrix: existingAnswer.answer.matrix.concat({ row: value.row, col: value.col }),
              },
            }
          }

          setAnswers((x) =>
            x
              .map((answer) => (answer.question === existingAnswer.question ? newAnswer : answer))
              .filter((x) => x)
          )

          break
        }
      }
    } else {
      console.log('cevap yok')

      let answer
      switch (answerType) {
        case 'text-answer': {
          answer = {
            answer: value,
          }
          break
        }
        case 'select-answer': {
          answer = {
            options: [],
          }
          if (value.checked) answer.options.push(value.option)
          break
        }
        case 'rate-answer': {
          answer = {
            matrix: [],
          }
          if (value.checked)
            answer.matrix.push({
              row: value.row,
              col: value.col,
            })
          break
        }
      }
      const answerData = {
        question: question._id,
        answerType,
        answer,
      }
      console.log(answerData)
      setAnswers((x) => x.concat(answerData))
    }
  }

  const clickHandle = () => {
    AnswerService.newAnswer({
      survey: surveyId,
      answers,
    })
  }

  if (loading) return <Loading />
  if (error || !survey) return <div>Hata</div>

  return (
    <>
      {/*<pre>{JSON.stringify(survey, null, 2)}</pre>*/}
      <div className="flex flex-col gap-3">
        <img
          className="justify-self-center w-full max-w-xl self-center"
          src={'http://localhost:3000'.concat(survey.logo.path)}
          crossOrigin="anonymous"
        />
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
                  <Input
                    onChange={(e) => answerChangeHandle(e.target.value, curr)}
                    value={answers.find((x) => x.question === curr._id)?.answer?.answer || ''}
                    label={curr.question.title}
                  />
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
                        <Checkbox
                          onChange={(e) => {
                            answerChangeHandle(
                              {
                                checked: e.target.checked,
                                option: option._id,
                              },
                              curr
                            )
                          }}
                          checked={
                            answers
                              ?.find((x) => x.question === curr._id)
                              ?.answer?.options?.find((x) => x === option._id) || false
                          }
                        />
                      ) : (
                        <Radio
                          onChange={(e) => {
                            answerChangeHandle(
                              {
                                checked: e.target.checked,
                                option: option._id,
                              },
                              curr
                            )
                          }}
                          checked={
                            answers
                              ?.find((x) => x.question === curr._id)
                              ?.answer?.options?.find((x) => x === option._id) || false
                          }
                        />
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
                              <Radio
                                onChange={(e) => {
                                  answerChangeHandle(
                                    {
                                      checked: e.target.checked,
                                      row: row._id,
                                      col: col._id,
                                    },
                                    curr
                                  )
                                }}
                                checked={
                                  answers
                                    ?.find((x) => x.question === curr._id)
                                    ?.answer?.matrix?.find(
                                      (x) => x.row === row._id && x.col === col._id
                                    ) || false
                                }
                              />
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
        <Button onClick={clickHandle}>Gönder</Button>
      </div>
    </>
  )
}

export default AnswerCreatePage
