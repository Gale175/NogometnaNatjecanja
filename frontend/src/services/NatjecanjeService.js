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
        return {greska: true, poruka: 'Problem kod dohvaćanja smjera s šifrom '+sifra}
    })
}


async function dodaj(natjecanje){
    return HttpService.post('/Natjecanje',natjecanje)
    .then(()=>{return {greska: false, poruka: 'Dodano'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod dodavanja'}})
}

async function promjena(sifra,natjecanje){
    return HttpService.put('/Natjecanje/'+sifra,natjecanje)
    .then(()=>{return {greska: false, poruka: 'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod promjene'}})
}

async function obrisi(sifra){
    return await HttpService.delete('/Natjecanje/'+sifra)
    .then(()=>{return {greska: false, poruka: 'Obrisano'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod brisanja'}})
}



export default{
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi
}