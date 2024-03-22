import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import HumidityChart from "./Humiditychart";
export default function HumidityPage() {
    return (
        <>
            <Ribbon/>

            <Card>
                <HumidityChart/>
            </Card>

            <Forecast
                today={{
                    'hi': 10,
                    'low': 3
                }}/>


        </>
    )
}