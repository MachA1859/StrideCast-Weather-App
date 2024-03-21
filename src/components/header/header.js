import React from "react";
import "./header.css";
import { useGlobalState } from "../../stores/weatherState";
import { fetchByCity } from "../../functions/weather";

export default function Header() {
    const [state, dispatch] = useGlobalState();
    const [textstate, setTextState] = React.useState("");

    const searchClick = async () => {
        try {
            const json = await fetchByCity(textstate);
            if (json && json.list) {
                dispatch({ isLoading: false, json });
            } else {
                // if json or json.list is undefined
                console.error("Invalid response format: ", json);
            }
        } catch (error) {
            //if any error occurs
            console.error("Error fetching weather data:", error);
        }
    };

    const handleInputChange = (event) => {
        setTextState(event.target.value);
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
                <img src="./icons/dropdownMenu.png" alt="dropdownMenu"/>
            </div>
        </header>
    );
}
