<<<<<<< HEAD
import { TextInput } from 'flowbite-react'
=======
>>>>>>> 0eca09edaf4794379ec248050a1ae962bc0c46da
import { dateFormat } from '../../../../utils.js'

const TextQuestion = ({ question }) => {
  return (
    <div className="flex flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
      {/* <span>{JSON.stringify(question)}</span> */}

      <span>
        <span className="font-medium">Soru: </span>
        {question.question.title}
      </span>
      <span className="py-3 py-3">
        <TextInput type="text" />
      </span>
      <span className="flex font-medium text-blue-700 text-sm">
        {question.required ? 'Cevaplamak zorunlu' : 'Cevaplamak zorunlu değil'}
        <span className="ml-auto">{dateFormat(question.createdAt)}</span>
      </span>
    </div>
  )
}
export default TextQuestion
