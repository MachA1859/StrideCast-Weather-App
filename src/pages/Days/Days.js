import { useEffect, useState } from "react";
import Card2 from "../../components/card/card2";
import "./Days.css"
import axios from 'axios';
import routeMap from "./routeMap";

//images
import backpack from "./backpack.png";
import location from "./location-pin.png";

//leaflet
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./routeMap.css";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useMap } from "react-leaflet";

const apiKey = "c0b5d0fcf8e510256c18eded3d9c33f6";
const londonWeatherUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric&cnt=12";
const londonHourlyTempUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric&cnt=12";


const DayPage = () => {
    const [hourlyTemp, setHourlyTemp] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState([]);
    const [location1, setLocation1] = useState([]);
    const [location2, setLocation2] = useState([]);

    const [LocationInfo1, setLocationInfo1] = useState([]);
    const [LocationInfo2, setLocationInfo2] = useState([]);

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
        fetchLocationInfo();

    }, []);

    const fetchLocationInfo = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location1}&units=metric&appid=c0b5d0fcf8e510256c18eded3d9c33f6`);
            // Extract relevant weather info and set state
            setLocationInfo1(response.data);
        } catch (error) {
            console.error("Error fetching weather info:", error);
        }
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location2}&units=metric&appid=c0b5d0fcf8e510256c18eded3d9c33f6`);
            // Extract relevant weather info and set state
            setLocationInfo2(response.data);
        } catch (error) {
            console.error("Error fetching weather info:", error);
        }
    };

    // map-form
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchLocationInfo();
    };

    const handleInputChange = (event) => {
        setLocation1(event.target.value);
    };

    const handleInputChange2 = (event) => {
        setLocation2(event.target.value);
    };

    // routing
    const markers = [
        {
            geocode: [51.507351, -0.127758],
            popUp: "start location"
        },
        {
            geocode: [51.5131, -0.1387],
            popUp: "destination"
        }
    ];
/*
    const customIcon = new Icon({
        iconUrl: location,
        iconSize: [38, 38] 
    })

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class= "cluster-icon">${cluster.getChildCount()}</div>`,
            className: 'custom-marker-cluster',
            iconSize: point(33,33, true)
        });
    };
*/
    //return page
    return (
        <>
            <div className="Today">

            </div>
            <Card2>
                <div className="Runtime">

                </div>
            {/* runningTime */}
            </Card2>

            <Card2>
                <div>
                    {hourlyTemp.map((data, index) => (
                        
                            <div key={index}>
                                <p>{data.hour} {data.temp}°C</p>
                            </div>
                       
                    ))}
                </div>
            </Card2>
            

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
                    <img src={backpack} alt={"Backpack"} />
                </div>
            </Card2>

            <Card2>
            <form onSubmit={handleSubmit}>
                <div id='map-form'>
                    <input
                        type="text"
                        placeholder="Start Location"
                        value={location1}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="End Location"
                        value={location2}
                        onChange={handleInputChange2}
                    />
                    <button type="submit">Calculate Route</button>
                </div>
            </form>
                <div className="routeMap">
                <MapContainer center={[51.507351, -0.127758]} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/*<MarkerClusterGroup
                            chunckedLoading
                            iconCreateFunction={createCustomClusterIcon}
                        >
                            {markers.map(marker => (
                                <Marker position={marker.geocode} icon={customIcon}>
                                    <Popup>{marker.popUp}</Popup>
                                </Marker>
                            ))}
                            </MarkerClusterGroup>*/}
                        {
                            LocationInfo1 && LocationInfo2? (<><LeafletRoutingMachine weatherData1 = {LocationInfo1} weatherData2 = {LocationInfo2}/></>): (null)
                        }
                    </MapContainer>
                </div>
                {/*<routeMap/>*/}
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

let DefaultIcon = L.icon({
    iconUrl: require("./location-pin.png"),
    iconSize: [38, 38],
  }); 
  L.Marker.prototype.options.icon = DefaultIcon;
L.Marker.prototype.options.icon = DefaultIcon;

export default DayPage;
