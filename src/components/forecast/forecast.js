import Daily from "./daily"
import "./forecast.css"
import ForecastSuggestions from "./suggestions"
import {useEffect} from "react";

export default function Forecast({ today, suggestions }) {
    return (
        <div className="forecast">
            <div className="forecast-daily">
                <Daily />
            </div>

            <div className="forecast-suggestions">
                <ForecastSuggestions today={today} suggestions={suggestions}/>
            </div>
        </div>
    )
}
