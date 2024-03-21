import './daily.css'
import {useEffect, useState} from "react";
import {useGlobalState} from "../../stores/weatherState";


export default function Daily() {
    const [weatherData, setWeatherData] = useState([]);
    const [weather, dispatch] = useGlobalState();

    useEffect(() => {
        if (weather.json === undefined) {
            setWeatherData([])
            return
        }

        const daily = {}
        for (let i = 0; i < weather.json.list.length; i++) {
            const dt = new Date(weather.json.list[i].dt_txt)
            const payload = {
                date: dt,
                weather: weather.json.list[i].weather[0].main
            }
            daily[dt.getDay()] = payload
        }

        setWeatherData(Object.values(daily).sort((a, b) => a.date - b.date))
    }, [weather.json]);

    const days = weatherData.map((payload, index) => {
        let logo;
        const day = payload.weather;
        const date = payload.date;

        if (day === "Clear") {
            logo = './icons/sun.png'
        }
        else if (day === 'Clouds') {
            logo = './icons/cloudy.png'
        }
        else if (day === 'Rain') {
            logo = './icons/raining.png'
        }
        else if (day === 'thunder') {
            logo = './icons/thunder.png'
        }
        else if (day === 'snowy') {
            logo = './icons/snow.png'
        }

        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" +
        ""];
        let month = monthNames[date.getMonth()];


        return (
            <div className={"daily-card"} key={index}>
                <p>{date.getDate()} {month}</p> <img key={`${day}-${index}`} src={logo} alt={day}/>
            </div>
        );
    });

    return (
        <div className="daily">
            {days}
        </div>
    );
}