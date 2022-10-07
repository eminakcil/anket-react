import { Label, TextInput } from 'flowbite-react'

const TextQuestion = () => {
  return (
    <div>
      <div className="mb-2 block">
        <Label value="Açık Soru Tipi" />
      </div>
      <TextInput
        type="text"
        placeholder="Soru başlığı"
      />
    </div>
  )
}
export default TextQuestion
