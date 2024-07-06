import Footer from 'src/component/Footer'
import RegisterHeader from 'src/component/RegisterHeader'

interface Props {
  children?: React.ReactNode
}
export default function Registerlayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
