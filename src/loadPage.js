import { displayThreeHourForecast, clearChildNodes } from './domController';

const loadPage = () => {
  const form = document.querySelector('form');

  form.innerHTML = `
    <label for = 'location'>
        <p>Enter your location: </p>
        <input type = 'text' name = 'location'>
    </label>
    <br>
    <label>
        Celcius
        <input type='radio' name= 'units' value = 'metric' checked>    
    </label>
    <label for = 'fahrenheit'>
        Farenheit
        <input type='radio' id = 'fahrenheit' name= 'units' value = 'imperial'>    
    </label>
    <br>
    <button id = 'submit-button'>Submit</button>`;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const container = document.getElementById('interval-forecast-container');
    if (container.hasChildNodes()) {
      clearChildNodes(container);
    }
    const location = document.querySelector('input[type=text]').value;
    const units = document.querySelector('input[name="units"]:checked').value;
    displayThreeHourForecast(location, units);
  });
};

export default loadPage;
