import Container from '../components/Container'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Container>
      <div className="flex justify-center gap-2 rounded border-solid border border-gray-400 p-6 w-full">
        <Button
          as={Link}
          to="/"
          className="flex-1"
        >
          Anket Ekle
        </Button>
        <Button
          as={Link}
          to="/"
          className="flex-1"
          variant="gray"
        >
          Anketler
        </Button>
        <Button
          as={Link}
          to="/"
          className="flex-1"
        >
          Anket Cevapla
        </Button>
      </div>
    </Container>
  )
}
export default HomePage
