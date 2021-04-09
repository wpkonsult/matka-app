const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  nimetus: 'Rabamatk',
  osalejaid: 8,
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



function naitaEsilehte(req, res) {
  const andmed = { matkad: koikMatkad }
  return res.render('pages/esileht', andmed)
}

function naitaMatkaInfot(req, res) {
  const indeks = req.params.matkIndeks
  const matk = koikMatkad[indeks]

  console.log('Parameeter matkaIndeks: ' + req.params.matkIndeks)
  const andmed = { matkaIndeks: indeks, matk: matk }
  return res.render('pages/matkainfo', andmed)
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', naitaEsilehte)
  .get('/matkainfo/:matkIndeks', naitaMatkaInfot)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
