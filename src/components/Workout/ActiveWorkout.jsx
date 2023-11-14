
import WorkoutExercise from "./WorkoutExercise"
import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import generateId from "../../utils/generateId"
import { addExercise, deleteExercise } from "../../redux/reducers/exerciseReducer"

const ActiveWorkout = () => {
    console.log("ActiveWorkout is rendering");
    const exerciseNames = useSelector(state => state.exerciseLibrary).map(e => e.name)
    const exercises = useSelector(state => state.exercises)
    //const workout = useSelector(state => state.workout)
    const [selected, setSelected] = useState("")
    //const title = useSelector(state => state.workout.workoutTitle)
    //const thisWorkout = useSelector(state => state.workout)
    //const [exercises, setExercises] = useState([])
    // const [title, setTitle] = useState("Workout")
    //const [id, setId] = useState(1) // frontend id

    const dispatch = useDispatch()


    // ei mee pohjaan koska yksi automaattinen setti luodaan
    useEffect(() => {
        console.log("EFFECT TO MOVE SCROLL, ActiveWorkout ");
        console.log("SCROLL HEIGHT ", document.body.scrollHeight);
        console.log("SCROLL HEIGHT PLUS ", document.body.scrollHeight + 100);
        window.scrollTo(0, document.body.scrollHeight)// (document.body.scrollHeight + 1000 )
    }, [exercises])


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
        }
        dispatch(addExercise(newExercise))
       // console.log("exercise dsipatched ", exercises);

    }


    /* const removeExercise = (exerciseId) => {
        dispatch(deleteExercise(exerciseId))
    }

    const memoizedRemoveExercise = useCallback(removeExercise, []); */


    return (
        <Container >
            {exercises.length === 0 &&
                <Container>
                    <Typography variant="h6" align={"center"} sx={{ marginBottom: 2, marginTop: 15 }}>
                        Start adding exercises!
                    </Typography>
                </Container>
            }
            {!(exercises.length === 0) &&
                <Stack spacing={3} padding={0} sx={{ justifyContent: "center" }}>
                    {exercises.map(exercise => {
                        //console.log("mappping exercises... ", exercise)
                        return (
                            <WorkoutExercise
                                key={exercise.id}
                                exerciseId={exercise.id}
                                name={exercise.name}
                                //deleteExercise={memoizedRemoveExercise}
                            />
                        )
                    })}
                </Stack>
            }
            <Stack direction={"row"} sx={{ justifyContent: "center", mx: 0, marginBottom: 6 }}>
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