import { Radio, Table } from 'flowbite-react'
import { dateFormat } from '../../../../utils.js'

const RateQuestion = ({ question }) => {
  return (
    <div className="flex flex-col py-3 px-2 gap-3 border border-solid border-gray-200 rounded-xl">
      {/* <span>{JSON.stringify(question)}</span> */}

      <span>
        <span className="font-medium">Soru: </span>
        {question.question.title}
      </span>

      <Table>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          {question.question.columnOptions.map((col) => (
            <Table.HeadCell key={col._id}>{col.column}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {question.question.rowOptions.map((row) => (
            <Table.Row key={row._id}>
              <Table.Cell>{row.row}</Table.Cell>
              {question.question.columnOptions.map((col) => (
                <Table.Cell key={col._id}>
                  <Radio name={row._id} />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <span className="flex font-medium text-blue-700 text-sm">
        {question.required ? 'Cevaplamak zorunlu' : 'Cevaplamak zorunlu değil'}
        <span className="ml-auto">{dateFormat(question.createdAt)}</span>
      </span>
    </div>
  )
}
export default RateQuestion
