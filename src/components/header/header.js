import React from "react";
import "./header.css";
import { useGlobalState } from "../../stores/weatherState";
import { fetchByCity } from "../../functions/weather";
import Sidebar from "./sidebar";


export default function Header() {
    const [state,dispatch] = useGlobalState();
    const [textstate, setTextState] = React.useState("");
    const [sidebarVisible, setSidebarVisible] = React.useState(false);

    React.useEffect(() => {
        if (sidebarVisible) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }
    }, [sidebarVisible]);

    const searchClick = async () => {
        try {
            const json = await fetchByCity(textstate);
            if (json && json.list) {
                dispatch({ isLoading: false, json });
            } else {
                console.error("Invalid response format: ", json);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleInputChange = (event) => {
        setTextState(event.target.value);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <header className="header">
            <div className="left">
                <a href="/">
                    <img src="./icons/runner.png" alt="runner"/>
                </a>
            </div>

            <div className="right">
                <input
                    type="text"
                    className="cityinput"
                    placeholder="Please type a city"
                    value={textstate}
                    onChange={handleInputChange}
                />
                <img src="./icons/search.png" alt="search" onClick={searchClick}/>
                <img src="./icons/dropdownMenu.png" alt="Sidebar" onClick={toggleSidebar}/>
                {sidebarVisible && <Sidebar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />}

            </div>
        </header>
    );
}