import Card from "../card/card";
import './suggestions.css'

export default function ForecastSuggestions({ today }) {
    return (
        <Card>
            <div className="suggestions">
                <div className="left">
                    <p>Today</p>
                    <p> High: {today.hi}°C | Low: {today.low} °C </p>
                </div>
                <div className="right">
                    <p>Suggestions:</p>
                </div>
            </div>
        </Card>
    )
}