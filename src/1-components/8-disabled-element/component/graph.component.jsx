import ChartComponent from '../../6-chart-component/chart-component.component';
import '../disabled.styles.scss';
import '../pdf.styles.scss'
const Graph = () => {
    return (
        <div className='graph-container'>
            <div className='download-btn disabled' >
                <i className="fa-solid fa-download "></i>
            </div>
            <div className='user_subject'>La finance verte : un mirage ?</div>
            <ChartComponent 
                sujet={90} 
                gram={85} 
                arg={80}
                arg2={75}
                plan2={82}
                ex2={85}
            />
        </div>
    )
}
export default Graph