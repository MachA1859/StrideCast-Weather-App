import React, { useEffect, useState } from 'react';
import {useGlobalState} from "../../stores/weatherState";
import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import TempChart from "./Tempchart";

export default function TemperaturePage() {
    const [weatherData, setWeatherData] = useState(null);
    const [weather] = useGlobalState();

    useEffect(() => {
        if(weather.json===undefined){
            setWeatherData([])

        }
        else {
            const today=[]
            for(let i=0;i<weather.json.list.length;i++){
                const dt= new Date(weather.json.list[i].dt_txt)
                const now= new Date()
                if(now.getDate()===dt.getDate())
                    today.push(weather.json.list[i])
            }
            setWeatherData(today)
        }

    }, [weather.json])

    // Assuming the current temperature is the first item in the weatherData array
    const currentTemp = weatherData && weatherData.length > 0 ? weatherData[0].main.temp : null;

    let suggestions = "";
    if (currentTemp >= 30) {
        suggestions = "It is very hot outside, " +
            "stay hydrated and avoid running during peak hours";
    } else if (currentTemp >= 20 && currentTemp < 30) {
        suggestions = "It is quite warm outside, " +
            "wear light clothing and stay hydrated";
    }
    else if (currentTemp >= 10 && currentTemp < 20) {
        suggestions = "It is cool outside, " +
            "wear a light jacket during warm up and stay warm";
    }
    else if (currentTemp >= 0 && currentTemp < 10) {
        suggestions = "It is quite cold outside, " +
            "remember to stay warm,do some warm up before running"
    }
    else if (currentTemp < 0) {
        suggestions = "It is freezing outside, " +
            "keep warm,don't catch a cold after running";
    }

    return (
        <>
            <Ribbon/>

            <Card>
                <TempChart/>
            </Card>

            <Forecast
                suggestions={suggestions}
            />
        </>
    )
}