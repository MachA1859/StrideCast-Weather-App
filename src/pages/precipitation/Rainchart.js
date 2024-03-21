import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import {useGlobalState} from "../../stores/weatherState";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Rainchart() {
    const [weatherData, setWeatherData] = useState(null);
    const [weather, dispatch] = useGlobalState();


    useEffect(() => {
        if (weather.json === undefined) {
            setWeatherData([])
        }
        else {
            const today = []
            for (let i = 0; i < weather.json.list.length; i++) {
                const dt = new Date(weather.json.list[i].dt_txt)
                const now = new Date()
                if (now.getDay() === dt.getDay()) {
                    today.push(weather.json.list[i])
                }
            }

            setWeatherData(today)
        }
    }, [weather.json]);


    if (!weatherData) {
        return null;
    }

    const labels = weatherData.map(entry => entry.dt_txt.split(" ")[1]);
    const rainData = weatherData.map(entry => entry.pop * 100); // Multiply by 100 to convert to percentage

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Chance of Rain (%)',
                data: rainData,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgb(60,208,227)',
                borderWidth: 2
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Chance of Rain (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            }
        }
    };

    return (
        <div style={{ height: '60rem', width: '40rem', padding: '1rem', margin: '1rem' }}>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}

export default Rainchart;
