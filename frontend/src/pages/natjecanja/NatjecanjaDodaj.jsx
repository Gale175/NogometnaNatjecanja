import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import NatjecanjeService from "../../services/NatjecanjeService";


export default function NatjecanjaDodaj(){

    const navigate = useNavigate();

    async function dodaj(natjecanje){
        const odgovor = await NatjecanjeService.dodaj(natjecanje);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.NATJECANJE_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        dodaj(
            {
                naziv: podaci.get('naziv'),
                vrsta: podaci.get('vrsta'),
                drzava: podaci.get('drzava'),
                sezona: podaci.get('sezona'),
                pobjednik: podaci.get('pobjednik'),
                MVP: podaci.get('najboljiIgrac')
                
            }
        );
    }

    return(
    <>
    Dodavanje smjera
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required />
        </Form.Group>

        <Form.Group controlId="cijenaSmjera">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="number" name="cijenaSmjera" step={0.01} />
        </Form.Group>

        <Form.Group controlId="izvodiSeOd">
            <Form.Label>Izvodi se od</Form.Label>
            <Form.Control type="date" name="izvodiSeOd" />
        </Form.Group>


        <Form.Group controlId="vaucer">
            <Form.Check label="Vaučer" name="vaucer" />
        </Form.Group>

        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.SMJER_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Dodaj smjer
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}