import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Service from "../../services/TimService"; // primjetite promjenu naziva
import { RouteNames } from "../../constants";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';
import TimService from "../../services/TimService";

export default function TimoviPregled(){
    const [timovi,setTimovi] = useState();
    let navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError(); 

    async function dohvatiTimovi(){
        showLoading();
        await Service.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setTimovi(odgovor);
        })
        .catch((e)=>{console.log(e)});
        hideLoading();
    }


    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeTima(sifra);
    }

    async function brisanjeTima(sifra) {
        showLoading();
        const odgovor = await TimService.obrisi(sifra);
        showLoading();
        //console.log(odgovor);
        if(odgovor.greska){
            prikaziError(odgovor.poruka)
            return
        }
        dohvatiTimovi();
    }

    useEffect(()=>{
        dohvatiTimovi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (

        <Container>
            <Link to={RouteNames.TIM_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj novi tim
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Natjecanje</th>
                        <th>Trener</th>
                        <th>Stadion</th>
                        <th>Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    {timovi && timovi.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.naziv}</td>
                            <td>{entitet.natjecanjeNaziv}</td>
                            <td>{entitet.trener}</td>
                            <td>{entitet.stadion}</td>

                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/timovi/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisi(entitet.sifra)}
                                    >
                                        <FaTrash
                                    size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}