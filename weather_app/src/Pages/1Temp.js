import React from "react";
import "./Temp.css";
import { Sun } from '../Components/Sun';


export default function Temp(){
    return (
        <div className="Page">
            <div className="temperature">
                <div className="div">
                    <div className="overlap">
                        <div className="element-day-forecast">
                            <div className="overlap-group">
                                <div className="text-wrapper">Low 3°</div>
                                <div className="text-wrapper-2">|</div>
                                <div className="text-wrapper-3">Hi 10°</div>
                                <div className="text-wrapper-4">Today</div>
                                <Sun className="SUN-instance"/>
                            </div>
                            <div className="day">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-5">Sun 15</div>
                                    <Sun className="design-component-instance-node"/>
                                </div>
                            </div>
                            <div className="overlap-wrapper">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-6">Sat 14</div>
                                    <Sun className="SUN-2"/>
                                </div>
                            </div>
                            <div className="overlap-group-wrapper">
                                <div className="overlap-group-2">
                                    <Sun className="SUN-3"/>
                                    <div className="text-wrapper-7">Fri 13</div>
                                </div>
                            </div>
                            <div className="div-wrapper">
                                <div className="overlap-group-2">
                                    <Sun className="SUN-4"/>
                                    <div className="text-wrapper-8">Thu 12</div>
                                </div>
                            </div>
                            <div className="day-2">
                                <div className="overlap-group-2">
                                    <Sun className="SUN-5"/>
                                    <div className="text-wrapper-9">Wed 11</div>
                                </div>
                            </div>
                            <div className="day-3">
                                <div className="overlap-group-2">
                                    <Sun className="SUN-6"/>
                                    <div className="text-wrapper-10">Tue 10</div>
                                </div>
                            </div>
                            <div className="today">
                                <div className="overlap-2">
                                    <div className="text-wrapper-5">Today</div>
                                    <Sun className="SUN-7"/>
                                </div>
                            </div>
                        </div>
                        <div className="suggestions">
                            <p className="risk-of-heat-stroke">
                                Risk of heat stroke from 11:00-14:00
                                <br/>
                                Ideal running time 07:00-10:00, 16:00-20:00
                            </p>
                            <div className="text-wrapper-11">Suggestions:</div>
                        </div>
                    </div>
                    <div className="body"/>
                </div>
            </div>
        </div>

    )
}
