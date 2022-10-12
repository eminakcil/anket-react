import { ListGroup } from 'flowbite-react'
import { Fragment } from 'react'
import { useState } from 'react'
import RateQuestion from './RateQuestion'
import SelectQuestion from './SelectQuestion'
import TextQuestion from './TextQuestion'

const SurveyForm = ({ initalFormData = [] }) => {
  const [formData, setFormData] = useState(initalFormData)

  const addFormItem = (type) => {
    setFormData((x) => {
      let item = { type }

      // switch (type) {
      //   case 'text':
      //     item = { type }
      //     break

      //   default:
      //     return x
      // }

      return [...x, item]
    })
  }

  return (
    <>
      {formData.map((formItem, index) => (
        <Fragment key={index}>
          {(formItem.type === 'text' && <TextQuestion prefix={`${index + 1}. `} />) ||
            (formItem.type === 'select' && <SelectQuestion prefix={`${index + 1}. `} />) ||
            (formItem.type === 'rate' && <RateQuestion prefix={`${index + 1}. `} />) ||
            (formItem.type === 'yes/no' && (
              <SelectQuestion
                prefix={`${index + 1}. `}
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
        </Fragment>
      ))}
    </>
  )
}
export default SurveyForm
