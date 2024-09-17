

//section 2
var sidemenu = document.querySelector("#sidemenu");
function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu(){
    sidemenu.style.right = "-200px";
}

async function search(){
  let location = document.querySelector("input").value;
  if(location !== ""){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=6XQQPXKMTYUZP2TS7V9CWW2N2&contentType=json`, {mode: 'cors'});

    try {
      const data = await response.json();  // Attempt to parse the response as JSON
      const days = data.days;
      todaysWeatherConditions(days[0]);
      daysWeather(days);
      updateImage(data.currentConditions);
      currentConditions(data.currentConditions, data.address, days[0].description);
      
    } catch (error) {
      console.error('Response is not valid JSON:', error);
    }
  }
}
defaultLocation();
async function defaultLocation(){
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Pretoria?unitGroup=metric&key=6XQQPXKMTYUZP2TS7V9CWW2N2&contentType=json`, {mode: 'cors'});

    try {
      const data = await response.json();  // Attempt to parse the response as JSON
      const days = data.days;
      todaysWeatherConditions(days[0]);
      daysWeather(days);
      currentConditions(data.currentConditions, data.address, days[0].description);
      updateImage(data.currentConditions);
      
    } catch (error) {
      console.error('Response is not valid JSON:', error);
    }
}



//method responsible for updating current codinitions
//recieves the currentCondition object as a parameter
function currentConditions(currentCondition, address, description){
  const currentConditionsDiv = document.querySelector("#current-conditions");
  currentConditionsDiv.innerHTML = `
    <p id="p1">Current</p>
                <div id="current-temp"><p>${currentCondition.temp}</p> <span>&deg;C</span></div>
                <p id="current-condition">${currentCondition.conditions}</p>
                <p id="description">${description}</p>
                
  `
  const location = document.querySelector("#location");
  location.innerHTML = `<h2 id="location">${address}</h2>`;
}

function todaysWeatherConditions(today){
    const weatherConditionDiv = document.querySelector("#weather-condition");
    weatherConditionDiv.innerHTML = `
      <div>
                <h4>Today's Weather Condition</h4>
                <div>
                    <p class="condition">Huminity</p>
                    <p class="value">${today.humidity}%</p>
                </div>

                <div>
                    <p class="condition">Min Temperature</p>
                    <p class="value">${today.tempmin} &deg;C</p>
                </div>

                <div>
                    <p class="condition">Max Temperature</p>
                    <p class="value">${today.tempmax} &deg;C</p>
                </div>

                <div>
                    <p class="condition">Weather Condition</p>
                    <p class="value">${today.conditions}</p>
                </div>

                <div>
                    <p class="condition">Wind Direction</p>
                    <p class="value">${today.winddir}</p>
                </div>

                <div>
                    <p class="condition">Wind Speed</p>
                    <p class="value">${today.windspeed} km/hr</p>
                </div>

                <div>
                    <p class="condition">Rain Amount</p>
                    <p class="value">${today.precip}</p>
                </div>

                <div>
                    <p class="condition">Rain Probability</p>
                    <p class="value">${today.precipprob}</p>
                </div>
                
                <div>
                    <p class="condition">Sunrise / Sunset</p>
                    <p class="value">${today.sunrise} / ${today.sunset}</p>
                </div>
                
            </div>
    `;
}
function getDayOfWeek(dateStr){
  const dateObj = new Date(dateStr);  // Create a Date object from the string

  // Array of day names
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get the day of the week index
  const dayIndex = dateObj.getDay();

  // Get the name of the day of the week
  const dayOfWeek = daysOfWeek[dayIndex];
  return dayOfWeek;
}


function daysWeather(days) {
  const weatherDaysDiv = document.querySelector("#weather-days-container");
  
  // Initialize the container
  weatherDaysDiv.innerHTML = ``;
  
  // Loop through the days and append each day card
  for (let i = 0; i < days.length; i++) {
    let day = days[i];
    
    // Log the icon for debugging purposes
    console.log(typeof(day.datetime));
    
    // Append the day card to the container
    weatherDaysDiv.innerHTML += `
      <div class="day-card">
        <h3>${getDayOfWeek(day.datetime)}</h3>
        <div class="day-icon">
          ${getIcon(day)}
        </div>
        <div class="day-min-max">
          <p class="day-max">${day.tempmax}&deg;</p>
          <p class="day-min">${day.tempmin}&deg;</p>
        </div>
      </div>
    `;
  }
  
}


function updateImage(currentCondition){
  const main = document.querySelector("main");

  let icon = "";
  console.log(currentCondition.icon);
  if(currentCondition.icon.toLowerCase().includes("partly-cloudy-night")){
    
    icon = "images/cloudy-night.jpg";
    
  }
  else if(currentCondition.icon.toLowerCase().includes("snow")){
    icon = "images/snowy.jpg";
  }
  else if(currentCondition.icon.toLowerCase().includes("rain")){
    icon = "images/rain.jpg";
  }
  else if(currentCondition.icon.toLowerCase().includes("fog")){
    icon = "images/fog.jpg";
  }
  else if(currentCondition.icon.toLowerCase().includes("wind")){
    icon = "images/wind.jpg";
  }
  else if(currentCondition.icon.toLowerCase().includes("partly-cloudy-day")){
    icon = "images/cloudy-day.jpg";
  }
  else if(currentCondition.icon.toLowerCase().includes("cloudy")){
    icon = "images/cloudy.jpg";
  }
  else if(currentCondition.icon.toLowerCase().includes("clear-day")){
    icon = "images/clear-day.jpg";
  }
  else if(currentCondition.icon.toLowerCase().includes("clear-night")){
    icon = "images/clear-night.jpg";
  }
  main.style.backgroundImage = `url(${icon})`;
}
function getIcon(currentCondition){
  let icon = "";
  console.log(currentCondition.icon);
  if(currentCondition.icon.toLowerCase().includes("partly-cloudy-night")){
    
    icon = "images/animated/cloudy-night-1.svg";
    alert("images/animated/cloudy-night-1.svg");
  }
  else if(currentCondition.icon.toLowerCase().includes("snow")){
    icon = "images/animated/snowy-1.svg";
  }
  else if(currentCondition.icon.toLowerCase().includes("rain")){
    icon = "images/animated/rainy-1.svg";
  }
  else if(currentCondition.icon.toLowerCase().includes("fog")){
    icon = "images/animated/cloudy-day-1.svg";
  }
  else if(currentCondition.icon.toLowerCase().includes("wind")){
    icon = "images/animated/cloudy.svg";
  }
  else if(currentCondition.icon.toLowerCase().includes("partly-cloudy-day")){
    icon = "images/animated/cloudy-day-2.svg";
  }
  else if(currentCondition.icon.toLowerCase().includes("cloudy")){
    icon = "images/animated/cloudy.svg";
  }
  else if(currentCondition.icon.toLowerCase().includes("clear-day")){
    icon = "images/animated/day.svg";
  }
  else if(currentCondition.icon.toLowerCase().includes("clear-night")){
    icon = "images/animated/night.svg";
  }
  const result = `
  <object type="image/svg+xml" data="${icon}" >
                    Your browser does not support SVG animations.
                  </object>`
  return result;
  

}


