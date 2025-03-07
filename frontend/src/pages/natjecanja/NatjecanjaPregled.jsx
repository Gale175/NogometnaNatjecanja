import { useEffect, useState } from "react"
import NatjecanjeService from "../../services/NatjecanjeService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";


export default function NatjecanjaPregled(){

    const[natjecanja, setNatjecanja] = useState([]); // Inicijalizacija kao prazan niz
    const navigate = useNavigate();

    async function dohvatiNatjecanja(){
        const odgovor = await NatjecanjeService.get();
        if (odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        if (Array.isArray(odgovor.poruka)) {
            setNatjecanja(odgovor.poruka); // Postavljanje sa odgovor.poruka
        } else {
            console.error('API ne vraća niz natjecanja.');
            setNatjecanja([]); // Postavite prazan niz kao fallback
        }
    }

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Natjecanja
    useEffect(()=>{
        dohvatiNatjecanja();
    },[])


    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano'
        }
        return moment.utc(datum).format('DD. MM. YYYY.')
    }

    function vaucer(v){
        if(v==null) return 'gray'
        if(v) return 'green'
        return 'red'
    }

    function vaucerText(v){
        if(v==null) return 'Nije definirano'
        if(v) return 'Vaučer'
        return 'NIJE vaučer'
    }

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeNatjecanja(sifra);
    }

    async function brisanjeNatjecanja(sifra) {
        const odgovor = await NatjecanjeService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
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
                        
                  


                        <td>
                            <Button
                            onClick={()=>navigate(`/natjecanja/${natjecanje.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(natjecanje.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}