import React from "react";
import "./Precipitation.css";
export default function Precipitation(){
    return (
        <div className="Page">
            <div className="Header">

            </div>
            <div className="Ribbon">

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

                </div>
            </div>
        </div>

    )
}