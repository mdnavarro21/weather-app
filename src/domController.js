import { format } from 'date-fns';
import { getData, getWeatherGifs } from './apiCalls';

function clearChildNodes(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

function renderHeader(data) {
  const header = document.querySelector('header');
  clearChildNodes(header);
  const location = document.createElement('div');
  const date = document.createElement('div');

  location.textContent = `${data.city.name}, ${data.city.country}`;
  header.append(location);

  const currentDate = data.list[0].dt_txt.slice(0, 11);
  date.textContent = `${format(new Date(currentDate), 'EEEE LLLL do, yyyy')}`;
  header.append(date);
}

function createForecastCard(forecastData, units, weatherGif) {
  let degrees = '';
  if (units === 'imperial') {
    degrees += '&#8457';
  } else {
    degrees += '&#8451';
  }
  const div = document.createElement('div');
  div.classList.add('forecast-container');
  div.innerHTML = `
    <div class = 'time'>${forecastData.dt_txt.slice(11, forecastData.dt_txt.length)}</div>
    <div>Temperature: ${forecastData.main.temp} ${degrees}</div>
    <div>Feels Like: ${forecastData.main.feels_like} ${degrees}</div>
    <div>Humidity: ${forecastData.main.humidity}</div>
    <div>Skies: ${forecastData.weather[0].description}`;
  const gif = document.createElement('img');
  gif.src = weatherGif.data.images.original.url;
  div.append(gif);
  return div;
}
async function displayThreeHourForecast(location, units) {
  const container = document.getElementById('interval-forecast-container');
  const data = await getData(location, units);
  const forecast24Hr = data.list.slice(0, 8);
  const weatherGifs = await getWeatherGifs(forecast24Hr);
  renderHeader(data);
  for (let i = 0; i < forecast24Hr.length; i += 1) {
    container.append(createForecastCard(forecast24Hr[i], units, weatherGifs[i]));
  }
}

export { displayThreeHourForecast, clearChildNodes };
