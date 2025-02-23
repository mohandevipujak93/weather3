/*   import { useEffect, useState } from "react";
 ####first code snippet###
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("london");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = "50ae943e04132f90c037d11205892ca0";
  
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      const foreCastresponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`
      );
      const forecastdata = await foreCastresponse.json();

      console.log(forecastdata);

      setCity(cityName);

      const dailyForecast = forecastdata.list.filter(
        (item, index) => index % 8 === 0
      );
      setForecast(dailyForecast);
    } catch (error) {
      setError("Sorry, we couldn’t retrieve the weather data at this time");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }

  if (loading) return <div className="wrapper">Loading...</div>;

  return (
    <div className="wrapper">
      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {error && <p className="error">{error}</p>}

{weatherData && weatherData.main && weatherData.weather && (
  <>
    <div className="header">
      <h1 className="city">{weatherData.name}</h1>
      <p className="temperature">{weatherData.main.temp}°F</p>
      <p className="condition">{weatherData.weather[0].main}</p>
    </div>
    <div className="weather-details">
      <div >
        <p >Humidity</p>
        <p style={{fontWeight:"bold"}}>{Math.round(weatherData.main.humidity)}%</p>
      </div>
      <div>
        <p>Wind Speed</p>
        <p style={{fontWeight:"bold"}}>{Math.round(weatherData.wind.speed)} mph</p>
      </div>
    </div>
  </>
)}

{forecast.length > 0 && (
  <>
    <div className="forecast">
      <h2 className="forecast-header">5-Day Forecast</h2>
      <div className="forecast-days">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p>{Math.round(day.main.temp)}°F</p>
          </div>
        ))}
      </div>
    </div>
  </>
)}
    </div>
  );
}



export default App;

*/

/*   import { useEffect, useState } from "react";

######### second code snippet ######


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("london");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "50ae943e04132f90c037d11205892ca0";

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`
      );
      const forecastData = await forecastResponse.json();

      setCity(cityName);

      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );
      setForecast(dailyForecast);
    } catch (error) {
      setError("Sorry, we couldn’t retrieve the weather data at this time");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      const cityName = data.name;

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`
      );
      const forecastData = await forecastResponse.json();

      setCity(cityName);

      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );
      setForecast(dailyForecast);
    } catch (error) {
      setError("Sorry, we couldn’t retrieve the weather data at this time");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to fetch location-based weather data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        () => {
          // Fallback to default city if location access is denied
          fetchWeatherData(city);
        }
      );
    } else {
      // Fallback to default city if geolocation is not supported
      fetchWeatherData(city);
    }
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }

  if (loading) return <div className="wrapper">Loading...</div>;

  return (
    <div className="wrapper">
      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      {weatherData && weatherData.main && weatherData.weather && (
        <>
          <div className="header">
            <h1 className="city">{weatherData.name}</h1>
            <p className="temperature">{weatherData.main.temp}°F</p>
            <p className="condition">{weatherData.weather[0].main}</p>
          </div>
          <div className="weather-details">
            <div>
              <p>Humidity</p>
              <p style={{ fontWeight: "bold" }}>
                {Math.round(weatherData.main.humidity)}%
              </p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p style={{ fontWeight: "bold" }}>
                {Math.round(weatherData.wind.speed)} mph
              </p>
            </div>
          </div>
        </>
      )}

      {forecast.length > 0 && (
        <>
          <div className="forecast">
            <h2 className="forecast-header">5-Day Forecast</h2>
            <div className="forecast-days">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p>{Math.round(day.main.temp)}°F</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

*/


import { useEffect, useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("london");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "50ae943e04132f90c037d11205892ca0";

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`
      );
      const forecastData = await forecastResponse.json();

      setCity(cityName);

      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );
      setForecast(dailyForecast);
    } catch (error) {
      setError("Sorry, we couldn’t retrieve the weather data at this time");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      const cityName = data.name;

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`
      );
      const forecastData = await forecastResponse.json();

      setCity(cityName);

      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );
      setForecast(dailyForecast);
    } catch (error) {
      setError("Sorry, we couldn’t retrieve the weather data at this time");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        () => {
          fetchWeatherData(city);
        }
      );
    } else {
      fetchWeatherData(city);
    }
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }

  if (loading) return <div className="wrapper">Loading...</div>;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="wrapper">
      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      {weatherData && weatherData.main && weatherData.weather && (
        <>
          <div className="header">
            <h1 className="city">{weatherData.name}</h1>
            <p className="temperature">{weatherData.main.temp}°F</p>
            <p className="condition">{weatherData.weather[0].main}</p>
            <p className="current-date">{currentDate}</p>
          </div>
          <div className="weather-details">
            <div>
              <p>Humidity</p>
              <p style={{ fontWeight: "bold" }}>
                {Math.round(weatherData.main.humidity)}%
              </p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p style={{ fontWeight: "bold" }}>
                {Math.round(weatherData.wind.speed)} mph
              </p>
            </div>
          </div>
        </>
      )}

      {forecast.length > 0 && (
        <>
          <div className="forecast">
            <h2 className="forecast-header">5-Day Forecast</h2>
            <div className="forecast-days">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <img
                    className="weather-icon"
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p>{Math.round(day.main.temp)}°F</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
