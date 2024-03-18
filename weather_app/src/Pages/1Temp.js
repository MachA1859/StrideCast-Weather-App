import React from "react";
import PropTypes from "prop-types";
import "./Temp.css";
export default function Temp({ property1, className }){
    return (
        <div className="Page">
            <div className="Header">
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
            </div>
            <div className="Ribbon">

            </div>
            <div className="temperature">
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

                </div>
            </div>
        </div>

    )
}
Temp.propTypes = {
    property1: PropTypes.oneOf(["RUNNER-ICON", "search-1", "dropdown-menu"]),
};