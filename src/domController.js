import { format } from 'date-fns';
import apiController from './apiController';

const domController = (() => {
  const clearChildNodes = (node) => {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  };

  const renderHeader = (data) => {
    const header = document.querySelector('header');
    clearChildNodes(header);
    const location = document.createElement('h2');
    const date = document.createElement('h3');

    location.textContent = `Next 24-Hour forecast of ${data.city.name}, ${data.city.country}`;
    header.append(location);

    const currentDate = data.list[0].dt_txt;
    date.textContent = `Starting on ${format(new Date(currentDate), 'EEEE LLLL do, yyyy')}`;
    header.append(date);
  };

  const createForecastCard = (forecastData, units, weatherGif) => {
    let degrees = '';
    if (units === 'imperial') {
      degrees += '&#8457';
    } else {
      degrees += '&#8451';
    }
    const div = document.createElement('div');
    div.classList.add('forecast-container');

    const gifContainer = document.createElement('div');
    gifContainer.classList.add('gif-container');
    const gif = document.createElement('img');
    gif.src = weatherGif.data.images.fixed_height_small.url;
    gifContainer.append(gif);
    div.append(gifContainer);

    div.innerHTML += `<div class = 'forecast-info'>
        <h1 class = 'time'>${format(new Date(forecastData.dt_txt), 'h:mm a')}</h1>
        <h2>Temperature: ${forecastData.main.temp} ${degrees}</h2>
        <div>
          <h3>Feels Like: ${forecastData.main.feels_like} ${degrees}</h3>
          <h3>Sky Conditions: ${forecastData.weather[0].description}</h3>
          <h3>Humidity: ${forecastData.main.humidity}</h3>        
        </div>
      </div>`;
    return div;
  };

  const displayThreeHourForecast = async (location, units) => {
    const container = document.getElementById('interval-forecast-container');
    if (container.hasChildNodes()) {
      clearChildNodes(container);
    }
    const data = await apiController.getData(location, units);
    const forecast24Hr = data.list.slice(0, 8);
    const weatherGifs = await apiController.getWeatherGifs(forecast24Hr);
    renderHeader(data);
    for (let i = 0; i < forecast24Hr.length; i += 1) {
      container.append(createForecastCard(forecast24Hr[i], units, weatherGifs[i]));
    }
  };

  return { displayThreeHourForecast };
})();

export default domController;
