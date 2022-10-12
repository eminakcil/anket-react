import { Label, TextInput } from 'flowbite-react'

const TextQuestion = ({ prefix = '' }) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label value={`${prefix}Açık Soru Tipi`} />
      </div>
      <TextInput
        type="text"
        placeholder="Soru başlığı"
      />
    </div>
  )
}
export default TextQuestion
