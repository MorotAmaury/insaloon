import SubmitDefiForm from '../3-defis/submitDefisForm.component'
import './submissionPage.styles.scss'

export default function SubmissionPage() {
    return (
        <div>
            <div className='title'>Soumettre un defis</div>
            <div className='submissionPage-container'>
                <SubmitDefiForm />
            </div>
        </div>
    )
}