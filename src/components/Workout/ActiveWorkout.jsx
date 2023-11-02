
import WorkoutExercise from "./WorkoutExercise"
import { useState } from "react"
import { getDate } from "../../utils/Date"

import { useDispatch } from "react-redux"
import { clearWorkout, updateWorkoutTitle } from "../../redux/reducers/workoutReducer"
import { clearExercises, addExercise, deleteExercise } from "../../redux/reducers/exerciseReducer"

import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Typography } from "@mui/material"
import DiscardWorkoutModal from "./DiscardWorkoutModal"

import { useSelector } from "react-redux"

import workoutService from "../../services/workouts"
import { addToHistory } from "../../redux/reducers/historyReducer"

import generateId from "../../utils/generateId"


const ActiveWorkout = () => {
    const exerciseNames = useSelector(state => state.exerciseLibrary).map(e => e.name)
    const exercises = useSelector(state => state.exercises)
    const [selected, setSelected] = useState("")
    //const title = useSelector(state => state.workout.workoutTitle)
    //const thisWorkout = useSelector(state => state.workout)
     //const [exercises, setExercises] = useState([])
    // const [title, setTitle] = useState("Workout")
    //const [id, setId] = useState(1) // frontend id

    const dispatch = useDispatch()


    const createExercise = () => {
        if (!selected) return

        if (!exerciseNames.includes(selected)) {
            console.log("ei ole databasessa");
            // laita uusi nimi databaseen?
        }
        const newExercise = {
            id: generateId(),
            name: selected,
            createdAt: new Date().toJSON(),
            note: "",
            //sets: []
        }
        dispatch(addExercise(newExercise))
        console.log("exercise dsipatched " , exercises);
    }


    const removeExercise = (exerciseId) => {
        dispatch(deleteExercise(exerciseId))
    }


    const saveWorkoutToDb = async () => {
        const newWorkoutObject = {
            userId: 1,
            title: "title", // do this in modal
            createdAt: new Date().toJSON(),
            note: "",
            exercises: exercises
        }
        const response = await workoutService.createNew(newWorkoutObject)
        console.log("response: ", response);
        // pistä servulata palautettu objekti stateen?
        if (response.status === 200) {
            dispatch(clearWorkout())
            dispatch(addToHistory(newWorkoutObject))
        }
    }


    return (
        <Container >
            {console.log("active workout is rendering")}

            {exercises.length === 0 &&
                <Container>
                    <Typography variant="h6" align={"center"}>
                        Start adding some exercises!
                    </Typography>
                </Container>
            }
            {!(exercises.length === 0) &&
                <Stack spacing={3} padding={0} sx={{ justifyContent: "center" }}>
                    {exercises.map(exercise => {
                        console.log("mappping exercises... ", exercise)
                        return(<WorkoutExercise
                            key={exercise.id}
                            exerciseId={exercise.id}
                            name={exercise.name}
                            //exerciseSets={exercise.sets}
                            deleteExercise={removeExercise}
                        />)
                        
                    })}
                </Stack>
            }
            <Stack direction={"row"} sx={{ justifyContent: "center", mx: 4, marginTop: 4 }}>
                <Autocomplete
                    onInputChange={(event, newInputValue) => setSelected(newInputValue)}
                    freeSolo
                    disablePortal
                    id="combo-box-demo"
                    options={exerciseNames}
                    sx={{ width: 300 }}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Exercise"
                            onKeyDown={e => {
                                if (e.code === 'enter' && e.target.value) {
                                    setSelected(e.target.value)
                                    //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                                }
                            }}
                        />
                    }
                />
                <Button variant="contained" onClick={createExercise}>Add</Button>
            </Stack>

        </Container>
    )
}

export default ActiveWorkout