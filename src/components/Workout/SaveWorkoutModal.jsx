import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, addExercise, removeExercise } from '../../redux/reducers/exerciseLibraryReducer'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import exerciseService from '../../services/exercises'


import { clearWorkout } from "../../redux/reducers/workoutReducer"
import { clearSets } from "../../redux/reducers/setReducer"
import { clearExercises } from '../../redux/reducers/exerciseReducer'


import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { stopWatch } from '../../redux/reducers/stopWatchReducer'

import { addToHistory } from '../../redux/reducers/historyReducer'


import workoutService from '../../services/workouts'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SaveWorkoutModal = () => {
    const [open, setOpen] = useState(false)

    const workout = useSelector(state => state.workout)
    const exercises = useSelector(state => state.exercises)
    const sets = useSelector(state => state.sets)
    const [input, setInput] = useState("")

    const dispatch = useDispatch()

    const saveWorkoutToDb = async () => {

        const newExercises = exercises.map(exercise => {
            const exerciseWithSets = {
                ...exercise,
                sets: sets.filter(set => set.exerciseId === exercise.id)
            }
            return exerciseWithSets
        })

        const newWorkoutObject = {
            userId: 1,
            title: input,
            createdAt: new Date().toJSON(),
            note: "",
            exercises: newExercises
        }
        console.log(newWorkoutObject);
        const response = await workoutService.createNew(newWorkoutObject)
        console.log("response: ", response);
        // pistä servulata palautettu objekti stateen?
        if (response.status === 200) {
            dispatch(clearWorkout())
            dispatch(clearExercises())
            dispatch(clearSets())
            dispatch(stopWatch())

            dispatch(addToHistory(newWorkoutObject))
        }
    }

    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Finish
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Stack sx={style}>
                    <h3>
                        Finish ongoing workout?
                    </h3>
                    <TextField
                        variant="outlined"
                        label="Workout name"
                        onChange={(event) => {
                            //console.log(event.target.value)
                            setInput(event.target.value)}}
                        onKeyDown={e => {
                            if (e.code === 'enter' && e.target.value) {
                                setSelected(e.target.value)
                                //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                            }
                        }}
                    />
                    <Stack direction='row'>
                        <Button variant="outlined" onClick={() => setOpen(false)}>No, keep logging</Button>
                        <Button variant="contained" onClick={saveWorkoutToDb}>Yes, save to database</Button>

                    </Stack>
                </Stack>
            </Modal>
        </div>
    )
}

export default SaveWorkoutModal