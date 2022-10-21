import { dateFormat } from '../../../../utils.js'

const SelectQuestion = ({ question }) => {
  return (
    <div className="flex gap-3 flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
      {/* <span>{JSON.stringify(question)}</span> */}

      <span>
        <span className="font-medium">Soru: </span>
        {question.question.title}
      </span>
      <span className="py-3 px-1 font-medium">
        {question.question.multiselect
          ? '**Birden fazla seçim yapılabilir**'
          : '**Tek cevap işaretlenebilir**'}
      </span>
      {/**deneme */}
      <span>
        {question.question.options.map((option) => (
          <>
            <div className="flex gap-3 items-center">
              <span className="h-4 w-4 rounded-full bg-blue-600"></span>
              <span>{option.option}</span>
            </div>
          </>
        ))}
      </span>
      <span className="flex font-medium text-blue-700 text-sm">
        {question.required ? 'Cevaplamak zorunlu' : 'Cevaplamak zorunlu değil'}
        <span className="ml-auto">{dateFormat(question.createdAt)}</span>
      </span>
    </div>
  )
}

export default SelectQuestion
