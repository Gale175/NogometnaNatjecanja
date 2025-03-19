import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import NatjecanjaPregled from './pages/natjecanja/NatjecanjaPregled'
import NatjecanjaDodaj from './pages/natjecanja/NatjecanjaDodaj'
import NatjecanjaPromjena from './pages/natjecanja/NatjecanjaPromjena'
import IgraciPregled from './pages/igraci/IgraciPregled'
import IgraciDodaj from './pages/igraci/IgraciDodaj'
import IgraciPromjena from './pages/igraci/IgraciPromjena'
import TimoviPregled from './pages/timovi/TimoviPregled'
import TimoviDodaj from './pages/timovi/TimoviDodaj'
import TimoviPromjena from './pages/timovi/TimoviPromjena'

import LoadingSpinner from './components/LoadingSpinner'
import Login from "./pages/Login"
import useAuth from "./hooks/useAuth"
import NadzornaPloca from './pages/NadzornaPloca'
import useError from "./hooks/useError"
import ErrorModal from "./components/ErrorModal"
import EraDijagram from './pages/EraDiagram'


function App() {

  return (
    <>
      <Container>
        <NavBarEdunova />
        
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          
          <Route path={RouteNames.NATJECANJE_PREGLED} element={<NatjecanjaPregled />} />
          <Route path={RouteNames.NATJECANJE_NOVI} element={<NatjecanjaDodaj />} />
          <Route path={RouteNames.NATJECANJE_PROMJENA} element={<NatjecanjaPromjena />} />

          <Route path={RouteNames.IGRAC_PREGLED} element={<IgraciPregled />} />
          <Route path={RouteNames.IGRAC_NOVI} element={<IgraciDodaj />} />
          <Route path={RouteNames.IGRAC_PROMJENA} element={<IgraciPromjena />} />

          <Route path={RouteNames.TIM_PREGLED} element={<TimoviPregled />} />
          <Route path={RouteNames.TIM_NOVI} element={<TimoviDodaj />} />
          <Route path={RouteNames.TIM_PROMJENA} element={<TimoviPromjena />} />

        </Routes>

        <hr />
        &copy; Martin Galik & Edunova Team WP7 2025
      </Container>
     
    </>
  )
}

export default App
