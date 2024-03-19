const token = "b787f8f939e6de8235f3e80d9aac65ba"

export async function fetchByCity(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${token}`)
    return res.json()
}

export function extractWeather(json) {
    if (json === undefined) {
        return 'undefined'
    }

    return json.list[0].weather[0]
}
