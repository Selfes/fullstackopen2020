import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({city, country}) => {
    const [temperature, setTemperature] = useState(0)
    const [windVelocity, setWindVelocity] = useState(0)
    const [windDirection, setWindDirection] = useState("")
    const [weatherIcon, setWeatherIcon] = useState("")
    const [weatherDescr, setWeatherDescr] = useState("")

    const api_key = process.env.REACT_APP_API_KEY

    // get Wind direction from degrees
    // taken from https://stackoverflow.com/a/36475516
    function degreestoTextualDescription(degree) {
      if (degree > 337.5) return "N";
      if (degree > 292.5) return "NW";
      if (degree > 247.5) return "W";
      if (degree > 202.5) return "SW";
      if (degree > 157.5) return "S";
      if (degree > 122.5) return "SE";
      if (degree > 67.5) return "E";
      if (degree > 22.5) {
        return "NE";
      }
      return "N";
    }

    useEffect(() => {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "," +
            country +
            "&appid=" +
            api_key +
            "&units=metric"
        )
        .then((response) => {
          setTemperature(response.data.main.temp);
          setWindVelocity(response.data.wind.speed);
          setWindDirection(degreestoTextualDescription(response.data.wind.deg));
          setWeatherIcon(response.data.weather[0].icon);
          setWeatherDescr(response.data.weather[0].description);
        });
    }, [city, country, api_key]);

    return (
        <div>
          <h2>Weather in {city}</h2>
          <p><b>temperature:</b> {temperature} Celsius</p>
          <img src={"http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png"} alt={weatherDescr}/>
          <p><b>wind:</b> {windVelocity} m/s direction {windDirection}</p>
        </div>
    )

}

export default Weather
