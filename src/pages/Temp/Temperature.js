import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import TempChart from "./Tempchart";
import "./Temp.css"
export default function TemperaturePage() {
    return (
        <>
            <Ribbon/>

            <Card>
                <TempChart/>
            </Card>

            <Forecast
                daily={[
                    'clear',
                    'rainy',
                    'thunder',
                    'clear',
                    'clear',

                ]}
                today={{
                    'hi': 10,
                    'low': 3
                }}/>


        </>
    )
}