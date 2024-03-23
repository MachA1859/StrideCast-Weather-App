import React, { useEffect, useState } from 'react';
import {useGlobalState} from "../../stores/weatherState";
import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import HumidityChart from "./Humiditychart";

// This page displays the humidity chart and a forecast based on the current humidity
export default function HumidityPage() {
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
            console.log(today)
            setWeatherData(today)
        }

    }, [weather.json])

    // Assuming the current humidity is the first item in the weatherData array
    const currentHumidity = weatherData && weatherData.length > 0 ? weatherData[0].main.humidity : null;

    let suggestions = "";
    if (currentHumidity > 0.6) {
        suggestions = "Today has high humidity";
    } else if (currentHumidity > 0.4) {
        suggestions = "Today has moderate humidity, best for running";
    } else if (currentHumidity <= 0.2) {
        suggestions = "It is dry, take care";
    }

    return (
        <>
            <Ribbon/>

            <Card>
                <HumidityChart/>
            </Card>

            <Forecast
                suggestions={suggestions}
            />
        </>
    )
}