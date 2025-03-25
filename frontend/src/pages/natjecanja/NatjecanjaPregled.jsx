import { useEffect, useState } from "react"
import NatjecanjeService from "../../services/NatjecanjeService"
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';


export default function NatjecanjaPregled(){

    const navigate = useNavigate()
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    const[natjecanja, setNatjecanja] = useState(); 

    async function dohvatiNatjecanja(){
        showLoading();
        const odgovor = await NatjecanjeService.get();
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka)
            return
        }
          //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
          setNatjecanja(odgovor.poruka)
    } 

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Natjecanja
    useEffect(()=>{
        dohvatiNatjecanja();
    },[])

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeNatjecanja(sifra);
    }

    async function brisanjeNatjecanja(sifra) {
        showLoading();
        const odgovor = await NatjecanjeService.brisanje(sifra);
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka)
            return
        }
        dohvatiNatjecanja();
    }


    return(
        <>
        <Link to={RouteNames.NATJECANJE_NOVI}className="btn btn-success siroko">
            <IoIosAdd
            size={25}
            />
            Dodaj novo natjecanje</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Vrsta</th>
                    <th>Država</th>
                    <th>Sezona</th>
                    <th>Pobjednik</th>
                    <th>MVP</th>
                    <th>Opcije</th>
                </tr>
            </thead>
            <tbody>
                {natjecanja && natjecanja.map((natjecanje,index)=>(
                    <tr key={index}>
                        <td>
                            {natjecanje.naziv}
                        </td>
                        <td>
                            {natjecanje.vrsta}
                        </td>
                        <td>
                            {natjecanje.drzava}
                        </td>
                        <td>
                            {natjecanje.sezona}
                        </td>
                        <td>
                            {natjecanje.pobjednik}
                        </td>
                        <td>
                            {natjecanje.najboljiIgrac}
                        </td>

                        <td className="sredina">
                            <Button
                            variant='primary'
                            onClick={()=>navigate(`/natjecanja/${natjecanje.sifra}`)}
                            >
                                <FaEdit 
                            size={25}
                            />
                            </Button>


                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(natjecanje.sifra)}
                            >
                                <FaTrash
                            size={25}/>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}