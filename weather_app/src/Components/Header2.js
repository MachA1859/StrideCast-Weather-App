import React from "react";
import { Humid } from "./Humid";
import { Pollute } from "./Pollute";
import { Rain } from "./Rain";
import { Thermometer } from "./Thermometer";
import { Uv } from "./Uv";
import { Wind } from "./Wind";
import "./style.css";

export const Box = () => {
  return (
    <div className="box">
      <div className="secondary-header">
        <div className="humidity">
          <div className="group">
            <div className="div">Humidity</div>
            <Humid className="design-component-instance-node" />
          </div>
        </div>
        <div className="air-quality">
          <div className="group-2">
            <div className="text-wrapper-2">Air Quality</div>
            <Pollute className="design-component-instance-node" />
          </div>
        </div>
        <div className="wind-wrapper">
          <div className="wind-2">
            <div className="text-wrapper-3">Wind</div>
            <Wind className="design-component-instance-node" />
          </div>
        </div>
        <div className="uv-wrapper">
          <Uv UV="image.png" className="uv-instance" />
        </div>
        <div className="precipitation">
          <div className="group-3">
            <div className="text-wrapper-4">Precipitation</div>
            <Rain className="design-component-instance-node" />
          </div>
        </div>
        <div className="temperature">
          <div className="group-4">
            <div className="text-wrapper-5">Temperature</div>
            <Thermometer className="design-component-instance-node" />
          </div>
        </div>
      </div>
    </div>
  );
};