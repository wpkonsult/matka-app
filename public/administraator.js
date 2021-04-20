function loeRegistreerimised() {
    let seaded = {
        async: true, 
        url: '/api/registreerimine', 
        method: 'GET' 
    }
    $.ajax(seaded).done(naitaRegistreerumised)
}

function naitaRegistreerumised(registreerumised) {
    console.log(registreerumised)
    valjundHtml = ''
    for (r of registreerumised) {
        valjundHtml += "<div>"
        valjundHtml += "Matk: " + r.matkaIndeks 
        valjundHtml += ", Nimi: " + r.nimi 
        valjundHtml += ", Email: " + r.email 
        valjundHtml += "</div>"
    }

    document.getElementById('matkainfo').innerHTML = valjundHtml
}

loeRegistreerimised()