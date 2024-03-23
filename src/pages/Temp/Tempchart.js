import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import {useGlobalState} from "../../stores/weatherState";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

// Chart component to display temperature data
function Tempchart() {

    const [weather] = useGlobalState();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if(weather.json===undefined){
            setWeatherData([])
        }
        else {
            const firstTenDataPoints = weather.json.list.slice(0, 13);
            console.log(firstTenDataPoints)
            setWeatherData(firstTenDataPoints)
        }
    }, [weather.json])

    // Chart data from weatherData
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
    // Chart options
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (°C)'
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
        <div className="Tempchart" style={{width: '60%', padding: '1rem', margin: '1rem' }}>
                <Line
                    data={data}
                    options={options}
                />
        </div>
    );
}

export default Tempchart;
