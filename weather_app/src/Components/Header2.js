import React from "react";
import "./Header2.css";

export const Box = () => {
  return (
    <div className="box">
      <div className="secondary-header">
        <div className="humidity">
          <div className="group">
            <div className="div">Humidity</div>
            <img className="Humid" alt="Humid" src="../Image/humid.png"/>
          </div>
        </div>
        <div className="air-quality">
          <div className="group-2">
            <div className="text-wrapper-2">Air Quality</div>
            <img className="Pollute" alt="Pollute" src="../Image/pollute.png"/>
          </div>
        </div>
        <div className="wind-wrapper">
          <div className="wind-2">
            <div className="text-wrapper-3">Wind</div>
            <img className="Wind" alt="Wind" src="../Image/wind.png"/>
          </div>
        </div>
        <div className="uv-wrapper">
          <img className="UV" alt="UV" src="../Image/UV.png"/>
        </div>
        <div className="precipitation">
          <div className="group-3">
            <div className="text-wrapper-4">Precipitation</div>
            <img className="rain" alt="Rain" src="../Image/rain.png"/>
          </div>
        </div>
        <div className="temperature">
          <div className="group-4">
            <div className="text-wrapper-5">Temperature</div>
            <img className="Thermometer" alt="Thermometer" src="../Image/thermometer.png"/>
          </div>
        </div>
      </div>
    </div>
  );
};