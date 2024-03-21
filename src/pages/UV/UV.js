
import { useEffect, useState } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Card from "../../components/card/card";
import Forecast from "../../components/forecast/forecast";
import BurnTimeImage from "./BurnTime.png";
import VitaminDRadiationImage from "./VitaminDRadiation.png";

export default function UvPage() {
    // Define apiKey and apiUrl outside of the component function
    const apiKey = "37e1e972493bca166c0cc3a7551113ac";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=dubai";

    // Define state to store weather data
    const [weatherData, setWeatherData] = useState(null);
    const [uvData, setUvData] = useState(null);

    // Define getWeather function outside of the component function
    async function getWeather() {
        try {
            const response = await fetch(apiUrl + '&appid=' + apiKey);
            const data = await response.json();
            setWeatherData(data); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // Fetch UV data using useEffect
    useEffect(() => {
        const apiKey1 = 'openuv-g95nqhrlu00311i-io';
        const latitude = 51.1;
        const longitude = -0.11;

        fetch(`https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': apiKey1
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUvData(data); // Update state with UV data
        })
        .catch(err => console.log(err));
    }, []); // Empty dependency array to run once when component mounts

    // Function to display UV level name
    function displayUvName() {
        if (!uvData) return; // Return if uvData is not available yet

        let uVName = "";
        let colour=""
        if (uvData.result.uv_max < 3) {
            uVName = "Low";
            colour="Green"
        } else if (uvData.result.uv_max >= 3 && uvData.result.uv_max < 6) {
            uVName = "Moderate";
            colour="Yellow"
        } else if (uvData.result.uv_max >= 6 && uvData.result.uv_max < 8) {
            uVName = "High";
            colour="Orange"
        } else if (uvData.result.uv_max >= 8 && uvData.result.uv_max < 11) {
            uVName = "Very High";
            colour="Red"
        } else if (uvData.result.uv_max >= 11) {
            uVName = "Extreme";
            colour="Violet"
        }
        return <p>UV Level Name: {uVName}, UV Colour: {colour}</p>;
    }

    function displayUvSuggestions() {
        if (!uvData) return; // Return if uvData is not available yet

        let suggestions="";
        if (uvData.result.uv_max < 3) {
            suggestions = "SPF 15 sunscreen is usually sufficient for short periods of time outdoors. Look for broad-spectrum protection to shield against both UVA and UVB rays.";
        } else if (uvData.result.uv_max >= 3 && uvData.result.uv_max < 6) {
            suggestions = "SPF 30 sunscreen is recommended, especially for fair-skinned individuals. Apply sunscreen generously, and reapply every 2 hours or more frequently if sweating or swimming.";
        } else if (uvData.result.uv_max >= 6 && uvData.result.uv_max < 8) {
            suggestions = "Use SPF 30 or higher sunscreen.Consider seeking shade during peak sunlight hours (usually between 10 am and 4 pm).";
        } else if (uvData.result.uv_max >= 8 && uvData.result.uv_max < 11) {
            suggestions = "Opt for SPF 50+ sunscreen.Wear protective clothing, sunglasses, and wide-brimmed hats in addition to sunscreen.";
        } else if (uvData.result.uv_max >= 11) {
            suggestions = "Use SPF 50+ sunscreen with broad-spectrum protection.Limit outdoor activities during peak sunlight hours, and seek shade whenever possible";
        }
        return suggestions
    }


    // Call getWeather when the component mounts
    useEffect(() => {
        getWeather();
    }, []);

    return (
        <>
            <Ribbon/>

            <Card>
                <div className="rainchart">
                </div>
                <div className="current-uv">
                    Current UV: {uvData ? uvData.result.uv_max : 'Loading...'}
                    {displayUvName()}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={BurnTimeImage} alt="Burn Time Calculation" width={600} height={220} style={{ marginRight: '10px', width: '50%', height: '50%' }}/>
                            <img src={VitaminDRadiationImage} alt="Minutes for sunlight exposure for sufficient Vitamin D intake" width={600} height={250} style={{ width: '50%', height: '50%' }}/>
                    </div>
                </div>
            </Card>

            <Forecast
                today={{
                    hi: weatherData ? weatherData.main.temp_max : null, // Access temperature from weatherData
                    low: weatherData ? weatherData.main.temp_min : null, // Access temperature from weatherData
                    uv_max: uvData ? uvData.result.uv_max : null // Access UV max data
                }} 
                suggestions={displayUvSuggestions()}
            />
        </>
    )
}
