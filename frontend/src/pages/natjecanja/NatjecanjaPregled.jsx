import { useEffect, useState } from "react"
import SmjerService from "../../services/NatjecanjeService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function NatjecanjaPregled(){

    const[smjerovi, setNatjecanja] = useState();
    const navigate = useNavigate();

    async function dohvatiNatjecanja(){
        const odgovor = await NatjecanjeService.get()
        setNatjecanja(odgovor)
    }

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Smjerovi
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
        brisanjeSmjera(sifra);
    }

    async function brisanjeSmjera(sifra) {
        const odgovor = await SmjerService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiSmjerove();
    }


    return(
        <>
        <Link
        to={RouteNames.SMJER_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi smjer</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Vrsta</th>
                    <th>Država</th>
                    <th>Sezona</th>
                    <th>Pobjednik</th>
                    <th>MVP</th>
                </tr>
            </thead>
            <tbody>
                {smjerovi && smjerovi.map((smjer,index)=>(
                    <tr key={index}>
                        <td>
                            {smjer.naziv}
                        </td>
                        <td>
                            {smjer.vrsta}
                        </td>
                        <td>
                            {smjer.drzava}
                        </td>
                        <td>
                            {smjer.sezona}
                        </td>
                        <td>
                            {smjer.pobjednik}
                        </td>
                        
                  


                        <td>
                            <Button
                            onClick={()=>navigate(`/smjerovi/${smjer.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(smjer.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}