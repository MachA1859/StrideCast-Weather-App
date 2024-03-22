import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarVisible, setSidebarVisible }) => {
    const sidebarRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarVisible && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarVisible, setSidebarVisible]);

    const handleLinkClick = () => {
        setSidebarVisible(false);
    };

    return (
        <div className={`sidebar ${sidebarVisible ? 'open' : ''}`} ref={sidebarRef}>
            <ul>
                <li className="title">StrideCast</li>
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/temperature" onClick={handleLinkClick}>Temperature</Link></li>
                <li><Link to="/precipitation" onClick={handleLinkClick}>Precipitation</Link></li>
                <li><Link to="/humidity" onClick={handleLinkClick}>Humidity</Link></li>
                <li><Link to="/uv" onClick={handleLinkClick}>UV</Link></li>
                <li><Link to="/wind" onClick={handleLinkClick}>Wind</Link></li>
                <li><Link to="/AQI" onClick={handleLinkClick}>AQI</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
