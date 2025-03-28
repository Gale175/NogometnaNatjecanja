import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import IgracService from "../../services/IgracService";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';


export default function IgraciDodaj(){

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    async function dodaj(e){
        showLoading();
        const odgovor = await IgracService.dodaj(e);
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        navigate(RouteNames.IGRAC_PREGLED);
    }

    function obradiSubmit(e){ 
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            dob: parseInt(podaci.get('dob')), // promjeni i na ostale int
            pozicija: podaci.get('pozicija').trim()=='' ? null : podaci.get('pozicija').trim(),
            golovi: podaci.get('golovi'),
            asistencije: podaci.get('asistencije')
        });

    }

    return(
        <>
            Dodavanje novog igrača
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Dob</Form.Label>
                    <Form.Control type="text" name="dob"  />
                </Form.Group>

                <Form.Group controlId="pozicija">
                    <Form.Label>Pozicija</Form.Label>
                    <Form.Control type="text" name="pozicija" />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>Golovi</Form.Label>
                    <Form.Control type="text" name="golovi"  />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>Asistencije</Form.Label>
                    <Form.Control type="text" name="asistencije"  />
                </Form.Group>

             


                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RouteNames.IGRAC_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Dodaj novog igrača
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}