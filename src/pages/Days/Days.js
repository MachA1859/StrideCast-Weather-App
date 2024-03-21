import { useEffect, useState } from "react";
import {Ribbon} from "../../components/ribbon/ribbon";
import Card2 from "../../components/card/card2";
import Forecast from "../../components/forecast/forecast";

import backpack from "./backpack.png";

import "./Days.css"
import axios from 'axios';

const Images = [backpack];

const apiKey = "ca5e7726e301724c181570c7c9883465";
const londonWeatherUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric";
const londonHourlyTempUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric";

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

        const fetchLeafletRoute1 = async () => {
            try {
                // Leaflet route planner 1 API call
                setLeafletRoute1("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
            } catch (error) {
                console.error("Error fetching leaflet route planner 1 data:", error);
            }
        };

        const fetchLeafletRoute2 = async () => {
            try {
                // Leaflet route planner 2 API call
                setLeafletRoute2("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
            } catch (error) {
                console.error("Error fetching leaflet route planner 2 data:", error);
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
        fetchLeafletRoute1();
        fetchLeafletRoute2();
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
                {/* Render steps, km, calorie goal data */}
                {/* Use values from 'stepsData' state */}
            </Card2>

            <Card2>
                <h3>Essentials</h3>
                    <ul>
                        {/* Render suggestions based on weather */}
                        {/* Use values from 'essentials' state */}
                    </ul>
                <img src={"./backpack.png"} alt={"Backpack"} />
            </Card2>

            <Card2>
                <div id="map">
                    <a href="https://www.openstreetmap.org/copyright"/>
                </div>
            </Card2>

            <Card2>
                <h3>Info</h3>
                <p>{weatherInfo}</p>
            </Card2>

            
        </>
    );
};

export default DayPage;