use master;
go
drop database if exists nogomet_zavr;
go
create database nogomet_zavr collate Croatian_CI_AS;
go
use nogomet_zavr;
go

create table natjecanja(
sifra int not null primary key identity(1,1),
naziv varchar(80) not null,
vrsta varchar(50) not null,
drzava varchar (80) not null,
sezona varchar(10) not null,
pobjednik varchar(80) not null,
najbolji_igrac varchar(100)
);

create table timovi(
sifra int not null primary key identity(1,1),
naziv varchar(80) not null,
natjecanje int not null references natjecanja(sifra),
trener varchar(80),
stadion varchar(80)
);

create table igraci(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar(80) not null,
dob int not null,
golovi int not null,
asistencije int not null
);

create table timovi_igraci(
tim int not null references timovi(sifra),
igrac int not null references igraci(sifra)
);


insert into natjecanja
(naziv,vrsta,drzava,sezona,pobjednik,najbolji_igrac) values
--1
('Liga prvaka','Klupsko prvenstvo','Europa','2023/2024','Real Madrid','Vinicius Junior'),
--2
('Premier League','Klupsko prvenstvo','Engleska','2023/2024','Manchester City','Kevin de Bruyne'),
--3
('Francuska Liga','Klupsko prvenstvo','Francuska','2023/2024','Paris Saint Germain','Kylian Mbappe'),
--4
('La Liga','Klupsko prvenstvo','Španjolska','2023/2024','Real Madrid','Vinicius Junior'),
--5
('Serie A','Klupsko prvenstvo','Italija','2023/2024','Internacionale FC','Lautaro Martinez'),
--6
('Bundesliga','Klupsko prvenstvo','Njemačka','2023/2024','Bayer Leverkusen','Florian Wirtz');

insert into igraci
(ime,prezime,dob,golovi,asistencije) values
('Vinicius','Junior',21,23,24),
('Thibaut','Courtois', 33, 0, 0),
('Kepa','Arrizabalaga', 31, 0, 0),
('Andriy','Lunin', 28, 0, 1),
('Dani','Carvajal', 32, 10, 7),
('Antonio','Rudiger', 30, 3, 1),
('Luka','Modrić', 39, 5, 18),
('Toni','Kroos', 34, 4, 18),
('Jude','Bellingham', 23, 18, 14),
('Kylian','Mbappe', 23, 38, 21),
('Ederson','Moreira', 33, 0, 0),
('Ruben','Dias', 28, 5, 2),
('Josko','Gvardiol', 21, 6, 10),
('Kevin','De Bruyne', 30, 14, 19),
('Rodri','Ivan', 30, 2, 4),
('Bernardo','Silva',28,10, 13),
('Florian','Wirtz', 20, 18, 20),
('Lautaro','Martinez', 30, 21, 14),
('Lamine','Yamal', 17, 10, 11),
('Robert','Lewandovski', 34, 24, 17),
('Dejan','Lovren', 36, 3, 2),
('Lionel','Messi', 37, 20, 17),
('Mason','Greenwood', 22, 10, 7),
('Hakan','Chalhanoglu', 29, 10, 13);

insert into timovi
(naziv,natjecanje,trener,stadion) values
('Real Madrid',4,'Carlo Ancelotti','Santiago Bernabeu'),
('Manchester City',2,'Pep Guardiola','Etihad'),
('Barcelona',4,'Xavi Hernandez','Camp Nou'),
('Bayern Munich',6,'Hansi Flick','Alianz Arena'),
('Juventus',5,'Thiago Motta','Stadio Olympico'),
('Paris Saint Germain',3,'Luis Enrique','Parc de princes'),
('Real Madrid',1,'Carlo Ancelotti','Santiago Bernabeu'),
('Internazionale FC',5,'Simone Inzaghi','Giuseppe Meazza'),
('Bayer Leverkusen',6,'Xabi Alonso','BayArena'),
('OL Marseille',3,'Roberto de Zerbi','Orange Velodrome'),
('OL Lyon',3,'Fabio Grosso','Parc Olympique Lyonnais'),
('Manchester City',1,'Pep Guardiola','Etihad'),
('Barcelona',1,'Xavi Hernandez','Camp Nou'),
('Bayern Munich',1,'Hansi Flick','Alianz Arena'),
('Juventus',1,'Thiago Motta','Stadio Olympico'),
('Paris Saint Germain',1,'Luis Enrique','Parc de princes'),
('Internazionale FC',1,'Simone Inzaghi','Giuseppe Meazza'),
('Bayer Leverkusen',1,'Xabi Alonso','BayArena');

insert into timovi_igraci
(tim,igrac) values
(1,1),
(1,2),
(1,7),
(1,9),
(2,11),
(2,12),
(2,13),
(2,14),
(2,15),
(3,19),
(11,21),
(10,23),
(8,24),
(8,18);

select * from igraci;
select * from timovi;
select * from natjecanja;
select * from timovi_igraci;