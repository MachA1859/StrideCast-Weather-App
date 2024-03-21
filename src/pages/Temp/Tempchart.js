import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchByCity, extractWeather } from '../../functions/weather';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function Tempchart() {
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        // Fetch weather data from API
        async function fetchData() {
            const response = await fetchByCity("London");
            setWeatherData(extractWeather(response));
            setCityName(response ? response.city.name : ''); // Set the city name from the API response
        }
        fetchData();
    }, []);

    const data = {
        labels: weatherData ? weatherData.map(entry => entry.time) : [],
        datasets: [
            {
                label: 'Temperature',
                data: weatherData ? weatherData.map(entry => entry.maxTemperature) : [],
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
