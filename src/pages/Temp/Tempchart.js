import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import {useGlobalState} from "../../stores/weatherState";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function Tempchart() {
    const [weatherData, setWeatherData] = useState(null);
    const [weather, dispatch] = useGlobalState();

    useEffect(() => {
        if(weather.json===undefined){
            setWeatherData([])

        }
        else {
            const today=[]
            for(let i=0;i<weather.json.list.length;i++){
                const dt= new Date(weather.json.list[i].dt_txt)
                const now= new Date()
                if(now.getDate()===dt.getDate())
                    today.push(weather.json.list[i])
            }
            console.log(today)
            setWeatherData(today)
        }

    }, [weather.json])

    const data = {
        labels: weatherData ? weatherData.map(entry => entry.dt_txt) : [],
        datasets: [
            {
                label: 'Temperature',
                data: weatherData ? weatherData.map(entry => entry.main.temp) : [],
                borderColor: 'rgb(0,59,255)',
                pointBorderColor: 'rgb(143,12,227)',
                pointBackgroundColor: 'rgb(143,12,227)',
                tension: 0.4,
            }
        ]
    };

    const options = {
        plugins: {
            position: 'left'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="Tempchart">
            <div style={{ height: '60rem', width: '40rem', padding: '1rem', margin: '1rem' }}>
                <Line
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
}

export default Tempchart;
