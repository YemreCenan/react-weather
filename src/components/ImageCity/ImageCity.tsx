import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

type Props = {
  locationName?: string;
  locationCountry?: string;
}

const ImageCity = (props: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageData, setImageData] = useState<any>(props.locationName); // Veri tipini belirtmek önemli

  const imageUrlKey = "43114654-e199307cf9b00004ddd899199";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pixabay.com/api/?key=${imageUrlKey}&q=${props.locationName}`);
        setImageData(response.data.hits[1]);
        console.log(response.data.hits[1])
        if(response.data.hits[1]==="undefined"){
          toast.error("Not found image !!!!!")
        }
      } catch (error: any) {
        
        console.log(error)
      }
    };
    if (props.locationName) {
      fetchData();
    }
  }, [props.locationName])

 
  if (!props.locationName || !props.locationCountry || !imageData) {
  return ;
  }
 

  return (
    <>
      <div className="weather-side">
        <div className="weather-gradient" >
          <img src={imageData.webformatURL} alt="City"  />
          <div className="date-container">
            <h2 className="date-dayname">{props.locationName}</h2>
            <span className="date-day">{props.locationCountry}</span>
            <i className="location-icon" data-feather="map-pin"></i>
            <span className="location"></span>
          </div>
          <div className="weather-container">
            
            <h1 className="weather-temp">
              {hours}:{minutes}:{seconds}
            </h1>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageCity
