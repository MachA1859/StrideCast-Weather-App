import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import {useGlobalState} from "../../stores/weatherState";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// This component will display a bar chart showing the chance of rain for the next 12 hours.
function Rainchart() {
    const [weatherData, setWeatherData] = useState(null);
    const [weather] = useGlobalState();

    // This function will update the weather data when the weather state changes.
    useEffect(() => {
        if (weather.json === undefined) {
            setWeatherData([])
        }
        else {
            const DataPoints = weather.json.list.slice(0, 13);
            console.log(DataPoints)
            setWeatherData(DataPoints)
            }
    }, [weather.json]);


    if (!weatherData) {
        return null;
    }

    const labels = weatherData.map(entry => entry.dt_txt.split(" ")[1]);
    const rainData = weatherData.map(entry => entry.pop*100 ); // Multiply by 100 to convert to percentage

    // The data for the bar chart
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
        legend: { display: false },
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
                    text: 'Time(GMT)'
                }
            }
        }
    };

    return (
        <div style={{width: '60%', padding: '1rem', margin: '1rem' }}>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}

export default Rainchart;
