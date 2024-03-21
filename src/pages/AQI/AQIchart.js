
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AQI.css';

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
            <div className="mainAQI">
            <img src={imgUrl} alt="AQI" />
                <h1>LOW</h1>
                <h2>Primary Pollutant:</h2>
                <h2>PM 2.5</h2>
            </div>
            <div className="PM2.5">
                <h1>PM 2.5</h1>
                <h1>LOW</h1>
                <h1><img src={imgUrl}></img> 29.84 µg/m3</h1>
            </div>
            <div className="PM10">
                <h1>PM 10</h1>
                <h1>LOW</h1>
                <h1><img src={imgUrl}></img> 38.86 µg/m3</h1>
            </div>
            <div className="O3">
                <h1>O3</h1>
                <h1>LOW</h1>
                <h1><img src={imgUrl}></img> 39.21 µg/m3</h1>
            </div>
            <div className="NO2">
                <h1>NO2</h1>
                <h1>LOW</h1>
                <h1><img src={imgUrl}></img> 20.18 µg/m3</h1>
            </div>
            <div className="SO2">
                <h1>SO2</h1>
                <h1>LOW</h1>
                <h1><img src={imgUrl}></img> 4.42 µg/m3</h1>
            </div>
            <img src={imgUrl}></img>
        </div>
  
    );
}

export default AQIchart;