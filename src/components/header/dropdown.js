import React from "react";
import { Link } from "react-router-dom";
const Dropdown = () => {
    return (
        <div className="dropdown">
            <ul className={"dropdown-list"}>
                <li className="title"> StrideCast</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/temperature">Temperature</Link></li>
                <li><Link to="/precipitation">Precipitation</Link></li>
                <li><Link to="/humidity">Humidity</Link></li>
                <li><Link to="/uv">UV</Link></li>
                <li><Link to="/wind">Wind</Link></li>
                <li><Link to="/AQI">AQI</Link></li>
            </ul>
        </div>
    );
}
export default Dropdown;