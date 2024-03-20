/*import {Ribbon} from "../../components/ribbon/ribbon";

export default function WindSpeedPage() {
    return (
        <div>
            <h1>Wind Speed</h1>
            <Ribbon/>
        </div>
    )
}
*/
import { useEffect, useState } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Card from "../../components/card/card";
import Forecast from "../../components/forecast/forecast";

export default function WindSpeedPage() {
    const apiKey = "37e1e972493bca166c0cc3a7551113ac";
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=dubai";
    const windMapUrl = "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=windspeed&lat=35.1738&lon=12.6563&zoom=3";

    const [weatherData, setWeatherData] = useState(null);
    const [windData, setWindData] = useState(null);

    async function fetchWeather() {
        try {
            const response = await fetch(weatherApiUrl + '&appid=' + apiKey);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, []);

    useEffect(() => {
        const uvApiKey = 'openuv-3yquj97rltx0biz4-io';
        const latitude = 51.1;
        const longitude = -0.11;

        fetch(windMapUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': uvApiKey
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setWindData(data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <>
            <Ribbon />
                <iframe
                    src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=windspeed&lat=35.1738&lon=12.6563&zoom=3"
                    title="Wind Speed Map"
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>

            <Forecast 
                daily={[
                    'sunny',
                    'rainy',
                    'thunder', 
                    'sunny', 
                    'sunny', 
                    'sunny', 
                    'sunny'
                ]} 
                today={{
                    hi: weatherData ? weatherData.main.temp_max : null,
                    low: weatherData ? weatherData.main.temp_min : null,
                }} 
            />
        </>
    );
}

