# Tema 3: Aplicație web pentru partajarea experiențelor utilizării mijloacelor de transport

## Obiectiv

Realizarea unei aplicații web prin care utilizatorii pot împărtăși experiența din urma utilizării unuia din mijloacele de transport în comun.

## Descriere

Aplicația trebuie să permită crearea unui cont prin care utilizatorul poate să partajeze o experiență, după ce a folosit un mijloc de transport în comun. Pentru utilizatorii anonimi, aplicația va permite căutarea și vizualizarea intrărilor în platforma.

## Tasks

### Constrângeri pentru modele

Exemple de constrângeri:
<https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/>

- [ ] models/experience.js
  - [ ] de adaugat constrângeri de domeniu - pentru satisfactionLevel  - valoarea minimă este 1, și valoarea maximă este 5

- [ ] models/line.js
  - [ ] schimbat vehicleType în Sequelize.ENUM cu valorile: BUS, TROLLEYBUS, TRAM, SUBWAY

- [ ] models/users.js
  - [x] de adăugat constrângeri NOT NULL
  - [x] de adăugat valoare implicită pentru enabled (default = *false*)
  - [x] lungimea minimă pentru username este de 6 și maxim 32 de caractere
  - [x] lungime minimă pentru parolă 8 și maxim 128 caractere
  - [x] caractere permise în username: litere mici și numere 0-9
  - [ ] caractere permise în parolă: litere mici + mari, numere 0-9, și caractere speciale (!%$ etc.)
  - [x] lungimea maximă pentru email este de 128 caractere
  - [x] constrângere că este email
  - [x] email de tip lowercase

### Routers

- [ ] routes/experiences.js
  - [ ] crearea unei experiențe (POST)
  - [ ] modificarea unei experiențe, după id (PUT)
  - [ ] obținerea tuturor experiențelor unui user (GET)
  - [ ] ștergerea unei experiențe (DELETE)
  - [ ] ! de tratat toate erorile posibile

- [ ] routes/lines.js
  - [x] adaugarea unei linii (POST)
  - [x] modificarea unei linii, după id (PUT)
  - [x] ștergerea unei linii, după id (DELETE)
  - [x] obținerea tuturor liniilor (GET)
  - [x] obținerea unei singure linii, cu tot cu stop-uri (GET)
  - [x] adăugarea unui stop la o linie (POST)
  - [ ] ! de tratat toate erorile posibile

- [ ] routes/stops.js
  - [x] adăugarea unui stop (POST)
  - [x] modificarea unui stop (PUT)
  - [x] ștergerea unui stop, după id (DELETE)
  - [x] obținerea tuturor stop-urilor (GET)
  - [x] obținerea unui singur stop
  - [ ] ! de tratat toate erorile posibile

- [ ] routes/users.js
  - [ ] înregistrare / signup (POST)
  - [ ] autentificare / login (POST)
  - [ ] modificarea unui user, după id (PUT)
  - [ ] resetarea parolei (POST)
  - [ ] dezactivarea contului (POST)
  - [ ] ! de tratat toate erorile posibile

### Middlewares

- [ ] User middleware pentru autentificare
- [ ] Validation middleware
  - [ ] Validare daca id-ul este numeric

## Funcționalități (minime)

- [ ] Modulul Utilizator
  - [ ] Creare cont utilizator pe baza unor câmpuri sau cu ajutorul unui API extern (GMAIL, Facebook, Linkedin)
  - [ ] Modificarea sau dezactivarea contului
  - [ ] Resetarea parolei

- [ ] Modulul de Partajare
  - [ ] Crearea unei experiențe presupune completarea următoarelor câmpuri:
    - Punctul de plecare (A)
    - Punctul de sosire (B)
    - Mijlocul de transport folosit: bus, metro, tram, etc.
    - Ora plecare
    - Durata călătoriei
    - Gradul de aglomerare al mijlocului de transport
    - Observații
    - Nivelul de satisfacție (smiley faces)

  - [ ] Modificarea intrărilor specifice utilizatorului
  - [ ] Listarea tuturor experiențelor create de un utilizator
  - [ ] Ștergerea unei experiențe
  
- [ ] Modulul de Căutare
  - [ ] Modulul de căutare va trebui să permită utilizatorului introducerea unor cuvinte cheie, după care vor fi afișate rezultatele, sub formă de listă.
  - [ ] Modulul va trebui să returneze rezultate relevante în funcție de locație, mijlocul de transport folosit sau destinație
  
 [Specificații proiect](https://drive.google.com/drive/u/1/folders/1_rYCcGC0epvprSDm1nYNP94Ez9ODvxoQ)
# test
