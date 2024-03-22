import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import {useGlobalState} from "../../stores/weatherState";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function Humidchart() {
    const [weatherData, setWeatherData] = useState(null);
    const [weather] = useGlobalState();

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
                label: 'Humidity',
                data: weatherData ? weatherData.map(entry => entry.main.humidity) : [],
                borderColor: 'rgb(0,59,255)',
                pointBorderColor: 'rgb(143,12,227)',
                pointBackgroundColor: 'rgb(143,12,227)',
                tension: 0.4,
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Humidity (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time(GMT)'
                }
            }
        }
    };

    return (
        <div className="Humidchart" style={{width: '60%', padding: '1rem', margin: '1rem' }}>
                <Line
                    data={data}
                    options={options}
                />
        </div>
    );
}

export default Humidchart;
