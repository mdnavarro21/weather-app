import domController from './domController';

const formController = (() => {
  const getFormData = () => {
    const location = document.querySelector('input[type=text]').value;
    const units = document.querySelector('input[name="units"]:checked').value;
    return { location, units };
  };
  const validateForm = () => {
    const inputs = document.querySelectorAll('form input');
    for (let i = 0; i < inputs.length; i += 1) {
      if (!inputs[i].validity.valid) {
        return false;
      }
    }
    return true;
  };
  const renderForm = () => {
    const form = document.querySelector('form');

    form.innerHTML = `
    <label for = 'location'>
        <p>Enter your location: </p>
        <input type = 'text' data-location name = 'location' pattern="[a-zA-Z]*">
    </label>
    <br>
    <label>
        Celcius
        <input type='radio' name= 'units' data-units value = 'metric' checked>    
    </label>
    <label for = 'fahrenheit'>
        Farenheit
        <input type='radio' id = 'fahrenheit' data-units name= 'units' value = 'imperial'>    
    </label>
    <br>
    <button id = 'submit-button'>Submit</button>
    <button id = 'close-form-button'>Close</button>`;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const error = document.querySelector('#form-error-container');
      if (validateForm()) {
        error.textContent = '';
        const { location, units } = getFormData();
        domController.displayForecast(location, units);
      } else {
        error.textContent = 'Invalid Input';
      }
    });
  };
  return { renderForm };
})();

export default formController;
