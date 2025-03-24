import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Natjecanje')
    .then((odgovor)=>{
        //console.log(odgovor.data)
        //console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja natjecanja'}
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Natjecanje/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja natjecanja s šifrom '+sifra}
    })
}


async function dodaj(natjecanje){
    return await HttpService.post('/Natjecanje',natjecanje)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Natjecanje se ne može dodati!'}
        }
    })
}

async function promjena(sifra,natjecanje){
    return await HttpService.put('/Natjecanje/' + sifra,natjecanje)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Natjecanje se ne može promjeniti!'}
        }
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Natjecanje/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja natjecanja'}   
    })
}

async function dostupnaNatjecanja(){
    return await HttpService.get('/Pocetna/DostupnaNatjecanja')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}


export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,

    dostupnaNatjecanja
}