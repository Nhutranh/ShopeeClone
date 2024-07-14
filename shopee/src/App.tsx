import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElemrnt = useRouteElement()
  return (
    <div>
      {routeElemrnt}
      <ToastContainer />
    </div>
  )
}

export default App
