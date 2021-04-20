const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const MongoClient = require("mongodb").MongoClient;
const salas6na = "KalaSuppG0";
const andmebaas = "veeb70"; // <= Pane X asemel siia enda number
const uri = `mongodb+srv://veebg0:${salas6na}@cluster0.qz3rv.mongodb.net/${andmebaas}?retryWrites=true&w=majority`;

const matk1 = {
  nimetus: 'Rabamatk',
  osalejaid: 5,
  kuupaev: '2021-05-03',
  registreerunud: ['Karu Kati', 'Karu Mati', 'Rebase Rein'],
  kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
  piltUrl: '/pildid/matkaja.png'
}

const matk2 = {
  nimetus: 'Rattamatk',
  osalejaid: 10,
  kuupaev: '2021-06-03 - 2021-06-10',
  registreerunud: ['Rebase Rein'],
  kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
  piltUrl: '/pildid/rattamatk.jpg'
}

const matk3 = {
  nimetus: 'Süstamakt',
  osalejaid: 10,
  kuupaev: '2021-07-23',
  registreerunud: [],
  kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
  piltUrl: '/pildid/syst1.jpg'
}
const matk4 = {
  nimetus: 'Rattamatk Pärnumaal',
  osalejaid: 6,
  kuupaev: '2021-07-03 - 2021-07-10',
  registreerunud: [],
  kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
  piltUrl: '/pildid/rattamatk.jpg'
}

const koikMatkad = [
  matk1, 
  matk2,
  matk3,
  matk4,
  {
      nimetus: 'Jalgsimatk Virumaal',
      osalejaid: 20,
      kuupaev: '2021-08-01',
      registreerunud: [],
      kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
      piltUrl: '/pildid/rattamatk.jpg'
  }
]

const registreerumised = []

function salvestaRegistreerimine( res, matkaIndeks, nimi, email, markus ) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const registreerunu = {
    matkaIndeks,
    nimi,
    email, 
    markus
  }

  client.connect((err) => {
    if (err) {
      res.send({ error: "Viga: " + err.message });
    } else {
      const collection = client
        .db(andmebaas)
        .collection("matkaklubi_" + andmebaas + "_registreerumised");
      collection.insertOne(registreerunu, (err) => {
        client.close();
        let kasOnnestus = true
        if (err) {
          kasOnnestus = false
        }
        //kui õnnestus, siis renderda mall, mis näitab et registreerumine õnnestus
        //kui ei õnnestunud, siis renderda mall, mis näitab, et registeerumine ebaõnenstus
        return res.render('pages/regamise_kinnitus', { kasOnnestus: kasOnnestus, matk: koikMatkad[matkaIndeks] })
      });
    }
  });
 

}


function lisaRegistreerimine(matkaIndeks, nimi, email, markus) {
  //kontrollime, kas matkaIndeks on õige (>= 0 ja < massivi pikkusest)
  if (matkaIndeks < 0 || matkaIndeks >= koikMatkad.length) {
    return false;
  }
  //kontrolli, kas registreerunute arv on täis
  const valitudMatk = koikMatkad[matkaIndeks]
  if (valitudMatk.osalejaid <= valitudMatk.registreerunud.length) {
    return false
  }

  if (nimi == false) {
    return false
  }

  if (email == false) {
    return false
  }

  //lisame nime matkale registreerunute hulka
  koikMatkad[matkaIndeks].registreerunud.push(nimi)
  //moodustame registreerunu andmetest objekti ning lisame selle registreerumiste massiivi
  const registreerunu = {
    matkaIndeks,
    nimi,
    email,
    markus
  }
  registreerumised.push(registreerunu)
  console.log('Lisati uus registreerunu')
  console.log(registreerunu)
  console.log('Matk')
  console.log(koikMatkad[matkaIndeks])
  
  return true;
}

function naitaEsilehte(req, res) {
  const andmed = { matkad: koikMatkad }
  return res.render('pages/esileht', andmed)
}

function naitaMatkaInfot(req, res) {
  const indeks = req.params.matkIndeks
  const matk = koikMatkad[indeks]

  console.log('Parameeter matkaIndeks: ' + req.params.matkIndeks)
  const andmed = { 
      matkaIndeks: indeks, 
      matk: matk 
  }

  return res.render('pages/matkainfo', andmed)
}

function registreeriMatkale(req, res) {
  const matkaIndeks = req.query.matkaIndeks
  const nimi = req.query.nimi
  const email = req.query.email
  const markus = req.query.markus

  const kasOnnestus = lisaRegistreerimine(matkaIndeks, nimi, email, markus)
  if (!kasOnnestus) {
    return res.send('Registreeruda ei saa')
  }

  //TODO: Siia tuleb andmebaasi salvestamise funktsiooni väljakutsumine
  salvestaRegistreerimine(res, matkaIndeks, nimi, email, markus )
}

function kontaktiLeht(req, res) {
  return res.render('pages/kontakt')
}

function loeKoikRegistreerimised(req, res) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((err) => {
      if (err) {
          return res.send({ error: 'Viga: ' + err.message });
      }
      const collection = client
        .db(andmebaas)
        .collection("matkaklubi_" + andmebaas + "_registreerumised");
      collection.find({}).toArray(
        (err, registreerumised) => {
          client.close();
          console.log(registreerumised)
          if (err) {
            return res.send({ error: 'Viga: ' + err.message });
          }
          //koikMatkad[matkaIndeks].registreerunud = registreerumised
          console.log('Andmebaasist leiti ' + registreerumised.length + " objekti")
          return res.send(registreerumised);
      });
    })
}

function administraator(req, res) {
  return res.render("pages/administraator")
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', naitaEsilehte)
  .get('/matkainfo/:matkIndeks', naitaMatkaInfot)
  .get('/registreeri', registreeriMatkale)
  .get('/kontakt', kontaktiLeht)
  .get('/administraator', administraator)
  .get('/api/registreerimine', loeKoikRegistreerimised)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
