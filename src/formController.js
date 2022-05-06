import domController from './domController';

const formController = (() => {
  const getFormData = () => {
    const location = document.querySelector('input[type=text]').value;
    const units = document.querySelector('input[name="units"]:checked').value;
    return { location, units };
  };

  const renderForm = () => {
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
    <button id = 'submit-button'>Submit</button>
    <button id = 'close-form-button'>Close</button>`;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { location, units } = getFormData();
      domController.displayThreeHourForecast(location, units);
    });
  };
  return { renderForm };
})();

export default formController;
