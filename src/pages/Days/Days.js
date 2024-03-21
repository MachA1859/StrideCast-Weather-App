import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import card2 from "../../components/card/card2";

import runningTime from "./runningTime";
import hourlyForecast from "./hourlyForecast";
import stepsKmCal from "./stepsKmCal";
import Essentials from "./Essentials";
import routePlanner from "./routePlanner";
import Info from "./Info";
import "./Days.css"
import Card2 from "../../components/card/card2";

export default function DayPage() {
    return (
        <>
            <Ribbon/>

            <Card2>
                <runningTime/>
            </Card2>

            <Card2>
                <hourlyForecast/>
            </Card2>

            <Card2>
                <stepsKmCal/>
            </Card2>

            <Card2>
                <Essentials/>
            </Card2>

            <Card2>
                <routePlanner/>
            </Card2>

            <Card2>
                <Info/>
            </Card2>

            
        </>
    )
}