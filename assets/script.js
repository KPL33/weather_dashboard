//Here, we target the 2 major 'Element's that the user will interact with in the DOM by their 'Id's (the 'search-form' that they will type a city name into and the 'search-button' they will click to submit their search).
let inputForm = document.getElementById("search-form");
let searchBtn = document.getElementById("search-button");

//Here, we've established a 'Key' that gives us access to the 'openweahter' 'api', which will feed us the weather information that will be displayed to the user.
let apiKey = 'b18cda2bfec79a5c4014c5558efbd9aa';

//Here, we declare a 'let' called 'historyDiv', as it will hold the 'history' of city searches entered by the user. We use a'querySelector' to target the element with class 'history' in our html. We also assign an empty array as the 'value' for the 'key' 'cities', which is where our searches will be stored for 'localStorage' to retrieve and display when the user reloads the webpage.
let historyDiv = document.querySelector(".history");
let cities = [];

// Here, 'if' the 'cities' 'key' contains any values in its array (from previous searches), we 'get' them from 'localStorage' (they are 'set' in 'localStorage' wihin the 'async'hronous 'function' below). The 'if' statement loops through the array of 'cities' and 'forEach' of them, 'parse's the city name out of the 'JSON' object that is retruned by the 'api'. It then takes the 'textContent' that was 'parse'd, 'create's an 'h5' element (listing the city name) and 'appends' it as a child of the "history" div on our page.

if (localStorage.getItem('cities')) {
  cities = JSON.parse(localStorage.getItem('cities'));

  for (let i = Math.max(cities.length - 10, 0); i < cities.length; i++) {
    let cityDiv = document.createElement("h5");
    cityDiv.textContent = cities[i];
    historyDiv.appendChild(cityDiv);

  }
}

//Here, we force our main 'function' to act as 'async'hronous so that portions of our code can run unimpeded (by a wait for a query response from the 'api' 'Url', from which the 'function' is 'fetch'ing our weather information). It 'get's the 'Weather' using the parameter 'cityName' (based on the search, entered by the user). It then uses that 'cityName' in conjunction with the 'api' key ('id') provided by us (following the '=' sign).
async function getWeather(cityName) {
  let row1 = document.querySelector(".row1");
  let row2 = document.querySelector(".row2");
  let fetchUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=b18cda2bfec79a5c4014c5558efbd9aa`;

  //Here, we ensure that the content displayed in the 'row's ('1' for current weather; '2' for the 5-day forecast) are cleared before adding new weather info. that results from the user submitting subsequent searches.
  row1.innerHTML = "";
  row2.innerHTML = "";


  //Because we want to extract the 'json' data from the 'response' so that it can be used (and we can't do anything with the information until it's actually received), here we make sure the 'function' 'await's the resonse from the 'openweather' 'api', so that it can display as intended. These variables are 'const'ants.
  const response = await fetch(fetchUrl);
  const data = await response.json();
  const city = data.name;

  //We want to add the city names as 'h5' 'Element's, so we 'create' them
  const cityDiv = document.createElement("h5");
  cityDiv.textContent = city;
  historyDiv.appendChild(cityDiv);

  cities.push(city);

  localStorage.setItem('cities', JSON.stringify(cities));

  const temp = data.main.temp;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;
  const unixTime = data.dt;
  const date = new Date(unixTime * 1000);
  const formattedDate = date.toLocaleDateString({
    year: '4-digit',
    month: '2-digit',
    day: '2-digit',
    hour: undefined,
    minute: undefined,
    second: undefined,
    millisecond: undefined
  });

  let weatherData = document.createElement("p");
  weatherData.textContent = `${city}, ${formattedDate}: ${temp}°F, Wind ${wind} mph, Humidity ${humidity}%`;

  row1.appendChild(weatherData);

  const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=b18cda2bfec79a5c4014c5558efbd9aa`;

  const forecastResponse = await fetch(forecastUrl);

  const forecastData = await forecastResponse.json();

};


//The 'Default' behavior in the 'Event' of a click on a button inside a form is to submit the form and refresh the page. We want to 'prevent' this from happening, so here we add a 'function' that 'handle's the 'Search' without allowing the 'Default' action to occur. The 'handleSearch' function then retrieves the text 'value' of the 'inputForm' field (which is accessed by the 'let' we created at the global-level) and passes that value to the 'getWeather' 'function' (detailed above) to actually 'get' the 'Weather' for that 'Locale', using the 'searchResult' as a paramater.
function handleSearch(e) {
  e.preventDefault();
  let searchResult = inputForm.value;
  getWeather(searchResult).then(data => {
    let row1 = document.querySelector(".row1");
  });
  inputForm.value = "";
};

//Here, our JS 'listen's for a 'clikc' on the 'search' button.
searchBtn.addEventListener("click", handleSearch);