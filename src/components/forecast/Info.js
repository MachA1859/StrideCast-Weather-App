import Card2 from "../card/card2";
import './Info.css'
import { useState, useEffect } from "react";
import {useGlobalState} from "../../stores/weatherState";


export default function ForecastSuggestions({ suggestions }) {
    const [weather,dispatch] = useGlobalState();
    const[weatherData,setWeatherData]=useState({ maxTemp: null, minTemp: null })
    useEffect(() => {
        if (weather.json !== undefined) {
            let maxTemp = -Infinity;
            let minTemp = Infinity;

            for (let i = 0; i < weather.json.list.length; i++) {
                const forecast = weather.json.list[i];
                if (forecast.main.temp_max > maxTemp) {
                    maxTemp = forecast.main.temp_max;
                }
                if (forecast.main.temp_min < minTemp) {
                    minTemp = forecast.main.temp_min;
                }
            }

            setWeatherData({ maxTemp, minTemp });
        }
    }, [weather.json]);

    return (
            <div className="Info">
                <Card2>
                    <div className="Temp">
                        <p>Today</p>
                        <p> High: {weatherData.maxTemp}°C | Low: {weatherData.minTemp} °C </p>
                    </div>
                </Card2>

                <Card2>
                    <div className="Suggestions">
                        <p>Suggestions:</p>
                        <p>{suggestions}</p>
                    </div>
                </Card2>
            </div>
    )
}
