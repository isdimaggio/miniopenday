const canvas = document.getElementById('canvas')
const starback = new Starback(canvas, {
    type: 'dot',
    quantity: 100,
    direction: 225,
    backgroundColor: ['#0e1118', '#232b3e'],
    randomOpacity: true,
    width: window.innerWidth,
    height: window.innerHeight
});

function playHover() {
    var thissound = document.getElementById("hoverSound");
    thissound.play();
}

function stopHover() {
    var thissound = document.getElementById("hoverSound");
    thissound.pause();
    thissound.currentTime = 0;
}

function clicksound() {
    var thissound = document.getElementById("clickSound");
    thissound.play();
}

function modalx() {
    videojs(`youtube-tarocco`).pause();
    videojs(`youtube-tarocco`).currentTime(0);
    clicksound();
}

function updateVideoSource(mp4, webm, thumb) {
    if (videojs.getPlayers()[`youtube-tarocco`]) {                    
        delete videojs.getPlayers()[`youtube-tarocco`]; 
    }
    
    videojs(`youtube-tarocco`).src(
        {
            src: mp4,
            type: "video/mp4"
        },
        {
            src: webm,
            type: "video/webm"
        }
    );

    videojs(`youtube-tarocco`).poster(
        thumb
    );

}

function updateMarkdownContent(url) {
    let content = document.getElementById("contentVisInd");
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function() {
        if (xhr.status != 200) {
            content.innerHTML = `<span class='err'>Error loading desc ${xhr.status}: ${xhr.statusText}</span>`;
        } else {
            var converter = new showdown.Converter();
            content.innerHTML = converter.makeHtml(xhr.responseText);
        }
    };

    xhr.onerror = function() {
        content.innerHTML = "<span class='err'>Error loading desc</span>"
    };

}

function popupO(indirizzo) {
    let titolo = document.getElementById("titoloVisInd");
    switch (indirizzo) {
        case "inf":
            titolo.innerHTML = "INDIRIZZO: Informatica"
            updateVideoSource(
                "https://fs.itdimaggio.edu.it/orientamento/informatica/DELIVERY.mp4", 
                "https://fs.itdimaggio.edu.it/orientamento/informatica/DELIVERY.webm", 
                "https://fs.itdimaggio.edu.it/orientamento/informatica/POSTER.jpg"
            );
            updateMarkdownContent("https://fs.itdimaggio.edu.it/orientamento/informatica/DESCRIPTION.md");
            break;
        case "bio":
            titolo.innerHTML = "INDIRIZZO: Biotecnologie Sanitarie"
            updateVideoSource(
                "https://fs.itdimaggio.edu.it/orientamento/biotecnologie/DELIVERY.mp4", 
                "https://fs.itdimaggio.edu.it/orientamento/biotecnologie/DELIVERY.webm", 
                "https://fs.itdimaggio.edu.it/orientamento/biotecnologie/POSTER.png"
            );
            updateMarkdownContent("https://fs.itdimaggio.edu.it/orientamento/biotecnologie/DESCRIPTION.md");
            break;
        case "ele":
            titolo.innerHTML = "INDIRIZZO: Elettrotecnica"
            updateVideoSource(
                "https://fs.itdimaggio.edu.it/orientamento/elettrotecnica/DELIVERY.mp4", 
                "https://fs.itdimaggio.edu.it/orientamento/elettrotecnica/DELIVERY.webm", 
                "https://fs.itdimaggio.edu.it/orientamento/elettrotecnica/POSTER.jpg"
            );
            updateMarkdownContent("https://fs.itdimaggio.edu.it/orientamento/elettrotecnica/DESCRIPTION.md");
            break;
        case "sia":
            titolo.innerHTML = "INDIRIZZO: Sistemi Informativi Aziendali"
            updateVideoSource(
                "https://fs.itdimaggio.edu.it/orientamento/ite2/DELIVERY.mp4", 
                "https://fs.itdimaggio.edu.it/orientamento/ite2/DELIVERY.webm", 
                "https://fs.itdimaggio.edu.it/orientamento/ite2/POSTER.png"
            );
            updateMarkdownContent("https://fs.itdimaggio.edu.it/orientamento/ite2/DESCRIPTION.md");
            break;
        default:
            break;
    }
    clicksound();
    let m = new bootstrap.Modal('#visualizzatoreIndirizzi')
    m.show();
}