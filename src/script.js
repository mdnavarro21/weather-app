import './styles.css';

const apiKey = '6badb5bc9855c2296726ae1b1d9be1c0';
const form = document.querySelector('form');

async function getData(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`, { mode: 'cors' });
  const data = await response.json();
  return data;
}
async function displayThreeHourForecast(location) {
  const container = document.getElementById('interval-forecast-container');
  const data = await getData(location);
  for (let i = 0; i < 8; i += 1) {
    const div = document.createElement('div');
    div.classList.add('forecast-container');
    div.innerHTML = `<div>Date and Time: ${data.list[i].dt_txt}</div><div>Current Temperature: ${data.list[i].main.temp}</div>`;
    container.append(div);
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.querySelector('input').value;
  displayThreeHourForecast(location);
});
