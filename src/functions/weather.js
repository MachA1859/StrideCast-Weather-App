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
        return null;
    }

    const firstForecast = json.list[0];
    const dateTime = firstForecast.dt_txt.split(" ");

    return {
        date: dateTime[0],
        time: dateTime[1],
        maxTemperature: firstForecast.main.temp_max,
        minTemperature: firstForecast.main.temp_min,
        weatherConditions: firstForecast.weather[0]
    };
}
