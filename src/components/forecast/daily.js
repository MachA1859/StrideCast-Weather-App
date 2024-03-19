import './daily.css'

export default function Daily({ daily }) {
    let days = []

    daily.forEach((day) => {
        let logo;

        if (day === "sunny") {
            logo = './icons/sun.png'
        }
        else if (day === 'rainy') {
            logo = './icons/rain.png'
        }
        else if (day === 'thunder') {
            logo = './icons/thunder.png'
        }

        days.push(
            <>
                <img src={logo} alt={day} />
            </>
        )
    })

    return (
        <div className="daily">
            {days}
        </div>
    )
}