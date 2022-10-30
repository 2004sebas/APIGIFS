const contentCard = document.getElementById('contentCard');
const search = document.getElementById('search');
const list = document.querySelector('.carousel-lista');
const urlBase = "https://tenor.googleapis.com/v2/search?q=";
const key = "AIzaSyDl6G_EjefADz26PRsfgLWK6WMb0Moj65o";
const trend = "https://tenor.googleapis.com/v2/featured?key=AIzaSyDl6G_EjefADz26PRsfgLWK6WMb0Moj65o";

search.addEventListener("keyup", renderCards);
window.addEventListener('DOMContentLoaded', renderCarousel);

function renderCarousel() {
    fetch(trend)
    .then(response => response.json())
    .then(data => createTrend(data));
}
function createTrend(data) {
    data["results"].map(tending => {
        const carouselTending = document.createElement('div');
        carouselTending.classList.add("carousel-elemento");

        const imgCarousel = document.createElement("img");
        imgCarousel.src = tending["media_formats"]["gif"].url; 
        imgCarousel.classList.add("carousel-image");

        const identCarousel = document.createElement("p");
        identCarousel.textContent= tending["content_description"];

        carouselTending.appendChild(imgCarousel);
        carouselTending.appendChild(identCarousel);
        list.appendChild(carouselTending);
    })
    new Glider(document.querySelector('.carousel-lista'), {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: '.carousel-indicadores',
        arrows: {
            prev: '.carousel-anterior',
            next: '.carousel-siguiente'
        }
    })
}


function renderCards(event) {
    contentCard.innerHTML=" ";

    let newUrl = urlBase+event.target.value+"&key="+key;
    console.log(newUrl);

    fetch(newUrl)
    .then(response => response.json())
    .then(data => createCard(data));
}

function createCard(data) {
    data["results"].map(card => {
        const cards = document.createElement('div');
        cards.classList.add("cards");

        const img = document.createElement("img");
        img.src = card["media_formats"]["gif"].url; 
        img.classList.add("image")

        const ident = document.createElement("p");
        ident.textContent= card["content_description"];
        ident.classList.add("title")

        cards.appendChild(img)
        cards.appendChild(ident);
        contentCard.appendChild(cards);
    })
}
