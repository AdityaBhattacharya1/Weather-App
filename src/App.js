import React, { useState } from 'react'
import keys from './keys.js'

/* Make a file named 'keys.js' in the 'src' folder and 
  fill in the data in the following format:
  module.exports = {
  API_KEY: <Your key here>,
  BASE_URL: 'https://api.openweathermap.org/data/2.5/',
}
*/

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
}

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date())
    date = date.slice(3, 15)
    return date
  }

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) // fetch data in JSON format from the openweather API
        .then((res) => res.json())
        .then((result) => {
          setQuery('')
          setWeather(result)
        })
    }
  }

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 18 // If temperature is greater than 18 degree celsius:
            ? 'App hot' // Append className of 'hot' to className 'app'
            : 'App cold' // Else append className of 'cold' to className 'app'
          : 'App' // Default app with no data
      }
    >
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="City"
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
