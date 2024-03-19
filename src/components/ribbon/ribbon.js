import React from "react";

import "./ribbon.css"

export const Ribbon = () => {
  return (
    <div className="ribbon">
        <a className="item" href="/temperature">
            <img src="./icons/thermometer.png" alt="temperature"/>
            <span>Temperature</span>
        </a>
        <a className="item" href="/precipitation">
            <img src="./icons/rain.png" alt="rain"/>
            <span>Precipitation</span>
        </a>
        <a className="item" href="/uv">
            <img src="./icons/uv.png" alt="uv"/>
            <span>UV</span>
        </a>
        <a className="item" href="/wind">
            <img src="./icons/wind.png" alt="wind"/>
            <span>Wind</span>
        </a>
        <a className="item" href="/aqi">
            <img src="./icons/pollute.png" alt="AQI"/>
            <span>Air Quality</span>
        </a>
        <a className="item" href="/humidity">
            <img src="./icons/humid.png" alt="humidity"/>
            <span>Humidity</span>
        </a>
    </div>
  );
};