import "./humidity.css"
import { Ribbon } from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";


export default function HumidityPage() {
    return (
        <>
            <h1>humidity</h1>
            <Ribbon/>
            <Forecast
                today={{
                    'hi': 10,
                    'low': 3}}
            />
       </>
    )
}