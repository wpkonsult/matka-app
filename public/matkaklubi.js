function saadaVorm() {
    const nimi = document.getElementById('nimi')
    const andmed = {
        nimi: document.getElementById('nimi').value,
        email: document.getElementById('email').value,
        markus: document.getElementById('markus').value
    }
    console.log('Vormi andmed')
    console.log(andmed)
}

function kontrolliVormi() {
    const nimi = document.getElementById('nimi').value
    if (!nimi) {
        alert('Täida nime lahter!')
        return false
    }

    return true
}