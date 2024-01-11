import { useSelector, useDispatch } from 'react-redux'

import BasicModal from './BasicModal'

import { toast } from 'react-toastify'
import { clearTemplate, saveTemplate, } from '../../redux/reducers/templateReducer'
import { resetWorkoutPath } from '../../redux/reducers/navReducer'
import { saveWorkout } from '../../redux/reducers/workoutReducer'


const SaveWorkoutModal = ({ open, onClose, onSubmit, type, title, editVipu, workout }) => {
    console.log("Rendering SaveWorkoutModal ", type);

    let modalTitle
    switch (type) {
        case "active":
            modalTitle = "Finish workout?"
            break;
        case "template":
            modalTitle = "Save workout?"
            break;
        case "history":
            modalTitle = "Save workout?"
            break;
        default:
            throw new Error('Component must have a type prop specified!');
    }

    const dispatch = useDispatch()

    const handleClose = () => {
        onClose()
        onSubmit()
    }

    const saveWorkoutToDb = async () => {
        console.log("SAVE FUNC ", type);

        switch (type) {
            case "active":
                dispatch(saveWorkout(!editVipu, false, handleClose))
                break;
            case "template":
                dispatch(saveTemplate(!editVipu, false, handleClose))
                break;
            case "history":
                console.log("case history");
                dispatch(saveTemplate(!editVipu, true, handleClose))
                break;
            default:
                throw new Error('Component must have a type prop specified!');
        }

        //onClose()
        handleClose()

    }

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title={modalTitle}
            subTitle="All sets marked as done will be saved."
            confirmButtonText={'Yes'}
            cancelButtonText={'Cancel'}
            onSubmit={saveWorkoutToDb}
        />
    )
}

export default SaveWorkoutModal