import classNames from 'classnames'
import { Button, ListGroup, Modal } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { arrowLeft } from '../../../icons'
import RateQuestion from './RateQuestion'
import SelectQuestion from './SelectQuestion'
import TextQuestion from './TextQuestion'

const AddQuestionModal = ({ show, onClose }) => {
  const [questionType, setQuestionType] = useState(false)

  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const questionSelectRef = useRef()
  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const ghostRef = useRef()
  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const contentRef = useRef()

  const rateQuestionRef = useRef()

  useEffect(() => {
    if (questionSelectRef.current && ghostRef.current) {
      const element = questionType ? contentRef : questionSelectRef
      ghostRef.current.style.height = `${element.current.clientHeight}px`
    }
  }, [questionType, questionSelectRef, ghostRef, show])

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header>Soru Ekle</Modal.Header>
      <Modal.Body>
        <div className="relative h-min overflow-hidden">
          <div
            ref={questionSelectRef}
            className={classNames('absolute w-full left-0 z-10 transition-all duration-500', {
              'translate-x-0 opacity-100': !questionType,
              '-translate-x-full opacity-0': !!questionType,
            })}
          >
            <ListGroup>
              <ListGroup.Item active>Soru Tipi Seç</ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('yes/no')}>
                Evet / Hayır soru tipi
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('text')}>
                Açık soru tipi
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('select')}>
                Seçim listeli soru tipi
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('rate')}>
                Derecelendirme soru tipi
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div
            ref={contentRef}
            className={classNames('absolute w-full left-0 z-10 transition-all duration-500', {
              '-translate-x-0 opacity-100': !!questionType,
              'translate-x-full opacity-0': !questionType,
            })}
          >
            <Button
              gradientDuoTone="cyanToBlue"
              size="xs"
              onClick={() => {
                setQuestionType(false)
              }}
            >
              <div className="flex gap-4 items-center text-white">
                <span>{arrowLeft}</span> <span>Geri</span>
              </div>
            </Button>
            {(questionType === 'text' && <TextQuestion />) ||
              (questionType === 'select' && <SelectQuestion />) ||
              (questionType === 'rate' && <RateQuestion ref={rateQuestionRef} />) ||
              (questionType === 'yes/no' && (
                <SelectQuestion
                  initalValue={[
                    { id: 1, value: 'Evet' },
                    { id: 2, value: 'Hayır' },
                  ]}
                  allowNewItem={false}
                  label="Evet / Hayır soru tipi"
                  editableItems={false}
                  allowMultiselectToggle={false}
                  multiSelect={false}
                />
              ))}
          </div>
          <div
            ref={ghostRef}
            className="opacity-0 z-0"
          ></div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default AddQuestionModal
