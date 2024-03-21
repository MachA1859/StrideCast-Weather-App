const token = "b787f8f939e6de8235f3e80d9aac65ba"

export async function fetchByCity(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${token}&units=metric`);
        return res.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

export function extractWeather(json) {
    if (!json || !json.list || json.list.length === 0) {
        return [];
    }

    return json.list.map(forecast => {
        const dateTime = forecast.dt_txt.split(" ");

        return {
            date: dateTime[0],
            time: dateTime[1],
            maxTemperature: forecast.main.temp_max,
            minTemperature: forecast.main.temp_min,
            humidity: forecast.main.humidity,
            weatherConditions: {
                main: forecast.weather[0].main,
                description: forecast.weather[0].description,
                icon: forecast.weather[0].icon,
            },
            pop: forecast.pop,
            city: json.city.name
        };
    });
}

