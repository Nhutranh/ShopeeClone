import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { localStorageEventTardet } from './untils/auth'
import { AppContext } from './contenxts/app.context'

function App() {
  const routeElemrnt = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTardet.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTardet.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      {routeElemrnt}
      <ToastContainer />
    </div>
  )
}

export default App
