import Card2 from "../card/card2";
import './suggestions.css'

export default function ForecastSuggestions({ today, suggestions }) {
    return (
        <Card2>
            <div className="suggestions">
                <div className="left">
                    <p>Today</p>
                    <p> High: {today.hi}°C | Low: {today.low} °C </p>
                </div>
                <div className="right">
                    <p>Suggestions:</p>
                    <p>{suggestions}</p>
                </div>
            </div>
        </Card2>
    )
}
