import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import IgracService from "../../services/IgracService";
import { useEffect, useState } from "react";



export default function IgraciPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [igrac,setIgrac] = useState({});


    async function dohvatiIgrac(){
        const odgovor = await IgracService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setIgrac(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiIgrac();
    },[]);

    async function promjena(e){
        const odgovor = await IgracService.promjena(routeParams.sifra,e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.IGRAC_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            dob: podaci.get('dob'),
            pozicija: podaci.get('pozicija').trim()=='' ? null : podaci.get('pozicija').trim(),
            golovi: podaci.get('golovi').trim()=='' ? null : podaci.get('golovi').trim(),
            asistencije: podaci.get('asistencije').trim()=='' ? null : podaci.get('asistencije').trim()
        });

    }

    return(
        <>
            Promjena Igrača
            
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required defaultValue={igrac.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required  defaultValue={igrac.prezime}/>
                </Form.Group>

                <Form.Group controlId="dob">
                    <Form.Label>Dob</Form.Label>
                    <Form.Control type="text" name="dob" required  defaultValue={igrac.dob}/>
                </Form.Group>


                <Form.Group controlId="pozicija">
                    <Form.Label>Pozicija</Form.Label>
                    <Form.Control type="text" name="pozicija" defaultValue={igrac.pozicija} />
                </Form.Group>


                <Form.Group controlId="golovi">
                    <Form.Label>Golovi</Form.Label>
                    <Form.Control type="text" name="golovi"  defaultValue={igrac.golovi}/>
                </Form.Group>

                <Form.Group controlId="asistencije">
                    <Form.Label>Asistencije</Form.Label>
                    <Form.Control type="text" name="asistencije"  defaultValue={igrac.asistencije}/>
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
                        Promjeni igrača
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}