import Daily from "./daily"
import "./forecast.css"
import ForecastSuggestions from "./Info"
import { useGlobalState } from "../../stores/weatherState";

export default function Forecast({ today, suggestions }) {
    const [weatherData] = useGlobalState();

    return (
        <div className="forecast">
            <div className="forecast-daily">
                <Daily />
            </div>

            <div className="forecast-suggestions">
                <ForecastSuggestions
                    today={today}
                    suggestions={suggestions}
                    maxTemp={weatherData.maxTemp}
                    minTemp={weatherData.minTemp}
                />
            </div>
        </div>
    )
}