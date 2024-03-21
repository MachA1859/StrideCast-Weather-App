
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AQI.css';
import AQI1 from "./AQI1.png"
import AQI2 from "./AQI2.png"
import AQI3 from "./AQI3.png"
import AQI4 from "./AQI4.png"
import AQI5 from "./AQI5.png"

function AQIchart() {
    const [aqiData, setAqiData] = useState(null);
    const apiKey = "ca5e7726e301724c181570c7c9883465";
    const apiUrl = "https://api.openweathermap.org/data/2.5/air_pollution?units=metric&lat=51.507351&lon=-0.127758";

    const [imgUrl , setImgUrl] = useState("./UV1.png");
    
    useEffect(() => {
        async function fetchAQIData() {
            try {
                const response = await axios.get(apiUrl, {
                    params: {
                        appid: apiKey
                    }
                });
                setAqiData(response.data);
                console.log(response.data.list[0].main.aqi);
                
                
                
                console.log(imgUrl);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchAQIData();

    }, []);

    function getAqiImage(response) {
        
    }

    if (!aqiData) {
        return null;
    }

    return (
        <div className="AQI">
            {aqiData.list.map((hour) => (
                <div className="hourlyElement" key={hour.dt}>
                    <div>{new Date(hour.dt*1000).toLocaleString('en-US', { hour: 'numeric', hour12: true })}</div>
                    <img className="hourlyImage" src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].description} />
                    <div>{Math.round(hour.pop * 1000) / 10}%</div>
                </div>
            ))}
            <div className="mainAQI">
            <img src={UV1} alt="AQI" />
                <h1>LOW</h1>
                <h2>Primary Pollutant:</h2>
                <h2>PM 2.5</h2>
            </div>
            <div className="PM2.5">
                <img src={UV1}></img>
                <h1>PM 2.5</h1>
                <h1>{getPollutantLevel(aqiData.components.pm2_5)}</h1>
                <h1>{aqiData.components.pm2_5} 29.84 µg/m3</h1>
            </div>
            <div className="PM10">
                <img src={UV1}></img>
                <h1>PM 10</h1>
                <h1>{getPollutantLevel(aqiData.components.pm10)}</h1>
                <h1>{aqiData.components.pm10} 38.86 µg/m3</h1>
            </div>
            <div className="O3">
                <img src={UV1}></img>
                <h1>O3</h1>
                <h1>{getPollutantLevel(aqiData.components.o3)}</h1>
                <h1>{aqiData.components.o3} 39.21 µg/m3</h1>
            </div>
            <div className="NO2">
                <img src={UV1}></img>
                <h1>NO2</h1>
                <h1>{getPollutantLevel(aqiData.components.no2)}</h1>
                <h1>{aqiData.components.no2} 20.18 µg/m3</h1>
            </div>
            <div className="SO2">
                <img src={UV1}></img>
                <h1>SO2</h1>
                <h1>{getPollutantLevel(aqiData.components.so2)}</h1>
                <h1>{aqiData.components.so2} 4.42 µg/m3</h1>
            </div>
        </div>
  
    );
}

export default AQIchart;