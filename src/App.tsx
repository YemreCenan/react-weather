import { useEffect, useState, useRef, ReactElement } from "react";
import "./App.css";
import axios from "axios";
import { WeatherModel } from "./model/responses/weatherModel";
import ImageCity from "./components/ImageCity/ImageCity";


function App(): ReactElement {
  const [weatherData, setWeatherdata] = useState <WeatherModel>();
  const [location, setLocation] = useState("İzmir");
  const [isChecked, setIsChecked] = useState(false);
  

  const weatherApi = "dc00ae4d3b904d0bb01163320240104";

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  // Time


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${weatherApi}&q=${location}&days=7&aqi=yes&alerts=yes`
        );
        setWeatherdata(response.data);
        console.log(response.data)
      } catch (error: any) {
       console.log(error)
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
     <div>
     
      <div className="container">
      
       <ImageCity 
       locationName = {weatherData?.location.name} 
       locationCountry= {weatherData?.location.country}/>

        <div className="info-side">
        {weatherData && weatherData.current &&(
          <div className="today-info-container">
            <div className="today-info">
              <div className="precipitation">
              <span><input
          type="text"
          className="form-control enlarge-input"
          aria-describedby="emailHelp"
          placeholder="Şehri Giriniz.."
          value={location}
          onChange={handleLocationChange}/></span>

                <span className="title">°C/°F</span>
                <span className="value">
                  <span className="switch">
                    <input
                      id="online"
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <label htmlFor="online">°F</label>
                  </span>
                </span>
                <div className="clear"></div>
              </div>
              
              <div className="humidity">
                <span className="title">HUMIDITY</span>
                <span className="value">{weatherData.current.humidity} %</span>
                <div className="clear"></div>
              </div>
             
              <div className="humidity">
                <span className="title">LOCATION</span>
                <span className="value">{weatherData.location.name} /{weatherData.location.country}</span>
                <div className="clear"></div>
              </div>
              

              <div className="wind">
                <span className="title">WIND</span>
                <span className="value">{weatherData.current.wind_kph} km/h</span>
                <div className="clear"></div> 
              </div>


            </div>
          </div>
            )}
          <div className="week-container">
            <ul className="week-list">
              {weatherData &&
                weatherData.forecast.forecastday.map((day: any) => (
                  <li key={day.date}>
                    <img src={day.day.condition.icon} />
                    <span className="day-name">
                      {formatDateString(day.date)}
                    </span>
                    <span className="day-temp">
                      {!isChecked
                        ? day.day.avgtemp_c + " C°"
                        : day.day.avgtemp_f + " °F"}
                    </span>
                  </li>
                ))}
              <div className="clear"></div>
            </ul>
          </div>
          <div className="location-container"></div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
