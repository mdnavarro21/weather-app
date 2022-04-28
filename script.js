const api_key = '6badb5bc9855c2296726ae1b1d9be1c0';
const form = document.querySelector('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    const location = document.querySelector('input').value;
    getData(location);
});

async function getData(location) {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api_key}&units=metric`, {mode: 'cors'});
    data = await response.json();
    console.log(data);
}