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
                najboljiIgrac: podaci.get('najboljiIgrac')
                
            }
        );
    }

    return(
    <>
    Dodavanje natjecanja
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required />
        </Form.Group>

        <Form.Group controlId="vrsta">
            <Form.Label>Vrsta</Form.Label>
            <Form.Control type="text" name="vrsta" required />
        </Form.Group>

        <Form.Group controlId="drzava">
            <Form.Label>Država</Form.Label>
            <Form.Control type="text" name="drzava" required />
        </Form.Group>

        <Form.Group controlId="sezona">
            <Form.Label>Sezona</Form.Label>
            <Form.Control type="text" name="sezona" required />
        </Form.Group>

        <Form.Group controlId="pobjednik">
            <Form.Label>Pobjednik</Form.Label>
            <Form.Control type="text" name="pobjednik" required />
        </Form.Group>

        <Form.Group controlId="najboljiIgrac">
            <Form.Label>MVP</Form.Label>
            <Form.Control type="text" name="najboljiIgrac" />
        </Form.Group>


        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.NATJECANJE_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Dodaj natjecanje
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}