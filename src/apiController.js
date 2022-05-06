const apiController = (() => {
  const apiKey = '6badb5bc9855c2296726ae1b1d9be1c0';
  const apiKey2 = '6V8iAgGehC4tgU358xQwFtyUBwc38qLA';

  const getData = async (location, units) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`, { mode: 'cors' });
    const data = await response.json();
    return data;
  };

  const getWeatherGifs = async (forecasts) => {
    const weathers = [];
    for (let i = 0; i < forecasts.length; i += 1) {
      weathers.push(forecasts[i].weather[0].main);
    }
    const promises = weathers.map(async (weather) => {
      const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey2}&tag=${weather}`, { mode: 'cors' });
      const result = await response.json();
      return result;
    });
    const results = await Promise.all(promises);
    return results;
  };
  return { getData, getWeatherGifs };
})();

export default apiController;
