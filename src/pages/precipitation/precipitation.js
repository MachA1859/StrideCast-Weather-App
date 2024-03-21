import { Ribbon } from "../../components/ribbon/ribbon";
import Card from "../../components/card/card";
import RainChart from "./Rainchart";
import Forecast from "../../components/forecast/forecast";
import "./precipitation.css"



export default function PercipitationPage() {
    return (
        <>
            <Ribbon/>


            <Card>
                <RainChart/>
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