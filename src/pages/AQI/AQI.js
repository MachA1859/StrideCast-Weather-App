
import { useEffect, useState } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Card2 from "../../components/card/card2";
import Forecast from "../../components/forecast/forecast";
import { useGlobalState } from "../../stores/weatherState";

import AQI1 from "./AQI1.png";
import AQI2 from "./AQI2.png";
import AQI3 from "./AQI3.png";
import AQI4 from "./AQI4.png";
import AQI5 from "./AQI5.png";

import "./AQI.css";
import axios from 'axios';

const AQIImages = [AQI1, AQI2, AQI3, AQI4, AQI5];

const apiKey = "ca5e7726e301724c181570c7c9883465";

const AQI = () => {
    const [pollutants, setPollutants] = useState([]);
    const [highestPollutant, setHighestPollutant] = useState(null);
    const [suggestions, setSuggestions] = useState("Be careful of the pollutants around you and be extra careful if you have breathing difficulties.");
    const [weather] = useGlobalState();
    const { lat, lon } = weather?.json?.city?.coord || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                console.log(response.data);
                const data = response.data.list[0].components;

                const pollutantData = [
                    { name: 'PM 2.5', index: 'pm2_5', level: getPollutantLevel(data.pm2_5), concentration: data.pm2_5 },
                    { name: 'PM 10', index: 'pm10', level: getPollutantLevel(data.pm10), concentration: data.pm10 },
                    { name: 'O3', index: 'o3', level: getPollutantLevel(data.o3), concentration: data.o3 },
                    { name: 'NO2', index: 'no2', level: getPollutantLevel(data.no2), concentration: data.no2 },
                    { name: 'SO2', index: 'so2', level: getPollutantLevel(data.so2), concentration: data.so2 }
                ];
                setPollutants(pollutantData);
                console(pollutantData);
                const highest = pollutantData.reduce((prev, current) => (prev.concentration > current.concentration) ? prev : current);
                setHighestPollutant(highest);

                // Set suggestions here
                setSuggestions(displayPm25(highest.name, highest.concentration));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [lat, lon]);

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
                                    {/* Display suggestions directly in AQI page */}
                                    {displayPm25(pollutant.name, pollutant.concentration)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card2>
            </div>

            <Forecast
                suggestions={suggestions}
            />
        </>
    );
};

export default AQI;

// Moved displayPm25 outside of component
function displayPm25(type, concentration) {
    var suggestions = "";
    if (type === "PM 2.5") {
        if (concentration < 12) {
            suggestions += "Suggestions: Air quality is good. It's safe to run.\n";
        } else if (concentration >= 12 && concentration < 35.5) {
            suggestions += "Suggestions: Air quality is moderate. Consider reducing intensity or duration of the run.\n";
        } else if (concentration >= 35.5 && concentration < 55.5) {
            suggestions += "Suggestions: Air quality is unhealthy for sensitive groups. Reduce prolonged or heavy exertion.\n";
        } else if (concentration >= 55.5 && concentration < 150.5) {
            suggestions += "Suggestions: Air quality is unhealthy. Reduce outdoor activities, especially strenuous exercise.\n";
        } else if (concentration >= 150.5 && concentration < 250.5) {
            suggestions += "Suggestions: Air quality is very unhealthy. Avoid outdoor activities, including running.\n";
        } else {
            suggestions += "Suggestions: Air quality is hazardous. Avoid all outdoor physical activities, including running.\n";
        }
    }
    return suggestions;
}

