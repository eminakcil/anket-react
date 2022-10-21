import React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'

const BarChart = () => {
  ChartJS.register(...registerables)

  const labels = [
    'Eğitimden Memnun kaldınız mı?',
    'Eğitim yeterli miydi',
    'Tekrar katılır mısınız?',
    'Tekrar katılır mısınız?',
  ]
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return (
    <>
      <div>
        <Bar
          data={data}
          height={400}
          width={600}
        />
      </div>
    </>
  )
}
export default BarChart
