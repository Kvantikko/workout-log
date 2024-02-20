import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { selectAllTemplateExercises } from "../../redux/selectors"
import { selectAllWorkoutExercises } from "../../redux/selectors"
import { clearTemplate, saveTemplate, } from '../../redux/reducers/templateReducer'
import { resetHistoryPath, resetWorkoutPath } from '../../redux/reducers/navReducer'
import { saveWorkout, endWorkout } from '../../redux/reducers/workoutReducer'

import { Container, Button } from '@mui/material'

import BasicModal from './BasicModal'
import NewBasicModal from './NewBasicModal'
import WaitingModal from './WaitingModal'

import { toast } from 'react-toastify'

const SaveWorkoutModal = ({ openButton, type, editVipu, onSubmit }) => {

    //console.log("Rendering SaveWorkoutModal ", type);

    const [isSaving, setIsSaving] = useState(false)
    const workoutName = useSelector(state => type === "active" ? state.workout.name : state.template.name)
    const exercises = useSelector(type === "active" ? selectAllWorkoutExercises : selectAllTemplateExercises)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        setIsSaving(false)
        onSubmit()
       
        if (type === "template") {
            navigate("/")
            dispatch(resetWorkoutPath())
        } else {
            navigate("/history")
            dispatch(resetHistoryPath())
        }
    }

    const handleFinishClick = () => {
        if (exercises.length === 0) {
            toast.warning('Add at least one exercise before finishing!')
            return false
        }
        if (workoutName === "" || workoutName === undefined || workoutName === null) {
            toast.warning('Name your workout before finishing!')
            return false
        }
        return true
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
                dispatch(saveTemplate(!editVipu, true, handleClose))
                break;
            default:
                throw new Error('Component must have a type prop specified!');
        }
    }

    return (
        <>
            {isSaving ?
                <WaitingModal
                    open={true}
                    //onClose={onClose}
                    text={"Saving..."}
                />
                :
                <NewBasicModal
                    openButton={openButton}
                    beforeOpen={handleFinishClick}
                    title={type === "active" ? "Finish workout?" : "Save workout?"}
                    subTitle=" "
                    onSubmit={() => saveWorkoutToDb()}
                />
            }
        </>
    )
}

export default SaveWorkoutModal