//Use fetch to get weather. You get a 'promise' back. Do a '.then' statement to run the code after response is received.

//Do console.log to see errors. remove all when done.

// Here, we wrap the JS that will interact with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements. 
let inputForm = document.getElementById("search-form");

let searchBtn = document.getElementById("search-button");

let apiKey = 'b18cda2bfec79a5c4014c5558efbd9aa';

async function getWeather(cityName) {
  let fetchUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=b18cda2bfec79a5c4014c5558efbd9aa`;

  const response = await fetch(fetchUrl);
  const data = await response.json();

  const temp = data.main.temp;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;
  const city = data.name;
  const unixTime = data.dt;

  const date = new Date(unixTime * 1000);
  const formattedDate = date.toLocaleString();


  console.log(city, formattedDate, temp, wind, humidity);



};

//The 'Default' behavior in the 'event' of a click on a button inside a form is to submit the form and refresh the page. We want to 'prevent' this from happening, so here we add a 'function' that 'handle's the 'Search' without allowing the 'Default' action to occur. The 'handleSearch' function then retrieves the text 'value' of the 'inputForm' field (which is accessed by the 'let' we created at the global-level) and passes that value to the 'getWeather' 'function (detailed above) to actually 'get' the 'Weather' for that 'Locale'. using the 'searchResult' as a paramater.
function handleSearch(e) {
  e.preventDefault();
  let searchResult = inputForm.value;
  console.log(searchResult);
  getWeather(searchResult);
};

//Here, we 'add' an 'EventListener' and ask that when a 'click' occurs on the'searchBtn', we get the info. that was gathered in conjunction with the'handleSearch' function.
searchBtn.addEventListener("click", handleSearch);