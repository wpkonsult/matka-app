let KOIK_MATKAD = []
let KOIK_REGAMISED = []

function loeRegistreerimised() {
    let seaded = {
        async: true, 
        url: '/api/registreerimine', 
        method: 'GET' 
    }
    $.ajax(seaded).done( (registreerumised) => {
        KOIK_REGAMISED = registreerumised
        naitaAdminLehte(registreerumised)
    })
}

function naitaMatkaAndmed(matkaIndeks) {
    $('.valik').removeClass('valitud')
    $('#valik-'+matkaIndeks).addClass('valitud')
    const matkaRegistreerumised = KOIK_REGAMISED.filter(reg => reg.matkaIndeks == matkaIndeks)
    naitaAdminLehte(matkaRegistreerumised)
}


function loeMatkad() {
    let seaded = {
        async: true, 
        url: '/api/matkad', 
        method: 'GET' 
    }
    $.ajax(seaded).done((matkad) => {
        KOIK_MATKAD = matkad
        loeRegistreerimised()
    })
}

function naitaKoiki() {
    $('.valik').removeClass('valitud')
    $('#valik-koik').addClass('valitud')
    naitaAdminLehte(KOIK_REGAMISED)
}

function looMenyy() {
    let valikudHtml = "";
    valikudHtml += `
    <li id="valik-koik" onclick="naitaKoiki()" class="valik">
        <a href="#">Kõik</a>
    </li>
    `
    let i = 0
    for (const matk of KOIK_MATKAD) {
        valikudHtml += `
        <li id="valik-${i}" class="valik" onclick="naitaMatkaAndmed(${i})">
            <a href="#">${matk.nimetus}</a>
        </li>
        `
        i++
    }


    let menyyHtml = `
    <div class="nav-konteiner">
        <ul>
            ${valikudHtml}
        <ul>
    </div>
    `
    return menyyHtml

}

function looRegistreerumised(registreerumised) {
    console.log(registreerumised)
    valjundHtml = '<table class="table table-striped">'
    valjundHtml += '<thead>'
    valjundHtml += '    <tr>'
    valjundHtml += '        <th>Matk</th>'
    valjundHtml += '        <th>Nimi</th>'
    valjundHtml += '        <th>Email</th>'
    valjundHtml += '    </tr>'
    valjundHtml += '</thead>'
    valjundHtml += '<tbody>'
    for (r of registreerumised) {
        valjundHtml += `
        <tr>
            <td>${KOIK_MATKAD[r.matkaIndeks].nimetus}</td>
            <td>${r.nimi}</td>
            <td>${r.email}</td>
        </tr>
    `
    }
    valjundHtml += '</tbody>'
    valjundHtml += '</table>'

    return valjundHtml
}

function naitaAdminLehte(registreerumised){
    let valjundHtml = ""
    valjundHtml += looMenyy()
    valjundHtml += looRegistreerumised(registreerumised)

    document.getElementById('matkainfo').innerHTML = valjundHtml
}

loeMatkad()