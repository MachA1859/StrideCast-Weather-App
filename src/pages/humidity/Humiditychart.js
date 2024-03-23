import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import {useGlobalState} from "../../stores/weatherState";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

// This component displays a line chart of the humidity data
function Humidchart() {
    const [weatherData, setWeatherData] = useState(null);
    const [weather] = useGlobalState();

    // The useEffect hook is used to update the weather data when the weather.json state changes
    useEffect(() => {
        if(weather.json===undefined){
            setWeatherData([])

        }
        else {
            const DataPoints = weather.json.list.slice(0, 13);
            console.log(DataPoints)
            setWeatherData(DataPoints)
        }
    }, [weather.json]);

    // The data and options objects are used to configure the chart
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
