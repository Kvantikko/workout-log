
import WorkoutExercise from "./WorkoutExercise"
import { useState } from "react"
import { getDate } from "../../utils/Date"

import { useDispatch } from "react-redux"
import { clearWorkout, addExercise, deleteExercise, updateWorkoutTitle } from "../../redux/reducers/workoutReducer"

import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Typography } from "@mui/material"
import DiscardWorkoutModal from "./DiscardWorkoutModal"

import { useSelector } from "react-redux"

import workoutService from "../../services/workouts"
import { addToHistory } from "../../redux/reducers/historyReducer"


const ActiveWorkout = () => {
    const exerciseNames = useSelector(state => state.exerciseLibrary).map(e => e.name)
    const exercises = useSelector(state => state.workout.exercises)
    const title = useSelector(state => state.workout.workoutTitle)
    //const thisWorkout = useSelector(state => state.workout)

    const dispatch = useDispatch()

    //const [exercises, setExercises] = useState([])
    // const [title, setTitle] = useState("Workout")
    const [selected, setSelected] = useState("")
    //const [id, setId] = useState(1) // frontend id

    

    const generateId = () =>
        Number((Math.random() * 1000000).toFixed(0)) // frontend id, backend will generate own


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
        //const newExercises = exercises.concat(newExercise)
        //setExercises(newExercises)
        dispatch(addExercise(newExercise))
        //setId(id + 1)

    }

    const removeExercise = (exerciseId) => {
        dispatch(deleteExercise(exerciseId))
        /* const newExercises = exercises.filter((e) => e.id !== exerciseId)
        setExercises(newExercises) */
    }

    const saveWorkoutToDb = async () => {

        //console.log(thisWorkout)

        const newWorkoutObject = {
            userId: 1,
            title: title,
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

            {/*  <Button variant="contained" onClick={() => dispatch(clearWorkout())}>Discard workout</Button> */}


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
                        //console.log("mappping... ", exercise.sets)
                        return(<WorkoutExercise
                            key={exercise.id}
                            exerciseId={exercise.id}
                            name={exercise.name ? exercise.exerciseInfo.name : "ei nimeä?"}
                            //exerciseSets={exercise.sets}
                            deleteExercise={() => removeExercise(exercise.id)}
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