    const apiKey = 'b5929beb80f1b1063c326b4719a59c35'; 

    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
   

    const tempEl = document.getElementById('temp');
    const feelsLikeEl = document.getElementById('feels-like');
    const tempMaxEl = document.getElementById('temp-max');
    const tempMinEl = document.getElementById('temp-min');
    const descEl = document.getElementById('desc');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');
    const sunriseEl = document.getElementById('sunrise');
    const sunsetEl = document.getElementById('sunset');

    searchButton.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeather(city);
      }
    });

    function getBackgroundAnimation(condition) {
  const map = {
    Clear: "https://assets6.lottiefiles.com/packages/lf20_ydo1amjm.json",
    Clouds: "https://assets6.lottiefiles.com/packages/lf20_v7mpsp1l.json",
    Rain: "https://assets3.lottiefiles.com/packages/lf20_jmBauI.json",
    Drizzle: "https://assets1.lottiefiles.com/private_files/lf30_t4j2tf.json",
    Thunderstorm: "https://assets6.lottiefiles.com/packages/lf20_jzq3xyqt.json",
    Snow: "https://assets6.lottiefiles.com/packages/lf20_Wt8f8w.json",
    Mist: "https://assets2.lottiefiles.com/private_files/lf30_dgjK9i.json",
    Haze: "https://assets6.lottiefiles.com/packages/lf20_vvplvtnc.json",
    Fog: "https://assets6.lottiefiles.com/packages/lf20_wnqlfojb.json",
    Smoke: "https://assets6.lottiefiles.com/packages/lf20_mYp2wF.json",
    Sand: "https://assets4.lottiefiles.com/packages/lf20_D3XbL7.json",
    Dust: "https://assets1.lottiefiles.com/private_files/lf30_4vqPrc.json",
    Ash: "https://assets6.lottiefiles.com/packages/lf20_rmxzbygb.json",
    Squall: "https://assets5.lottiefiles.com/packages/lf20_tll0j4bb.json",
    Tornado: "https://assets7.lottiefiles.com/packages/lf20_13a1z2gd.json",
  };
  return map[condition] || map['Clear'];
}


    function getLottieAnimation(condition) {
  const map = {
    Sky: "https://assets9.lottiefiles.com/packages/lf20_xlmz9xwm.json",
    Clouds: "https://assets9.lottiefiles.com/packages/lf20_obhph3sh.json",
    "Scattered Clouds": "https://assets7.lottiefiles.com/private_files/lf30_mznpuk7j.json",
    "Broken Clouds": "https://assets2.lottiefiles.com/packages/lf20_gs0xb4iv.json",
    "Overcast Clouds": "https://assets10.lottiefiles.com/packages/lf20_HpFqiS.json",
    Rain: "https://assets2.lottiefiles.com/packages/lf20_jmBauI.json",
    Thunderstorm: "https://assets9.lottiefiles.com/private_files/lf30_mf6qnlpu.json",
    Snow: "https://assets9.lottiefiles.com/packages/lf20_Wt8Os5.json",
    Mist: "https://assets2.lottiefiles.com/packages/lf20_ygiuluqn.json",
    Haze: "https://assets6.lottiefiles.com/private_files/lf30_t26law.json",
    Fog: "https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json",
    Drizzle: "https://assets1.lottiefiles.com/packages/lf20_gs0xb4iv.json",
    Smoke: "https://assets2.lottiefiles.com/packages/lf20_wXjG5U.json",
    Dust: "https://assets10.lottiefiles.com/packages/lf20_e3ln1t2q.json",
    Sand: "https://assets10.lottiefiles.com/packages/lf20_vmlizykt.json"
  };

  return map[condition] || map["Clear"];
}

    async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    clearFields();
    tempEl.textContent = 'Loading...';

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  const { weather, main, wind, sys, timezone } = data;
  // 🔁 Load dynamic background animation based on weather
const condition = weather[0].main;
const backgroundUrl = getBackgroundAnimation(condition);

const bgContainer = document.getElementById("weather-bg");
bgContainer.innerHTML = ""; // Clear previous animation

lottie.loadAnimation({
  container: bgContainer,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: backgroundUrl,
});


  tempEl.textContent = `Temperature: ${main.temp} °C`;
  document.getElementById("temp-main").textContent = `${main.temp} °C`; // ✅ for temperature card

  feelsLikeEl.textContent = `Feels Like: ${main.feels_like} °C`;
  tempMaxEl.textContent = `Max Temp: ${main.temp_max} °C`;
  tempMinEl.textContent = `Min Temp: ${main.temp_min} °C`;

  descEl.textContent = `Condition: ${capitalize(weather[0].description)}`;

  humidityEl.textContent = `Humidity: ${main.humidity}%`;
  document.getElementById("humidity-main").textContent = `${main.humidity}%`; // ✅ for humidity card

  windSpeedEl.textContent = `Wind Speed: ${wind.speed} m/s`;
  document.getElementById("wind-main").textContent = `${wind.speed} m/s`; // ✅ for wind speed card

  sunriseEl.textContent = `Sunrise: ${formatTime(sys.sunrise, 'Asia/Kolkata')}`;
  sunsetEl.textContent = `Sunset: ${formatTime(sys.sunset, 'Asia/Kolkata')}`;

  await fetchForecast(city);
}

 else {
      tempEl.textContent = 'City not found.';
    }
  } catch (error) {
    tempEl.textContent = 'Error fetching weather.';
    console.error('Fetch error:', error);
  }
}


    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function formatTime(unixTime, tz = 'Asia/Kolkata') {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: tz,
  }).format(new Date(unixTime * 1000));
}

    function clearFields() {
      tempEl.textContent = '';
      feelsLikeEl.textContent = '';
      tempMaxEl.textContent = '';
      tempMinEl.textContent = '';
      descEl.textContent = '';
      humidityEl.textContent = '';
      windSpeedEl.textContent = '';
      sunriseEl.textContent = '';
      sunsetEl.textContent = '';
    }

// 🌙 Dark mode toggle
    const toggleButton = document.getElementById('toggle-dark');
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

// Load weather for default city (Gurugram) on page load
document.addEventListener('DOMContentLoaded', () => {
  const defaultCity = "Gurugram";
  cityInput.value = defaultCity; // ✅ show default in search box
  fetchWeather(defaultCity);
});

async function fetchForecast(city) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    if (data.cod === "200") {
      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = "";

      const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

      daily.forEach((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-IN", { weekday: "short" });
        const condition = day.weather[0].main;
        const temp = Math.round(day.main.temp);
        const description = capitalize(day.weather[0].description);
        const lottieUrl = getLottieAnimation(condition);

        const dayDiv = document.createElement("div");
        dayDiv.className = "forecast-day";

        // Build card using innerHTML including a container for animation
        dayDiv.innerHTML = `
          <div>${dayName}</div>
          <div id="lottie-${index}" style="width:80px; height:80px; margin:auto;"></div>
          <div>${temp}°C</div>
          <div style="font-size: 0.85rem;">${description}</div>
        `;

        forecastContainer.appendChild(dayDiv);

        // Now load animation after adding to DOM
        if (lottieUrl) {
          lottie.loadAnimation({
            container: document.getElementById(`lottie-${index}`),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: lottieUrl
          });
        }
      });
    }
  } catch (error) {
    console.error("Forecast error:", error);
  }
}
