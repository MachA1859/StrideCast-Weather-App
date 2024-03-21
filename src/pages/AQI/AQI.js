import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";
import AQIchart from "./AQIchart";

import UV1 from "./UV1.png"
import UV2 from "./UV2.png"

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