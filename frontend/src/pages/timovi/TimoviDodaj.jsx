import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/TimService';
import NatjecanjeService from '../../services/NatjecanjeService';
import { RouteNames } from '../../constants';
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';

export default function TimoviDodaj() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [natjecanja, setNatjecanja] = useState([]);
  const [natjecanjeSifra, setNatjecanjeSifra] = useState(0);

  const { prikaziError } = useError();

  async function dohvatiNatjecanja(){
    showLoading();
    const odgovor = await NatjecanjeService.get();
    hideLoading();
    setNatjecanja(odgovor.poruka);
    setNatjecanjeSifra(odgovor.poruka[0].sifra);
  }



  useEffect(()=>{
    dohvatiNatjecanja();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(e) {
    showLoading();
    const odgovor = await Service.dodaj(e);
    hideLoading();
    if(odgovor.greska){
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.TIM_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodaj({
      naziv: podaci.get('naziv'),
      natjecanjeSifra: parseInt(natjecanjeSifra),
      trener: podaci.get('trener'),
      stadion: podaci.get('stadion')
    });
  }

  return (
      <>
      Dodavanje novog tima
      
      <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="naziv">
              <Form.Label>Naziv</Form.Label>
              <Form.Control type="text" name="naziv" required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='natjecanje'>
            <Form.Label>Natjecanje</Form.Label>
            <Form.Select 
            onChange={(e)=>{setNatjecanjeSifra(e.target.value)}}
            >
            {natjecanja && natjecanja.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="trener">
              <Form.Label>Trener</Form.Label>
              <Form.Control type="text" name="trener" required />
          </Form.Group>

          <Form.Group controlId="stadion">
              <Form.Label>Stadion</Form.Label>
              <Form.Control type="text" name="stadion" />
          </Form.Group>


          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RouteNames.TIM_PREGLED}
              className="btn btn-danger siroko">
              Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                  Dodaj novi tim
              </Button>
              </Col>
          </Row>
      </Form>
  </>
  );
}
