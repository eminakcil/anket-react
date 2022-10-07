import { ListGroup } from 'flowbite-react'
import RateQuestion from './RateQuestion'
import SelectQuestion from './SelectQuestion'
import TextQuestion from './TextQuestion'

const SurveyForm = () => {
  return (
    <>
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
      <SelectQuestion />
      <TextQuestion />
      <RateQuestion />
      <div>
        <ListGroup>
          <ListGroup.Item active>Soru Tipi Seç</ListGroup.Item>
          <ListGroup.Item>Evet / Hayır soru tipi</ListGroup.Item>
          <ListGroup.Item>Açık soru tipi</ListGroup.Item>
          <ListGroup.Item>Seçim listeli soru tipi</ListGroup.Item>
          <ListGroup.Item>Derecelendirme soru tipi</ListGroup.Item>
        </ListGroup>
      </div>
    </>
  )
}
export default SurveyForm
