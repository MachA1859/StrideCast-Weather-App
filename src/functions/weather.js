const token = "255e8798eb33b20514c04d60089c31d2"

export async function fetchByCity(city) {
    const res = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${token}&units=metric`)
    return res.json()
}

export function extractWeather(json) {
    if (json === undefined) {
        return 'undefined'
    }

    return json.list[0].weather[0]
}

export function extractCity(json) {
    if (json === undefined) {
        return 'undefined'
    }

    return json.city.name
}

