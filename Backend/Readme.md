<a name='assembly'></a>
# Backend

## Contents

- [AutorizacijaController](#T-Backend-Controllers-AutorizacijaController 'Backend.Controllers.AutorizacijaController')
  - [#ctor(context)](#M-Backend-Controllers-AutorizacijaController-#ctor-Backend-Data-NatjecanjaContext- 'Backend.Controllers.AutorizacijaController.#ctor(Backend.Data.NatjecanjaContext)')
  - [_context](#F-Backend-Controllers-AutorizacijaController-_context 'Backend.Controllers.AutorizacijaController._context')
  - [GenerirajToken(operater)](#M-Backend-Controllers-AutorizacijaController-GenerirajToken-Backend-Models-DTO-OperaterDTO- 'Backend.Controllers.AutorizacijaController.GenerirajToken(Backend.Models.DTO.OperaterDTO)')
- [EdunovaExtensions](#T-Backend-Extensions-EdunovaExtensions 'Backend.Extensions.EdunovaExtensions')
  - [AddEdunovaCORS(Services)](#M-Backend-Extensions-EdunovaExtensions-AddEdunovaCORS-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'Backend.Extensions.EdunovaExtensions.AddEdunovaCORS(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
  - [AddEdunovaSecurity(Services)](#M-Backend-Extensions-EdunovaExtensions-AddEdunovaSecurity-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'Backend.Extensions.EdunovaExtensions.AddEdunovaSecurity(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
  - [AddEdunovaSwaggerGen(Services)](#M-Backend-Extensions-EdunovaExtensions-AddEdunovaSwaggerGen-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'Backend.Extensions.EdunovaExtensions.AddEdunovaSwaggerGen(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
- [Entitet](#T-Backend-Models-Entitet 'Backend.Models.Entitet')
  - [Sifra](#P-Backend-Models-Entitet-Sifra 'Backend.Models.Entitet.Sifra')
- [Igrac](#T-Backend-Models-Igrac 'Backend.Models.Igrac')
  - [Asistencije](#P-Backend-Models-Igrac-Asistencije 'Backend.Models.Igrac.Asistencije')
  - [Dob](#P-Backend-Models-Igrac-Dob 'Backend.Models.Igrac.Dob')
  - [Golovi](#P-Backend-Models-Igrac-Golovi 'Backend.Models.Igrac.Golovi')
  - [Ime](#P-Backend-Models-Igrac-Ime 'Backend.Models.Igrac.Ime')
  - [Pozicija](#P-Backend-Models-Igrac-Pozicija 'Backend.Models.Igrac.Pozicija')
  - [Prezime](#P-Backend-Models-Igrac-Prezime 'Backend.Models.Igrac.Prezime')
- [NatjecanjaContext](#T-Backend-Data-NatjecanjaContext 'Backend.Data.NatjecanjaContext')
  - [#ctor(opcije)](#M-Backend-Data-NatjecanjaContext-#ctor-Microsoft-EntityFrameworkCore-DbContextOptions{Backend-Data-NatjecanjaContext}- 'Backend.Data.NatjecanjaContext.#ctor(Microsoft.EntityFrameworkCore.DbContextOptions{Backend.Data.NatjecanjaContext})')
  - [Igraci](#P-Backend-Data-NatjecanjaContext-Igraci 'Backend.Data.NatjecanjaContext.Igraci')
  - [Natjecanja](#P-Backend-Data-NatjecanjaContext-Natjecanja 'Backend.Data.NatjecanjaContext.Natjecanja')
  - [Operateri](#P-Backend-Data-NatjecanjaContext-Operateri 'Backend.Data.NatjecanjaContext.Operateri')
  - [Timovi](#P-Backend-Data-NatjecanjaContext-Timovi 'Backend.Data.NatjecanjaContext.Timovi')
  - [OnModelCreating(modelBuilder)](#M-Backend-Data-NatjecanjaContext-OnModelCreating-Microsoft-EntityFrameworkCore-ModelBuilder- 'Backend.Data.NatjecanjaContext.OnModelCreating(Microsoft.EntityFrameworkCore.ModelBuilder)')
- [Natjecanje](#T-Backend-Models-Natjecanje 'Backend.Models.Natjecanje')
  - [Drzava](#P-Backend-Models-Natjecanje-Drzava 'Backend.Models.Natjecanje.Drzava')
  - [NajboljiIgrac](#P-Backend-Models-Natjecanje-NajboljiIgrac 'Backend.Models.Natjecanje.NajboljiIgrac')
  - [Naziv](#P-Backend-Models-Natjecanje-Naziv 'Backend.Models.Natjecanje.Naziv')
  - [Pobjednik](#P-Backend-Models-Natjecanje-Pobjednik 'Backend.Models.Natjecanje.Pobjednik')
  - [Sezona](#P-Backend-Models-Natjecanje-Sezona 'Backend.Models.Natjecanje.Sezona')
  - [Vrsta](#P-Backend-Models-Natjecanje-Vrsta 'Backend.Models.Natjecanje.Vrsta')
- [Operater](#T-Backend-Models-Operater 'Backend.Models.Operater')
  - [Email](#P-Backend-Models-Operater-Email 'Backend.Models.Operater.Email')
  - [Lozinka](#P-Backend-Models-Operater-Lozinka 'Backend.Models.Operater.Lozinka')
- [OperaterDTO](#T-Backend-Models-DTO-OperaterDTO 'Backend.Models.DTO.OperaterDTO')
  - [#ctor(Email,Password)](#M-Backend-Models-DTO-OperaterDTO-#ctor-System-String,System-String- 'Backend.Models.DTO.OperaterDTO.#ctor(System.String,System.String)')
  - [Email](#P-Backend-Models-DTO-OperaterDTO-Email 'Backend.Models.DTO.OperaterDTO.Email')
  - [Password](#P-Backend-Models-DTO-OperaterDTO-Password 'Backend.Models.DTO.OperaterDTO.Password')
- [Tim](#T-Backend-Models-Tim 'Backend.Models.Tim')
  - [Igraci](#P-Backend-Models-Tim-Igraci 'Backend.Models.Tim.Igraci')
  - [Natjecanje](#P-Backend-Models-Tim-Natjecanje 'Backend.Models.Tim.Natjecanje')
  - [Naziv](#P-Backend-Models-Tim-Naziv 'Backend.Models.Tim.Naziv')
  - [Stadion](#P-Backend-Models-Tim-Stadion 'Backend.Models.Tim.Stadion')
  - [Trener](#P-Backend-Models-Tim-Trener 'Backend.Models.Tim.Trener')

<a name='T-Backend-Controllers-AutorizacijaController'></a>
## AutorizacijaController `type`

##### Namespace

Backend.Controllers

##### Summary

Kontroler za autorizaciju korisnika.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| context | [T:Backend.Controllers.AutorizacijaController](#T-T-Backend-Controllers-AutorizacijaController 'T:Backend.Controllers.AutorizacijaController') | Kontekst baze podataka. |

##### Remarks

Inicijalizira novu instancu klase [AutorizacijaController](#T-Backend-Controllers-AutorizacijaController 'Backend.Controllers.AutorizacijaController').

<a name='M-Backend-Controllers-AutorizacijaController-#ctor-Backend-Data-NatjecanjaContext-'></a>
### #ctor(context) `constructor`

##### Summary

Kontroler za autorizaciju korisnika.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| context | [Backend.Data.NatjecanjaContext](#T-Backend-Data-NatjecanjaContext 'Backend.Data.NatjecanjaContext') | Kontekst baze podataka. |

##### Remarks

Inicijalizira novu instancu klase [AutorizacijaController](#T-Backend-Controllers-AutorizacijaController 'Backend.Controllers.AutorizacijaController').

<a name='F-Backend-Controllers-AutorizacijaController-_context'></a>
### _context `constants`

##### Summary

Kontekst baze podataka

<a name='M-Backend-Controllers-AutorizacijaController-GenerirajToken-Backend-Models-DTO-OperaterDTO-'></a>
### GenerirajToken(operater) `method`

##### Summary

Generira token za autorizaciju.

##### Returns

JWT token ako je autorizacija uspješna, inače vraća status 403.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operater | [Backend.Models.DTO.OperaterDTO](#T-Backend-Models-DTO-OperaterDTO 'Backend.Models.DTO.OperaterDTO') | DTO objekt koji sadrži email i lozinku operatera. |

##### Remarks

Primjer zahtjeva:

```json
{
  "email": "gale1508@gmail.com",
  "password": "martin1.1"
}
```

<a name='T-Backend-Extensions-EdunovaExtensions'></a>
## EdunovaExtensions `type`

##### Namespace

Backend.Extensions

##### Summary

Klasa koja sadrži proširenja za Edunova aplikaciju.

<a name='M-Backend-Extensions-EdunovaExtensions-AddEdunovaCORS-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddEdunovaCORS(Services) `method`

##### Summary

Dodaje konfiguraciju za CORS.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | Instanca IServiceCollection. |

<a name='M-Backend-Extensions-EdunovaExtensions-AddEdunovaSecurity-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddEdunovaSecurity(Services) `method`

##### Summary

Dodaje konfiguraciju za sigurnost.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | Instanca IServiceCollection. |

<a name='M-Backend-Extensions-EdunovaExtensions-AddEdunovaSwaggerGen-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddEdunovaSwaggerGen(Services) `method`

##### Summary

Dodaje konfiguraciju za Swagger dokumentaciju.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | Instanca IServiceCollection. |

<a name='T-Backend-Models-Entitet'></a>
## Entitet `type`

##### Namespace

Backend.Models

##### Summary

Apstraktna klasa koja predstavlja entitet s jedinstvenim identifikatorom.

<a name='P-Backend-Models-Entitet-Sifra'></a>
### Sifra `property`

##### Summary

Jedinstveni identifikator entiteta.

<a name='T-Backend-Models-Igrac'></a>
## Igrac `type`

##### Namespace

Backend.Models

##### Summary

Klasa koja predstavlja igrača.

<a name='P-Backend-Models-Igrac-Asistencije'></a>
### Asistencije `property`

##### Summary

Broj asistencija igrača.

<a name='P-Backend-Models-Igrac-Dob'></a>
### Dob `property`

##### Summary

Dob igrača.

<a name='P-Backend-Models-Igrac-Golovi'></a>
### Golovi `property`

##### Summary

Broj postignutih golova igrača.

<a name='P-Backend-Models-Igrac-Ime'></a>
### Ime `property`

##### Summary

Ime igrača.

<a name='P-Backend-Models-Igrac-Pozicija'></a>
### Pozicija `property`

##### Summary

Pozicija na kojoj igrač igra.

<a name='P-Backend-Models-Igrac-Prezime'></a>
### Prezime `property`

##### Summary

Prezime polaznika.

<a name='T-Backend-Data-NatjecanjaContext'></a>
## NatjecanjaContext `type`

##### Namespace

Backend.Data

##### Summary

Kontekst baze podataka za aplikaciju Edunova.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| opcije | [T:Backend.Data.NatjecanjaContext](#T-T-Backend-Data-NatjecanjaContext 'T:Backend.Data.NatjecanjaContext') | Opcije za konfiguraciju konteksta. |

##### Remarks

Konstruktor koji prima opcije za konfiguraciju konteksta.

<a name='M-Backend-Data-NatjecanjaContext-#ctor-Microsoft-EntityFrameworkCore-DbContextOptions{Backend-Data-NatjecanjaContext}-'></a>
### #ctor(opcije) `constructor`

##### Summary

Kontekst baze podataka za aplikaciju Edunova.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| opcije | [Microsoft.EntityFrameworkCore.DbContextOptions{Backend.Data.NatjecanjaContext}](#T-Microsoft-EntityFrameworkCore-DbContextOptions{Backend-Data-NatjecanjaContext} 'Microsoft.EntityFrameworkCore.DbContextOptions{Backend.Data.NatjecanjaContext}') | Opcije za konfiguraciju konteksta. |

##### Remarks

Konstruktor koji prima opcije za konfiguraciju konteksta.

<a name='P-Backend-Data-NatjecanjaContext-Igraci'></a>
### Igraci `property`

##### Summary

Skup podataka za entitet Igrac.

<a name='P-Backend-Data-NatjecanjaContext-Natjecanja'></a>
### Natjecanja `property`

##### Summary

Skup podataka za entitet Natjecanje.

<a name='P-Backend-Data-NatjecanjaContext-Operateri'></a>
### Operateri `property`

##### Summary

Skup podataka za entitet Operater.

<a name='P-Backend-Data-NatjecanjaContext-Timovi'></a>
### Timovi `property`

##### Summary

Skup podataka za entitet Tim.

<a name='M-Backend-Data-NatjecanjaContext-OnModelCreating-Microsoft-EntityFrameworkCore-ModelBuilder-'></a>
### OnModelCreating(modelBuilder) `method`

##### Summary

Konfiguracija modela prilikom kreiranja baze podataka.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| modelBuilder | [Microsoft.EntityFrameworkCore.ModelBuilder](#T-Microsoft-EntityFrameworkCore-ModelBuilder 'Microsoft.EntityFrameworkCore.ModelBuilder') | Graditelj modela. |

<a name='T-Backend-Models-Natjecanje'></a>
## Natjecanje `type`

##### Namespace

Backend.Models

##### Summary

Predstavlja natjecanje u sustavu.

<a name='P-Backend-Models-Natjecanje-Drzava'></a>
### Drzava `property`

##### Summary

Država u kojoj se natjecanje održava.

<a name='P-Backend-Models-Natjecanje-NajboljiIgrac'></a>
### NajboljiIgrac `property`

##### Summary

Najbolji igrač natjecanja.

<a name='P-Backend-Models-Natjecanje-Naziv'></a>
### Naziv `property`

##### Summary

Naziv natjecanja.

<a name='P-Backend-Models-Natjecanje-Pobjednik'></a>
### Pobjednik `property`

##### Summary

Pobjednik natjecanja.

<a name='P-Backend-Models-Natjecanje-Sezona'></a>
### Sezona `property`

##### Summary

Sezona u kojoj je odigrano natjecanje.

<a name='P-Backend-Models-Natjecanje-Vrsta'></a>
### Vrsta `property`

##### Summary

Vrsta natjecanja.

<a name='T-Backend-Models-Operater'></a>
## Operater `type`

##### Namespace

Backend.Models

##### Summary

Operater koji se koristi za prijavu u sustav.

<a name='P-Backend-Models-Operater-Email'></a>
### Email `property`

##### Summary

Email operatera.

<a name='P-Backend-Models-Operater-Lozinka'></a>
### Lozinka `property`

##### Summary

Lozinka operatera.

<a name='T-Backend-Models-DTO-OperaterDTO'></a>
## OperaterDTO `type`

##### Namespace

Backend.Models.DTO

##### Summary

DTO (Data Transfer Object) za operatera.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Email | [T:Backend.Models.DTO.OperaterDTO](#T-T-Backend-Models-DTO-OperaterDTO 'T:Backend.Models.DTO.OperaterDTO') |  |

<a name='M-Backend-Models-DTO-OperaterDTO-#ctor-System-String,System-String-'></a>
### #ctor(Email,Password) `constructor`

##### Summary

DTO (Data Transfer Object) za operatera.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Email | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') |  |
| Password | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') |  |

<a name='P-Backend-Models-DTO-OperaterDTO-Email'></a>
### Email `property`

##### Summary



<a name='P-Backend-Models-DTO-OperaterDTO-Password'></a>
### Password `property`

##### Summary



<a name='T-Backend-Models-Tim'></a>
## Tim `type`

##### Namespace

Backend.Models

##### Summary

Klasa koja predstavlja tim.

<a name='P-Backend-Models-Tim-Igraci'></a>
### Igraci `property`

##### Summary

Igrači koji su u timu.

<a name='P-Backend-Models-Tim-Natjecanje'></a>
### Natjecanje `property`

##### Summary

Natjecanje u kojemu tim sudjeluje.

<a name='P-Backend-Models-Tim-Naziv'></a>
### Naziv `property`

##### Summary

Naziv tima.

<a name='P-Backend-Models-Tim-Stadion'></a>
### Stadion `property`

##### Summary

Stadion gdje igra domaće utakmice.

<a name='P-Backend-Models-Tim-Trener'></a>
### Trener `property`

##### Summary

Trener tima.
