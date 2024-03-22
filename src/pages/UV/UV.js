import React, { useEffect, useState, useRef } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Card2 from "../../components/card/card2";
import Forecast from "../../components/forecast/forecast";
import BurnTimeImage from "./BurnTime.png";
import VitaminDRadiationImage from "./VitaminDRadiation.png";
import { useGlobalState } from "../../stores/weatherState";
import './UV.css';

export default function UvPage() {

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

        const { lat, lon } = weather?.json?.city?.coord || {};

        const payload = {
            lat: lat,
            lon: lon
        };

        setWeatherData([payload]);

        fetchGeocoding(payload);
        setUvDataFetched(true);

        const prevPayload = prevPayloadRef.current;
        if (prevPayload !== null && (prevPayload.lat !== payload.lat || prevPayload.lon !== payload.lon)) {
            //console.log("Coordinates updated:", payload.lat, payload.lon);
        }
        prevPayloadRef.current = payload;

    }, [weather.json, weather.json?.city?.coord]);

    async function fetchGeocoding({lat, lon}) {
        try {
            const apiKey1 = 'openuv-1porlu38g6kk-io';

            fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
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
        } catch (error) {
            console.error("Error fetching UV data:", error);
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
