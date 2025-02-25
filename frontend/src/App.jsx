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
        </Routes>

        <hr />
        &copy; Martin Galik 2025
      </Container>
     
    </>
  )
}

export default App
