const apiKey = "c655ab9bc9884899ae3204621251709";


const locationTitle = document.querySelector("h2");
const dateField = document.querySelector(".date");
const tempField = document.querySelector("h1");
const greetingField = document.querySelector(".greeting");
const windField = document.querySelector(".box:nth-child(1) h3");
const humidityField = document.querySelector(".box:nth-child(2) h3");
const sunriseField = document.querySelector(".box:nth-child(3) h3");
const videoField = document.querySelector("video");
const conditionField = document.querySelector(".condition");

const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

let target = "Koforidua";


async function fetchWeather(targetLocation) {
  let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${targetLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    
    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let wind = data.current.wind_kph;
    let humidity = data.current.humidity;
    let sunrise = data.location.localtime.split(" ")[1]; 
    

    updateDetails(temp, locationName, time, condition, wind, humidity, sunrise);
  } catch (error) {
    console.log("Error fetching weather:", error);
    alert("Could not fetch weather data. Try again!");
  }
}


function updateDetails(temp, locationName, time, condition, wind, humidity, sunrise) {
  
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let [hour, minute] = splitTime.split(":").map(Number);

  
  let greeting = "";
  if (hour >= 5 && hour < 12) {
    greeting = "GOOD MORNING";
  } else if (hour >= 12 && hour < 17) {
    greeting = "GOOD AFTERNOON";
  } else if (hour >= 17 && hour < 21) {
    greeting = "GOOD EVENING";
  } else {
    greeting = "GOOD NIGHT";
  }

  
  locationTitle.innerText = locationName;
  dateField.innerText = `${getDayName(new Date(splitDate).getDay())}  ${splitTime}`;
  tempField.innerHTML = `${temp} <sup>o</sup>C`;
  greetingField.innerText = greeting;
  windField.innerText = wind + " km/h";
  humidityField.innerText = humidity + "%";
  sunriseField.innerText = sunrise;
  conditionField.innerText = condition;

  
  updateWeatherVideo(condition);
}


function updateWeatherVideo(condition) {
  let videoSrc = "images/sunnny.mp4";

  condition = condition.toLowerCase();

  if (condition.includes("sunny") || condition.includes("clear")) {
    videoSrc = "images/sunnny.mp4";
  } else if (condition.includes("cloud")) {
    videoSrc = "images/cloudy.mp4";
  } else if (condition.includes("rain")) {
    videoSrc = "images/heavyrain.mp4";
  } else if (condition.includes("mist") || condition.includes("fog")) {
    videoSrc = "images/mist.mp4";
  } else if (condition.includes("snow")) {
    videoSrc = "images/snow.mp4";
  } else if (condition.includes("thunder")) {
    videoSrc = "images/thunder.mp4";
  }

  videoField.setAttribute("src", videoSrc);
  videoField.load();
  videoField.play();
}


function getDayName(number) {
  switch (number) {
    case 0: return "SUNDAY";
    case 1: return "MONDAY";
    case 2: return "TUESDAY";
    case 3: return "WEDNESDAY";
    case 4: return "THURSDAY";
    case 5: return "FRIDAY";
    case 6: return "SATURDAY";
    default: return "UNKNOWN";
  }
}


form.addEventListener("submit", function (e) {
  e.preventDefault();
  target = searchField.value;
  fetchWeather(target);
});


fetchWeather(target);
