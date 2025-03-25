import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NatjecanjeService from "../../services/NatjecanjeService";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';


export default function NatjecanjaPromjena(){

    const [natjecanje,setNatjecanje] = useState({});
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
    const { prikaziError } = useError();

    async function dohvatiNatjecanje(){
        showLoading();
        const odgovor = await NatjecanjeService.getBySifra(routeParams.sifra);
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka)
            return
        }
        
        setNatjecanje(odgovor)
    }

    useEffect(()=>{
        dohvatiNatjecanje();
    },[])

    async function promjena(natjecanje){
        showLoading();
        const odgovor = await NatjecanjeService.promjena(routeParams.sifra,natjecanje)
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        navigate(RouteNames.NATJECANJE_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        promjena(
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
        Promjena natjecanja
            
            <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required defaultValue={natjecanje.naziv}/>
                </Form.Group>

            <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Control type="text" name="vrsta" required defaultValue={natjecanje.vrsta}/>
                </Form.Group>

            <Form.Group controlId="drzava">
                    <Form.Label>Država</Form.Label>
                    <Form.Control type="text" name="drzava" required defaultValue={natjecanje.drzava}/>
                </Form.Group>

            <Form.Group controlId="sezona">
                    <Form.Label>Sezona</Form.Label>
                    <Form.Control type="text" name="sezona" required defaultValue={natjecanje.sezona}/>
                </Form.Group>

            <Form.Group controlId="pobjednik">
                    <Form.Label>Pobjednik</Form.Label>
                    <Form.Control type="text" name="pobjednik" required defaultValue={natjecanje.pobjednik}/>
                </Form.Group>

            <Form.Group controlId="najboljiIgrac">
                    <Form.Label>MVP</Form.Label>
                    <Form.Control type="text" name="najboljiIgrac" defaultValue={natjecanje.najboljiIgrac}/>   
                </Form.Group>



                <hr/>
                <Row>
                    <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.NATJECANJE_PREGLED}
                    className="btn btn-danger siroko">
                            Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit" className="siroko">
                        Promjeni natjecanje
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}