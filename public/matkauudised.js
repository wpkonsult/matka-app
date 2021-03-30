
const koikUudised = [
    {
        pealkiri: "Esimene uudis",
        kuupaev: "02.01.2021",
        sisu: "Esimene uudis mis räägib sellest et matkata on hea"
    },
    {
        pealkiri: "Teine uudis",
        kuupaev: "13.03.2021",
        sisu: "Teine uudis mis tõestab, et matkamine on tervisele kasulik"
           
    },
    {
        pealkiri: "Kolmas uudis",
        kuupaev: "25.034.2021",
        sisu: "Kolmas uudis räägib matkamise sotsiaalsest headusest"
    },
]


function teeUudisHtml(uudisObj) {
    let uudisHtml = '';
    uudisHtml += '<div class="postitus pt-3">';
    uudisHtml +=    '<div class="d-flex justify-content-between">';
    uudisHtml +=        '<h3>'+uudisObj.pealkiri+'</h3>';
    uudisHtml +=        '<div class="postitus-kuupaev">'+ uudisObj.kuupaev+'</div>';
    uudisHtml +=    '</div>';
    uudisHtml +=    '<div class="postitus-sisu">';
    uudisHtml +=        uudisObj.sisu;
    uudisHtml +=    '</div>';
    uudisHtml += '</div>';

    return uudisHtml;
}

function naitaUudiseid() {
    const uudisedElement = document.getElementById('uudistekonteiner');
    let koikUudisedHtml = '';
    for (uudis of koikUudised) {
        koikUudisedHtml += teeUudisHtml(uudis);
    }
    uudisedElement.innerHTML = koikUudisedHtml;
}

naitaUudiseid()
