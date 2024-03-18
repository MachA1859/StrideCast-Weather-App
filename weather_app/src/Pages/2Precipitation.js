import React from "react";
import "./Precipitation.css";
import RainChart from "./Rainchart";
export default function Precipitation({ property1, className }){
    return (
        <div className="Page">
            <div className={`header ${property1} ${className}`}>
                {property1 === "RUNNER-ICON" && (
                    <div className="overlap-group">
                        <img className="RUNNER" alt="Runner" src="../Image/RUNNER.png"/>
                        <div className="ellipse"/>
                    </div>
                )}

                {["dropdown-menu", "search-1"].includes(property1) && (
                    <img
                        className="search"
                        alt="Search"
                        src={property1 === "dropdown-menu" ? "dropdown-menu.png" : "search-1.png"}
                    />
                )}
            </div>

            <div className="Ribbon">
                <div className="secondary-header">
                    <div className="humidity">
                        <div className="humid">
                            <div className="Humidtext">Humidity</div>
                            <img className="Image" alt="Humid" src="../Image/humid.png"/>
                        </div>
                    </div>
                    <div className="air-quality">
                        <div className="AQ">
                            <div className="AQtext">Air Quality</div>
                            <img className="Image" alt="Pollute" src="../Image/pollute.png"/>
                        </div>
                    </div>
                    <div className="wind-map">
                        <div className="wind">
                            <div className="Windtext">Wind</div>
                            <img className="Image" alt="Wind" src="../Image/wind.png"/>
                        </div>
                    </div>
                    <div className="UV">
                        <div className="UVtext">UV</div>
                        <img classNames="UVImage" alt="UV" src="../Image/UV.png"/>
                    </div>
                    <div className="precipitation">
                        <div className="rain">
                            <div className="raintext">Precipitation</div>
                            <img className="Image" alt="Rain" src="../Image/rain.png"/>
                        </div>
                    </div>
                    <div className="temperature">
                        <div className="temp">
                            <div className="temptext">Temperature</div>
                            <img className="Image" alt="Thermometer" src="../Image/thermometer.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Precipitation">
                <div className="overlap">
                    <div className="Day-forecast">

                        <div className="currentbox">
                            <div className="Low">Low 3°</div>
                            <div className="break">|</div>
                            <div className="High">Hi 10°</div>
                            <div className="Today">Today</div>
                        </div>

                        <div className="day7">
                            <div className="DaysBackground">
                                <div className="forecasttext">Sun 15</div>
                            </div>
                        </div>
                        <div className="day6">
                            <div className="DaysBackground">
                                <div className="forecasttext">Sat 14</div>

                            </div>
                        </div>
                        <div className="day5">
                            <div className="DaysBackground">
                                <div className="forecasttext">Fri 13</div>
                            </div>
                        </div>
                        <div className="day4">
                            <div className="DaysBackground">
                                <div className="forecasttext">Thu 12</div>
                            </div>
                        </div>
                        <div className="day3">
                            <div className="DaysBackground">
                                <div className="forecasttext">Wed 11</div>
                            </div>
                        </div>
                        <div className="day2">
                            <div className="DaysBackground">
                                <div className="forecasttext">Tue 10</div>
                            </div>
                        </div>
                        <div className="today">
                            <div className="DaysBackground">
                                <div className="forecasttext">Today</div>
                            </div>
                        </div>
                    </div>
                    <div className="suggestions">
                        <p className="Warnings">
                        </p>
                        <div className="Suggestiontext">Suggestions:</div>
                    </div>
                </div>
                <div className="body">
                    <div className="RainChart"
                         style={{width: '1000px', height: '300px', position: 'relative', left: '180px'}}>
                        <RainChart/>
                    </div>
                </div>
            </div>
        </div>

    )
}