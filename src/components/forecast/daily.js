import './daily.css'

export default function Daily({ daily }) {
    const days = daily.map((day, index) => {
        let logo;

        if (day === "clear") {
            logo = './icons/sun.png'
        }
        else if (day === 'rainy') {
            logo = './icons/rain.png'
        }
        else if (day === 'thunder') {
            logo = './icons/thunder.png'
        }
        else if (day === 'snowy') {
            logo = './icons/snow.png'
        }

        return (
            <img key={`${day}-${index}`} src={logo} alt={day} />
        );
    });

    return (
        <div className="daily">
            {days}
        </div>
    );
}