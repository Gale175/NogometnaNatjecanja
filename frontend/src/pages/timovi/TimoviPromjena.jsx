import { Form, Row, Col, Table, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Service from '../../services/TimService';
import NatjecanjeService from '../../services/NatjecanjeService';
import IgracService from '../../services/IgracService';
import { RouteNames } from '../../constants';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


export default function TimoviPromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [natjecanja, setNatjecanja] = useState([]);
  const [natjecanjeSifra, setNatjecanjeSifra] = useState(0);
  const [igraci, setIgraci] = useState([]);
  const [pronadeniIgraci, setPronadeniIgraci] = useState([]);

  const [tim, setTim] = useState({});

  const typeaheadRef = useRef(null);

  async function dohvatiNatjecanja(){
    const odgovor = await NatjecanjeService.get();
    setNatjecanja(odgovor.poruka);
  }

  async function dohvatiTim() {
    const odgovor = await Service.getBySifra(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }
    let tim = odgovor.poruka;
    setTim(tim);
    setNatjecanjeSifra(tim.natjecanjeSifra); 
  }

  async function dohvatiIgraci() {
    const odgovor = await Service.getIgraci(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    setIgraci(odgovor.poruka);
  }

  async function traziIgrac(uvjet) {
    const odgovor =  await IgracService.traziIgrac(uvjet);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    setPronadeniIgraci(odgovor.poruka);
  }

  async function dodajIgraca(e) {
    const odgovor = await Service.dodajIgraca(routeParams.sifra, e[0].sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
      await dohvatiIgraci();
      typeaheadRef.current.clear();
  }

  async function obrisiIgraca(igrac) {
    const odgovor = await Service.obrisiIgraca(routeParams.sifra, igrac);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
      await dohvatiIgraci();
  }


  async function dohvatiInicijalnePodatke() {
    await dohvatiNatjecanja();
    await dohvatiTim();
    await dohvatiIgraci();
  }


  useEffect(()=>{
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function promjena(e){
    const odgovor = await Service.promjena(routeParams.sifra,e);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RouteNames.TIM_PREGLED);
}

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    promjena({
      naziv: podaci.get('naziv'),
      natjecanjeSifra: parseInt(natjecanjeSifra),
      trener: podaci.get('trener'),
      stadion: podaci.get('stadion')
    });
  }

  return (
      <>
      Mijenjanje podataka tima
      <Row>
        <Col key='1' sm={12} lg={6} md={6}>
          <Form onSubmit={obradiSubmit}>
              <Form.Group controlId="naziv">
                  <Form.Label>Naziv</Form.Label>
                  <Form.Control type="text" name="naziv" required defaultValue={tim.naziv}/>
              </Form.Group>

              <Form.Group className='mb-3' controlId='natjecanje'>
                <Form.Label>Natjecanje</Form.Label>
                <Form.Select
                value={natjecanjeSifra}
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
                  <Form.Control type="text" name="trener" required defaultValue={tim.trener}/>
              </Form.Group>

              <Form.Group controlId="stadion">
                  <Form.Label>Stadion</Form.Label>
                  <Form.Control type="text" name="stadion" required defaultValue={tim.stadion}/>
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
                      Promjeni tim
                  </Button>
                  </Col>
              </Row>
          </Form>
        </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        <div style={{overflow: 'auto', maxHeight:'400px'}}>
        <Form.Group className='mb-3' controlId='uvjet'>
          <Form.Label>Traži igrača</Form.Label>
            <AsyncTypeahead
            className='autocomplete'
            id='uvjet'
            emptyLabel='Nema rezultata'
            searchText='Tražim...'
            labelKey={(igrac) => `${igrac.prezime} ${igrac.ime}`}
            minLength={3}
            options={pronadeniIgraci}
            onSearch={traziIgrac}
            placeholder='dio imena ili prezimena'
            renderMenuItemChildren={(igrac) => (
              <>
                <span>
                   {igrac.prezime} {igrac.ime}
                </span>
              </>
            )}
            onChange={dodajIgraca}
            ref={typeaheadRef}
            />
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Igrači u timu</th>
              </tr>
            </thead>
            <tbody>
              {igraci &&
                igraci.map((igrac, index) => (
                  <tr key={index}>
                    <td>
                       {igrac.ime} {igrac.prezime}
                      
                    </td>
                    <td>
                      <Button variant='danger' onClick={() =>
                          obrisiIgraca(igrac.sifra)
                        } >
                        <FaTrash />
                      </Button>
      
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          </div>
        </Col>
        </Row>
        </>
  );
}
