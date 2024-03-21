import {Ribbon} from "../../components/ribbon/ribbon";
import Forecast from "../../components/forecast/forecast";
import Card from "../../components/card/card";

import runningTime from "./runningTime";
import hourlyForecast from "./hourlyForecast";
import stepsKmCal from "./stepsKmCal";
import Essentials from "./Essentials";
import routePlanner from "./routePlanner";
import Info from "./Info";
import "./Days.css"

export default function DayPage() {
    return (
        <>
            <Ribbon/>

            <Card>
                <runningTime/>
            </Card>

            <Card>
                <hourlyForecast/>
            </Card>

            <Card>
                <stepsKmCal/>
            </Card>

            <Card>
                <Essentials/>
            </Card>

            <Card>
                <routePlanner/>
            </Card>

            <Card>
                <Info/>
            </Card>

            
        </>
    )
}