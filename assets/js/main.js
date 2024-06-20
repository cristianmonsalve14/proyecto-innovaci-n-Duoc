const api = {
    key: '0588c56b79cd292387b44532adc79442',
    url: `https://api.openweathermap.org/data/2.5/weather`
}
 card = document.getElementById('card');

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'images/media.png';
    if (temp > 24) {
        src = 'images/calor.avif';
    } else if (temp < 16) {
        src = 'images/frio.avif';
    }
    tempImg.src = src;
}

async function search(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
        const data = await response.json();
        card.style.display = 'block';
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        data.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}c`
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)} / ${toCelsius(data.main.temp_max)}c`;
        updateImages(data);
    } catch(err) {
        console.log(err);
        alert('error... intente nuevamente!')
    }
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function onsubmit(event) {
    event.preventDefault();
    search(searchbox.value);
}

const form = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
form.addEventListener('submit', onsubmit, true);
