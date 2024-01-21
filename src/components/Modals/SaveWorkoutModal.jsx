import { useSelector, useDispatch } from 'react-redux'

import BasicModal from './BasicModal'

import { toast } from 'react-toastify'
import { clearTemplate, saveTemplate, } from '../../redux/reducers/templateReducer'
import { resetWorkoutPath } from '../../redux/reducers/navReducer'
import { saveWorkout } from '../../redux/reducers/workoutReducer'
import { useState } from 'react'
import WaitingModal from './WaitingModal'


const SaveWorkoutModal = ({ open, onClose, onSubmit, type, title, editVipu, workout }) => {
    console.log("Rendering SaveWorkoutModal ", type);

    const [isSaving, setIsSaving] = useState(false)

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
        setIsSaving(false)
        onClose()
        onSubmit ? onSubmit() : null
    }

    const saveWorkoutToDb = async () => {
        setIsSaving(true)

        switch (type) {
            case "active":
                dispatch(saveWorkout(true, handleClose))
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
        //handleClose()

    }


    const decideModal = () => {
        if (isSaving) {
            return (
                <WaitingModal
                    open={open}
                    onClose={onClose}
                    text={"Saving..."}
                />
            )
        }
        return (
            <BasicModal
                open={open}
                onClose={onClose}
                title={modalTitle}
                subTitle=" "
                confirmButtonText={'Yes'}
                cancelButtonText={'Cancel'}
                onSubmit={saveWorkoutToDb}
            />
        )


    }


    return (
        decideModal()
    )
}

export default SaveWorkoutModal