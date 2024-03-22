import { useEffect, useState } from "react";
import {Ribbon} from "../../components/ribbon/ribbon";
import Card2 from "../../components/card/card2";
import Forecast from "../../components/forecast/forecast";

import backpack from "./backpack.png";

import "./Days.css"
import axios from 'axios';
//leaflet
import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Images = [backpack];

const apiKey = "c0b5d0fcf8e510256c18eded3d9c33f6";
const londonWeatherUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric&cnt=24";
const londonHourlyTempUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric&cnt=24";

const leafletRoutePlanner1 = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const leafletRoutePlanner2 = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const DayPage = () => {
    const [hourlyTemp, setHourlyTemp] = useState([]);
    const [stepsData, setStepsData] = useState([]);
    const [essentials, setEssentials] = useState([]);
    const [leafletRoute1, setLeafletRoute1] = useState([]);
    const [leafletRoute2, setLeafletRoute2] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState([]);

    useEffect(() => {
        const fetchHourlyTemp = async () => {
            try {
                const response = await axios.get(`${londonHourlyTempUrl}&appid=${apiKey}`);
                const tempData = response.data.list.map(item => ({ hour: item.dt_txt.split(' ')[1], temp: item.main.temp }));
                setHourlyTemp(tempData);
            } catch (error) {
                console.error("Error fetching hourly temperature data:", error);
            }
        };

        const fetchWeatherInfo = async () => {
            try {
                const response = await axios.get(`${londonWeatherUrl}&appid=${apiKey}`);
                // Extract relevant weather info and set state
                setWeatherInfo(response.data.weather[0].description);
            } catch (error) {
                console.error("Error fetching weather info:", error);
            }
        };
        
        fetchHourlyTemp();
        fetchWeatherInfo();

    }, []);

    return (
        <>
            <Ribbon/>

            <Card2>
            {/* runningTime */}
            </Card2>

            {hourlyTemp.map((data, index) => (
                <Card2>
                    <div key={index}>
                        <p>{data.hour}</p>
                        <p>{data.temp}°C</p>
                    </div>
                </Card2>
            ))}
            

            <Card2>
                <div>
                    {/* Render steps, km, calorie goal data */}
                    {/* Use values from 'stepsData' state */}
                </div>
            </Card2>

            <Card2>
                <div>
                    <h3>Essentials</h3>
                        <ul>
                            {/* Render suggestions based on weather */}
                            {/* Use values from 'essentials' state */}
                        </ul>
                    <img src={"./backpack.png"} alt={"Backpack"} />
                </div>
            </Card2>

            <Card2>
                <MapContainer center={[51.507351, -0.127758]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </Card2>

            <Card2>
                <div>
                    <h3>Info</h3>
                    <p>{weatherInfo}</p>
                </div>
            </Card2>

            
        </>
    );
};

export default DayPage;