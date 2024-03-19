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
                <div className="Tempchart">
                    <TempChart/>
                </div>
            </Card>

            <Forecast
                daily={[
                    'sunny',
                    'rainy',
                    'thunder',
                    'sunny',
                    'sunny',

                ]}
                today={{
                    'hi': 10,
                    'low': 3
                }}/>


        </>
    )
}