import React from "react";
import "./header.css"
import { useGlobalState } from "../../stores/weatherState";
import { fetchByCity } from "../../functions/weather";

export default function Header() {
    const [state, dispatch] = useGlobalState()
    const [textstate, setTextState] = React.useState("")

    const searchClick = async () => {
        const json = await fetchByCity(textstate)
        console.log(json)
        dispatch({isLoading: false, json})
    }


    return (
        <header className="header">
            <div className="left">
                <a href="/">
                    <img src="./icons/runner.png" alt="runner"/>
                </a>
            </div>

            <div className="right">
                <input type={"text"} className="cityinput" placeholder={"Please type a city"}/>
                <img src="./icons/search.png" alt="search" onClick={() => searchClick()}/>
                <img src="./icons/dropdownMenu.png" alt="dropdownMenu"/>
            </div>
        </header>
    )
}