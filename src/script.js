import './styles.css';

document.cookie = 'Secure';
const apiKey = '6badb5bc9855c2296726ae1b1d9be1c0';
const apiKey2 = '6V8iAgGehC4tgU358xQwFtyUBwc38qLA';
const form = document.querySelector('form');

async function getData(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`, { mode: 'cors' });
  const data = await response.json();
  return data;
}

async function getWeatherGifs(forecasts) {
  const weathers = [];
  for (let i = 0; i < forecasts.length; i += 1) {
    weathers.push(forecasts[i].weather[0].main);
  }
  const promises = weathers.map(async (weather) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey2}&tag=weather-${weather}`, { mode: 'cors' });
    const result = await response.json();
    return result;
  });
  const results = await Promise.all(promises);
  return results;
}
async function displayThreeHourForecast(location) {
  const container = document.getElementById('interval-forecast-container');
  const data = await getData(location);
  const dayForecast = data.list.slice(0, 8);
  const weatherGifs = await getWeatherGifs(dayForecast);
  for (let i = 0; i < dayForecast.length; i += 1) {
    const forecast = dayForecast[i];
    const div = document.createElement('div');
    div.classList.add('forecast-container');
    div.innerHTML = `
    <div>Date and Time: ${forecast.dt_txt}</div>
    <div>Temperature: ${forecast.main.temp}</div>
    <div>Feels Like: ${forecast.main.feels_like}</div>
    <div>Humidity: ${forecast.main.humidity}</div>
    <div>Skies: ${forecast.weather[0].main}`;
    const gif = document.createElement('img');
    gif.src = weatherGifs[i].data.images.original.url;
    div.append(gif);
    container.append(div);
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.querySelector('input').value;
  displayThreeHourForecast(location);
});
