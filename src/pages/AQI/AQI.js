import { useEffect, useState } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Card2 from "../../components/card/card2";
import Forecast from "../../components/forecast/forecast";

import AQI1 from "./AQI1.png";
import AQI2 from "./AQI2.png";
import AQI3 from "./AQI3.png";
import AQI4 from "./AQI4.png";
import AQI5 from "./AQI5.png";

import "./AQI.css";
import axios from 'axios';

const AQIImages = [AQI1, AQI2, AQI3, AQI4, AQI5];

const apiKey = "ca5e7726e301724c181570c7c9883465";
const apiUrl = "https://api.openweathermap.org/data/2.5/air_pollution?lat=51.507351&lon=-0.127758";

const AQI = () => {
    const [pollutants, setPollutants] = useState([]);
    const [highestPollutant, setHighestPollutant] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}&appid=${apiKey}`);
                const data = response.data.list[0].components;

                const pollutantData = [
                    { name: 'PM 2.5', index: 'pm2_5', level: getPollutantLevel(data.pm2_5), concentration: data.pm2_5 },
                    { name: 'PM 10', index: 'pm10', level: getPollutantLevel(data.pm10), concentration: data.pm10 },
                    { name: 'O3', index: 'o3', level: getPollutantLevel(data.o3), concentration: data.o3 },
                    { name: 'NO2', index: 'no2', level: getPollutantLevel(data.no2), concentration: data.no2 },
                    { name: 'SO2', index: 'so2', level: getPollutantLevel(data.so2), concentration: data.so2 }
                ];
                setPollutants(pollutantData);

                const highest = pollutantData.reduce((prev, current) => (prev.concentration > current.concentration) ? prev : current);
                setHighestPollutant(highest);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const getPollutantLevel = (value) => {
        if (value <= 50) return "Good";
        else if (value <= 100) return "Fair";
        else if (value <= 150) return "Moderate";
        else if (value <= 200) return "Poor";
        else return "Very Poor";
    };
    const getAQIImage = (level) => {
        switch (level) {
            case "Good":
                return AQIImages[0];
            case "Fair":
                return AQIImages[1];
            case "Moderate":
                return AQIImages[2];
            case "Poor":
                return AQIImages[3];
            case "Very Poor":
                return AQIImages[4];
            default:
                return null;
        }
    };

    return (
        <>
            <Ribbon/>

            <div className="card-container">
                {highestPollutant && (

                    <Card2>
                        <div className="main_info">
                            <div className="top-line">
                                <img className="main-pollutant-image" src={getAQIImage(highestPollutant.level)}
                                     alt={`AQI${highestPollutant.level}`}/>
                                <p className="pollutant-level">{highestPollutant.level}</p>
                            </div>
                            <div>
                                <h3>Primary Pollutant:</h3>
                            </div>
                            <div>
                                <h2>{highestPollutant.name}</h2>
                            </div>
                        </div>
                    </Card2>)}

                <Card2>
                    <div className="pollutants">
                        {pollutants.map((pollutant, index) => (
                            <div className="infos" key={index}>
                                <img src={getAQIImage(pollutant.level)} alt={`AQI${pollutant.level}`}/>
                                <div className="data">
                                    <p>{pollutant.name}</p>
                                    <p>{pollutant.level}</p>
                                    <p>{pollutant.concentration} μg/m³</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card2>


            </div>


            <Forecast
                today={{
                    'hi': 10,
                    'low': 3
                }}
            />
        </>
    );
};

export default AQI;