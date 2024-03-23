
import { useEffect, useState } from "react";
import { Ribbon } from "../../components/ribbon/ribbon";
import Card2 from "../../components/card/card2";
import "./Days.css";
import axios from "axios";

//images
import backpack from "../home/pic/backpack.png";
import location from "../home/pic/location-pin.png";

//leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L,{ Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const apiKey = "c0b5d0fcf8e510256c18eded3d9c33f6";
const londonWeatherUrl =
  "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric&cnt=24";
const londonHourlyTempUrl =
  "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&units=metric&cnt=24";

const DayPage = () => {
  const [hourlyTemp, setHourlyTemp] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [weatherType, setWeatherType] = useState("");
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const fetchHourlyTemp = async () => {
      try {
        const response = await axios.get(
          `${londonHourlyTempUrl}&appid=${apiKey}`
        );
        const tempData = response.data.list.map((item) => ({
          hour: item.dt_txt.split(" ")[1],
          temp: item.main.temp,
        }));
        setHourlyTemp(tempData);
      } catch (error) {
        console.error("Error fetching hourly temperature data:", error);
      }
    };

    const fetchWeatherInfo = async () => {
      try {
        const response = await axios.get(
          `${londonWeatherUrl}&appid=${apiKey}`
        );
        console.log("Weather API Response:", response.data);
        // Extract relevant weather info and set state
        const weather = response.data.list[0].weather[0];
        setWeatherInfo(weather.description);
        setWeatherType(weather.main);
        setAdvice(generateAdvice(weather.main));
        console.log(weather.description);
      } catch (error) {
        console.error("Error fetching weather info:", error);
      }
    };

    const generateAdvice = (weatherType) => {
      switch (weatherType) {
        case "Clear":
          return [
            "Take sunglasses for a sunny day, apply sunscreen, and take plenty of water.",
          ];
        case "Clouds":
          return ["Wear brightly colored or reflective clothing, as might be dark."];
        case "Rain":
          return ["Wear waterproof or water-resistant clothing and waterproof shoes."];
        case "Thunder":
          return [
            "Wear reflective clothing, take your ID in case of emergency. Avoid running to be safe.",
          ];
        case "Snow":
          return [
            "Dress in layers to stay warm while allowing sweat to evaporate. Opt for moisture-wicking fabrics close to your skin to keep you dry. Consider wearing moisture-wicking socks and waterproof or water-resistant gloves to keep your feet and hands dry.",
          ];
        default:
          return [];
      }
    };

    fetchHourlyTemp();
    fetchWeatherInfo();
  }, []);

  //leaflet map markers
  //London geocode: [51.507351, -0.127758]
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

  const customIcon = new Icon({
    iconUrl: location,
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class= "cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <>
      <Ribbon />

      <Card2>{/* runningTime */}</Card2>

      <Card2>
        <div>
          {hourlyTemp.map((data, index) => (
            <div key={index}>
              <p>
                {data.hour} {data.temp}°C
              </p>
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
          <p>{advice}</p>
          <ul>
            {/* Render suggestions based on weather */}
            {/* Use values from 'essentials' state */}
          </ul>
          <img src={backpack} alt={"Backpack"} />
        </div>
      </Card2>

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

      <Card2>
        <div>
          <h3>Info</h3>
          <p>{weatherInfo}</p>
        </div>
      </Card2>
    </>
  );
};

export default  DayPage;

let DefaultIcon = L.icon({
    iconUrl: require("../home/pic/location-pin.png"),
    iconSize: [38, 38],
  }); 
  L.Marker.prototype.options.icon = DefaultIcon;
L.Marker.prototype.options.icon = DefaultIcon;

