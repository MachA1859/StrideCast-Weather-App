import{Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend } from "chart.js";
import {Bar} from 'react-chartjs-2';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

function RainChart() {
    const data ={
        labels:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        datasets:[
            {
                label: 'Chance of Rain',
                data:[12,19,3,5,2,3,5],
                backgroundColor:'rgba(75,192,192,0.2)',
                borderColor:'rgba(75,192,192,1)',
                borderWidth:1
            }
        ]
    }
    const options ={}
  return (
    <div className="RainChart">
        <div>
            <Bar
                data ={data}
                options={options}
            >
            </Bar>
        </div>
    </div>
  );
}

export default RainChart
