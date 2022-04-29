const apiKey = '6badb5bc9855c2296726ae1b1d9be1c0';
const form = document.querySelector('form');

async function getData(location) {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`, { mode: 'cors' });
  const data = await response.json();
  console.log(data);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.querySelector('input').value;
  getData(location);
});
