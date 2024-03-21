import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import AQIchart from "./AQIchart";
import "./AQI.css"

export default function AQIPage() {
    return (
        <>
            <Ribbon/>

            <Card>
                <AQIchart/>
            </Card>

            <Card>

            </Card>

            <Forecast
                today={{
                    'hi': 10,
                    'low': 3
                }}/>
        </>
    )
}