import { dateFormat } from "../../../../utils.js";

const TextQuestion = ({ question }) => {
  return (
    <div className="flex flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
      <span>{JSON.stringify(question)}</span>

      <span>
        <span className="font-medium">Soru: </span>
        {question.question.title}
      </span>
      <span className="flex">
        <span className="font-medium">Zorunlu cevap: </span>
        {question.question.required ? 'zorunlu' : 'zorunlu değil'}
        <span className="ml-auto">{dateFormat(question.createdAt)}</span>
      </span>
    </div>
  )
}
export default TextQuestion
