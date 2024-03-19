import{Line} from 'react-chartjs-2';
import{Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement,Legend,Tooltip} from 'chart.js';
ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,Legend,Tooltip)

function Tempchart() {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                label: 'Temperature',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(0,59,255)',
                pointBorderColor: 'rgb(143,12,227)',
                pointBackgroundColor: 'rgb(143,12,227)',
                tension: 0.4,
              }]
      };
    const options={
        plugins: {
            position:'left'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  return (
      <div className="Tempchart">
          <div>
              <Line
                  data={data}
                  options={options}
              >
              </Line>
          </div>
      </div>

  );
}

export default Tempchart;
