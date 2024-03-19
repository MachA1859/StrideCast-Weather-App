import { Ribbon } from "../../components/ribbon/ribbon";
import Card from "../../components/card/card";
import RainChart from "./Rainchart";
import Forecast from "../../components/forecast/forecast";
import "./precipitation.css"

export default function PercipitationPage() {
    // TODO: get daily forecast from api

    return (
        <>
            <Ribbon/>

            <Card>
                <div className="rainchart">
                    <RainChart/>
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