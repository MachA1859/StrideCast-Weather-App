import { useEffect, useState } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card2 from "../../components/card/card2";
import {useGlobalState} from "../../stores/weatherState";
import './Wind.css';

export default function WindSpeedPage() {
    const apiKey = "37e1e972493bca166c0cc3a7551113ac";
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=dubai";
    const windMapUrl = "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=windspeed&lat=35.1738&lon=12.6563&zoom=3";

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
    const currentWind = weatherData && weatherData.length > 0 ? weatherData[0].wind.speed : null;

    let suggestions = "";
    let windName="";
    if (currentWind >= 1 && currentWind <= 7) {
        suggestions = "This wind speed is generally comfortable for outdoor activities like running. Wear appropriate clothing that allows for ventilation to prevent overheating. Consider wearing a lightweight windbreaker or jacket if the breeze feels chilly.";
        windName="Light Breeze";
    } else if (currentWind >= 8 && currentWind <= 18) {
        suggestions = "Be cautious of potential wind chill effects, especially if the temperature is cool. Dress in layers to adjust your clothing as needed during your run. Stay hydrated, as wind can increase evaporation from your skin, leading to dehydration.";
        windName="Moderate Breeze";
    } else if (currentWind >= 19 && currentWind <= 24) {
        suggestions = "Be prepared for more resistance while running, as the wind may slow you down. Consider adjusting your route to start against the wind and finish with it at your back. Wear snug-fitting clothing to reduce wind resistance and maintain body heat.";
        windName="Fresh Breeze";
    } else if (currentWind >= 25 && currentWind <= 31) {
        suggestions = "Be cautious of potential gusts, which can affect your balance and stability. Consider shortening your run or finding a sheltered route if the wind becomes too challenging. Be mindful of flying debris or loose objects that may be blown around.";
        windName="Strong Breeze";
    } else if (currentWind >= 32) {
        suggestions = "Consider postponing your run if the wind speed is excessively high, as it can pose safety risks. If you choose to proceed, be extremely cautious and aware of your surroundings. Wear protective eyewear to shield your eyes from dust, debris, or blowing particles. Stay away from open areas, tall trees, or structures that may be vulnerable to falling branches or objects.";
        windName="High Wind";
    }

    return (
        <>
            <Ribbon />
            <Card2>
                <div>
                    <p>Current Windspeed: {currentWind}mph</p>
                    <p>Breeze type: {windName}</p>
                </div>
            </Card2>
            <Card2>
                <iframe
                    src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=windspeed&lat=35.1738&lon=12.6563&zoom=3"
                    title="Wind Speed Map"
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </Card2>

            <Forecast
                suggestions={suggestions}
            />
        </>
    );
}
