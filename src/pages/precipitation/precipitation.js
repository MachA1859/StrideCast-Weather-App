import { Ribbon } from "../../components/ribbon/ribbon";
import Card from "../../components/card/card";
import RainChart from "./Rainchart";
import Forecast from "../../components/forecast/forecast";



export default function PercipitationPage() {
    return (
        <>
            <Ribbon/>


            <Card>
                <RainChart/>
            </Card>

            <Forecast
                today={{
                    'hi': 10,
                    'low': 3
                }}
                suggestions={'hi'}
            />
        </>
    )
}