import { Link, Outlet } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'

import { getPath } from '../utils'

const MainLayout = () => {
  return (
    <Container>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-2 rounded border-solid border border-gray-400 p-6 w-full">
          <Button
            as={Link}
            to={getPath('surveys.create')}
            className="flex-1"
          >
            Anket Ekle
          </Button>
          <Button
            as={Link}
            to={getPath('surveys')}
            className="flex-1"
            variant="gray"
          >
            Anketler
          </Button>
          <Button
            as={Link}
            to={getPath('answers.create', { surveyId: '634919a841e3495a18c16439' })}
            className="flex-1"
          >
            Anket Cevapla
          </Button>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </Container>
  )
}
export default MainLayout
