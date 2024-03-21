import Daily from "./daily"
import "./forecast.css"
import ForecastSuggestions from "./suggestions"

export default function Forecast({ daily, today, suggestions }) {
    return (
        <div className="forecast">
            <div className="forecast-daily">
                <Daily daily={daily} />
            </div>

            <div className="forecast-suggestions">
                <ForecastSuggestions today={today} suggestions={suggestions}/>
            </div>
        </div>
    )
}
