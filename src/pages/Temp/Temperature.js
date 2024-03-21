import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import TempChart from "./Tempchart";
export default function TemperaturePage() {
    return (
        <>
            <Ribbon/>

            <Card>
                <TempChart/>
            </Card>

            <Forecast
                today={{
                    'hi': 10,
                    'low': 3
                }}/>


        </>
    )
}