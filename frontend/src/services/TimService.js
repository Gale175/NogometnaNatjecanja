import { HttpService } from "./HttpService"


async function get(){
    return await HttpService.get('/Tim')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Tim/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji tim!'}
    })
}

async function obrisi(sifra) {
    return await HttpService.delete('/Tim/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Tim se ne može obrisati!'}
    })
}

async function dodaj(Tim) {
    return await HttpService.post('/Tim',Tim)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Tim se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Tim) {
    return await HttpService.put('/Tim/' + sifra,Tim)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Tim se ne može promjeniti!'}
        }
    })
}


async function getIgraci(sifra){
    return await HttpService.get('/Tim/Igraci/'+ sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod dohvaćanja igrača'}})
}

async function dodajIgraca(tim,igrac) {
    return await HttpService.post('/Tim/' + tim + '/dodaj/'+igrac)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
                return {greska: true, poruka: 'Tim se ne može dodati na grupu'}
    })
}

async function obrisiIgraca(tim,igrac) {
    return await HttpService.delete('/Tim/' + tim + '/obrisi/'+igrac)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
                return {greska: true, poruka: 'Igrač se ne može obrisati iz grupe'}
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena,

    getIgraci,
    dodajIgraca,
    obrisiIgraca
}