import React, { useEffect, useState } from 'react';
import {useGlobalState} from "../../stores/weatherState";
import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import RainChart from "./Rainchart";

export default function PercipitationPage() {
    const [weatherData, setWeatherData] = useState(null);
    const [weather] = useGlobalState();

    useEffect(() => {
        if (weather.json === undefined) {
            setWeatherData([])

        } else {
            const today = []
            for (let i = 0; i < weather.json.list.length; i++) {
                const dt = new Date(weather.json.list[i].dt_txt)
                const now = new Date()
                if (now.getDate() === dt.getDate())
                    today.push(weather.json.list[i])
            }
            console.log(today)
            setWeatherData(today)
        }

    }, [weather.json])

    let rainForecast = "";
    let bringClothes = false;
    if (weatherData) {
        for (let i = 0; i < weatherData.length; i++) {
            const dt = new Date(weatherData[i].dt_txt);
            const time = `${dt.getHours()}`;
            if (weatherData[i].pop >= 0.2 && weatherData[i].pop < 0.5) {
                rainForecast += `At ${time}, there is a small chance of rain.\n`;
                bringClothes = true;
            } else if (weatherData[i].pop >= 0.5 && weatherData[i].pop < 1) {
                rainForecast += `At ${time}, there is a moderate chance of rain.\n`;
                bringClothes = true;
            } else if (weatherData[i].pop === 1) {
                rainForecast += `At ${time} 0, there is a high chance of rain.\n`;
                bringClothes = true;
            }
        }
        if (bringClothes) {
            rainForecast += "Remember to bring dry clothes to change.\n";
        }


        return (
            <>
                <Ribbon/>

                <Card>
                    <RainChart/>
                </Card>

                <Forecast
                    suggestions={rainForecast}
                />
            </>
        )
    }
}
