import { Button, Table } from "react-bootstrap";
import IgracService from "../../services/IgracService";
import { useEffect, useState } from "react";
import { RouteNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";



export default function IgraciPregled(){

    const[igraci,setIgraci] = useState();

    const navigate = useNavigate();

    async function dohvatiIgrace() {

        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        
        await IgracService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setIgraci(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    // npm run lint
    // javlja upozorenje
    // 28:7  warning  React Hook useEffect has a missing dependency: 'dohvatie'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

    useEffect(()=>{
        dohvatiIgrace();
    },[]);

   

    async function obrisiAsync(sifra) {
        const odgovor = await IgracService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiIgrace();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <>
            <Link to={RouteNames.IGRAC_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                />Dodaj novog igrača</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Dob</th>
                        <th>Golovi</th>
                        <th>Asistencije</th>
                        <th>Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    {igraci && igraci.map((e,index)=>(
                        <tr key={index}>
                            <td>{e.ime}</td>
                            <td>{e.prezime}</td>
                            <td>{e.dob}</td>
                            <td>{e.golovi}</td>
                            <td>{e.asistencije}</td>
                           
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/Igraci/${e.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>obrisi(e.sifra)}>
                                    Obriši
                                </Button>

                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}