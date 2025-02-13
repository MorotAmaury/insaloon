import './loader.styles.scss'

const Loader = ({animation}) => { 
    return (
        <div className={`loader ${animation}`}></div>
    )
}
export default Loader