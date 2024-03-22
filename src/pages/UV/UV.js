
import React, { useEffect, useState, useRef } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Card2 from "../../components/card/card2";
import Forecast from "../../components/forecast/forecast";
import BurnTimeImage from "./BurnTime.png";
import VitaminDRadiationImage from "./VitaminDRadiation.png";
import { useGlobalState } from "../../stores/weatherState";
import './UV.css';

export default function UvPage() {
    const apiKey = "37e1e972493bca166c0cc3a7551113ac";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=dubai";

    const [uvData, setUvData] = useState(null);
    const [weatherData, setWeatherData] = useState([]);
    const [weather] = useGlobalState();
    const [uvDataFetched, setUvDataFetched] = useState(false);
    const prevPayloadRef = useRef(null);

    useEffect(() => {
        if (weather.json === undefined || weather.json.city === undefined) {
            setWeatherData([]);
            return;
        }

        const payload = {
            city: weather.json.city.name
        };

        setWeatherData([payload]);

        const city = payload.city;
        fetchGeocoding({city});
        setUvDataFetched(true);

        const prevPayload = prevPayloadRef.current;
        if (prevPayload !== null && prevPayload.city !== payload.city) {
            //console.log("City updated:", payload.city);
        }
        prevPayloadRef.current = payload;

    }, [weather.json, weather.json?.city?.name]);

    async function fetchGeocoding({city}) {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(city)}`, {
                headers: {
                    'X-Api-Key': 'IxMtDu2Q0+aQ+6ozaq75tA==c89tkAozKKBvqCCt'
                }
            });
            const data = await response.json();
            //console.log("Data=",data);
            //console.log("Lon+lat",data[0].latitude,data[0].longitude)
            const apiKey1 = 'openuv-1porlu2ycciw-io';
            const latitude = data[0].latitude;
            const longitude = data[0].longitude;

            fetch(`https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': apiKey1
                },
            })
                .then(res => res.json())
                .then(data => {
                    //console.log("UVI",data);
                    setUvData(data);
                    setUvDataFetched(true);
                })
                .catch(err => console.log(err));
            return data;
        } catch (error) {
            console.error("Error fetching geocoding data:", error);
            return null;
        }
    }

    function displayUvName() {
        if (!uvData) return;

        let uVName = "";
        let colour = "";
        if (uvData.result.uv_max < 3) {
            uVName = "Low";
            colour = "Green";
        } else if (uvData.result.uv_max >= 3 && uvData.result.uv_max < 6) {
            uVName = "Moderate";
            colour = "Yellow";
        } else if (uvData.result.uv_max >= 6 && uvData.result.uv_max < 8) {
            uVName = "High";
            colour = "Orange";
        } else if (uvData.result.uv_max >= 8 && uvData.result.uv_max < 11) {
            uVName = "Very High";
            colour = "Red";
        } else if (uvData.result.uv_max >= 11) {
            uVName = "Extreme";
            colour = "Violet";
        }
        return <p>UV Level Name: {uVName}, UV Colour: {colour}</p>;
    }

    function displayUvSuggestions() {
        if (!uvData) return;

        let suggestions = "";
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
        return suggestions;
    }

    return (
        <>
            <Ribbon/>

            <Card2>
                <div className="rainchart">
                </div>
                <div className="current-uv">
                    <p>Current UV: {uvData ? uvData.result.uv_max : 'Loading...'}</p>
                    {displayUvName()}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={BurnTimeImage} alt="Burn Time Calculation" width={600} height={220} style={{ marginRight: '10px', width: '50%', height: '50%' }}/>
                        <img src={VitaminDRadiationImage} alt="Minutes for sunlight exposure for sufficient Vitamin D intake" width={600} height={250} style={{ width: '50%', height: '50%' }}/>
                    </div>
                </div>
            </Card2>

            <Forecast
                today={{
                    uv_max: uvData ? uvData.result.uv_max : null
                }}
                suggestions={displayUvSuggestions()}
            />
        </>
    );
}
