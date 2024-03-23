import {useEffect, useState} from "react";
import {useGlobalState} from "../../stores/weatherState";
import Card2 from "../../components/card/card2";
import './home.css'

//images
import backpack from "./pic/backpack.png";
import location from "./pic/location-pin.png";
import shoe from "./pic/shoe.png";
import Caution from "./pic/Caution.png";


//leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";


export default function HomePage() {
    const [weatherData, setWeatherData] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({});
    const [weather, dispatch] = useGlobalState();
    const [essentials, setEssentials] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState([]);

    // Generate essentials based on weather and temperature
    const generateEssentials = (weather, temperature) => {
        let essentials = [];
        if (weather === "Clear") {
            essentials.push("Apply Sunscreen");
            essentials.push("Bring Sunglasses");
        }
        if (weather === "Rain") {
            essentials.push("Bring Dry Clothes");
            essentials.push("Bring Towel");
        }
        if (weather === "Clouds") {
            essentials.push("Wear brightly colored or reflective clothing, as might be dark.");
        }
        if (weather === "Snow") {
            essentials.push("Dress in layers to stay warm while allowing sweat to evaporate.");
            essentials.push("moisture-wicking fabrics close to your skin to keep you dry");
            essentials.push("moisture-wicking socks and waterproof or water-resistant gloves to keep your feet and hands dry");
        }

        if (temperature > 30) {
            essentials.push("Water Bottle");
        }
        if (temperature < 20) {
            essentials.push("Bring Jacket");
        }
        return essentials;
    };

    // Generate weather info based on weather data
    const generateWeatherInfo = (weatherData) => {
        let info = [];
        let rainStart = null;
        let rainEnd = null;

        for (let i = 0; i < weatherData.length; i++) {
            if (weatherData[i].weather === "Rain") {
                if (!rainStart) {
                    rainStart = weatherData[i].time;
                }
                rainEnd = weatherData[i].time;
            } else if (rainStart) {
                info.push(`It may rain from ${rainStart} to ${rainEnd}`);
                rainStart = null;
                rainEnd = null;
            }

            if (weatherData[i].weather === "Clear") {
                info.push("Sunny conditions will continue for the rest of the day");
            }

            if (weatherData[i].wind > 7) {
                info.push(`Wind gusts are up to ${weatherData[i].wind.speed} mph`);
            }

            if (weatherData[i].pop > 0) {
                info.push(`Chance of precipitation at ${weatherData[i].time} is ${weatherData[i].pop * 100}%`);
            }
        }

        return info;
    };



    useEffect(() => {
        if (weather.json === undefined) {
            setWeatherData([])
            return
        }

        const hourly = []
        const first12Data = weather.json.list.slice(0, 12);
        for (let i = 0; i < first12Data.length; i++) {
            const dt = new Date(first12Data[i].dt_txt)
            const hours = dt.getHours();
            const minutes = dt.getMinutes();
            const timeString = `${hours}:${minutes}`;
            const payload = {
                weather: first12Data[i].weather[0].main,
                tempearature: first12Data[i].main.temp,
                city: weather.json.city.name,
                time: timeString
            }
            hourly.push(payload)
        }

        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const current = {
            week: weekDays[new Date().getDay()],
            city: weather.json.city.name,
            temperature: weather.json.list[0].main.temp,
            weather: weather.json.list[0].weather[0].main,
            maxTemp: Math.max(...hourly.map(item => item.tempearature)),
            minTemp: Math.min(...hourly.map(item => item.tempearature))
        }

        setWeatherData(hourly.sort((a, b) => new Date(a.time) - new Date(b.time)))
        setCurrentWeather(current);
        setEssentials(generateEssentials(current.weather, current.temperature));
        setWeatherInfo(generateWeatherInfo(weatherData));
    }, [weather.json]);

    // Define your markers array
    const markers = [
        {
            geocode: [51.507351, -0.127758],
            popUp: "start location",
        },
        {
            geocode: [51.5131, -0.1387],
            popUp: "destination",
        },
    ];

    // Define your customIcon
    const customIcon = new L.Icon({
        iconUrl: location,
        iconSize: [38, 38],
    });

    // Define your createCustomClusterIcon function
    const createCustomClusterIcon = (cluster) => {
        return new L.divIcon({
            html: `<div class= "cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: L.point(33, 33, true),
        });
    };


    const days = weatherData.map((payload, index) => {
        let logo;
        const day = payload.weather;
        const time = payload.time;
        const temp = payload.tempearature;

        if (day === "Clear") {
            logo = './icons/sun.png'
        } else if (day === 'Clouds') {
            logo = './icons/cloudy.png'
        } else if (day === 'Rain') {
            logo = './icons/raining.png'
        } else if (day === 'thunder') {
            logo = './icons/thunder.png'
        } else if (day === 'snowy') {
            logo = './icons/snow.png'
        }


//html
        return (
            <div className="Hourly-card" key={index}>
                <p>{time}0</p>
                <img className="weather-icon" src={logo} alt={day}/>
                <p>{temp}°C</p>
            </div>
        );
    });


    return (
        <div className="container">
            <div className="current">
                <p className="week">{currentWeather.week}</p>
                <p className="city"> {currentWeather.city}</p>
                <p className="temp">{currentWeather.temperature}°C</p>
                <p className="weather">{currentWeather.weather}</p>
                <p className="maxmin">H: {currentWeather.maxTemp}°C | L: {currentWeather.minTemp}°C</p>
            </div>

            <div className="forecast">
                <Card2>
                    <div className="Forecast">
                        {days}
                    </div>
                </Card2>
            </div>

            <div className="Essentials">
                <Card2>
                    <h3>Essentials</h3>
                    <ul>
                        {essentials.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <img src={backpack} alt="Backpack" className="icon"/>
                </Card2>
            </div>
            <div className="Steps">
                <Card2>
                    <h3>Steps</h3>
                    <ul>
                        <li>Steps: 1000</li>
                        <li>Goal: 5000</li>
                        <li>Calories: 100</li>
                    </ul>
                    <img src={shoe} alt={"Shoe"}/>
                </Card2>
            </div>
            <div className="Info">
                <Card2>
                    <h3>Info</h3>
                    <ul>
                        <div className="info-content">
                            {weatherInfo.map((info, index) => (
                                <p key={index}>{info}</p>
                            ))}
                        </div>
                    </ul>

                    <img src={Caution} alt="Caution" className="icon"/>
                </Card2>
            </div>
            <div className="Route Planner">
                <Card2>
                    <MapContainer center={[51.507351, -0.127758]} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MarkerClusterGroup
                            chunckedLoading
                            iconCreateFunction={createCustomClusterIcon}
                        >
                            {markers.map((marker) => (
                                <Marker position={marker.geocode} icon={customIcon}>
                                    <Popup>{marker.popUp}</Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>
                </Card2>
            </div>
        </div>
    )
}
let DefaultIcon = L.icon({
    iconUrl: require("../home/pic/location-pin.png"),
    iconSize: [38, 38],
});
L.Marker.prototype.options.icon = DefaultIcon;
L.Marker.prototype.options.icon = DefaultIcon;

