import{Bar} from 'react-chartjs-2';
import{
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend} from 'chart.js';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);
function Rainchart() {
    const data={
        labels:['Monday','Tuesday','Wednesday','Thursday','Friday'],
        datasets:[
            {
                label:'Rain',
                data:[1,2,3,4,5],
                backgroundColor:'rgba(75,192,192,0.2)',
                borderColor:'rgb(60,208,227)',
                borderWidth:2
            }]};
    const options={
        scales:{
            y:{
                beginAtZero:true
            }}};
    return(
        <div style={{height:'60rem', width:'40rem', padding:'1rem', margin:'1rem'}}
        >
            <Bar
                data={data}
                options={options}/>
        </div>
    );
}
export default Rainchart;