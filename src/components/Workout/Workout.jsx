
import WorkoutExercise from "./WorkoutExercise"
import { useState, useEffect, useCallback, memo } from "react"
import { useDispatch } from "react-redux"
import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Slide, Toolbar, Typography, Collapse, Grow } from "@mui/material"
import { TransitionGroup } from 'react-transition-group';
import { useSelector } from "react-redux"
import generateId from "../../utils/generateId"
import { addExercises, deleteExercise } from "../../redux/reducers/exerciseReducer"
import { addExercisesToTemplate, deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer"
import HideAppBar from "../AppBar/HideAppBar"
import WorkoutToolbar from "./WorkoutToolbar"
import FormModal from "../Modals/FormModal"
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from "../Modals/ConfirmationModal"
import AddExerciseToWorkoutModal from "../Modals/AddExerciseToWorkoutModal"
import FlipMove from "react-flip-move";
import Defer from "../Defer/Defer"



const Workout = ({ type }) => {
    console.log("Rendering ActiveWorkout");

    let exercises = []
    switch (type) {
        case "active":
            exercises = useSelector(state => state.exercises)
            break;
        case "template":
            exercises = useSelector(state => state.template.exercises)
            break;
        default:
            throw new Error('Component Workout must have a type prop specified!');
    }
    const [openAddModal, setOpenAddModal] = useState(false)

    const dispatch = useDispatch()

    // ei mee pohjaan koska yksi automaattinen setti luodaan
    // useEffect(() => {
    // console.log("EFFECT Workout");
    //console.log("EFFECT TO MOVE SCROLL, ActiveWorkout ");
    //console.log("SCROLL HEIGHT ", document.body.scrollHeight);
    //console.log("SCROLL HEIGHT PLUS ", document.body.scrollHeight + 100);
    // window.scrollTo(0, document.body.scrollHeight)
    // (document.body.scrollHeight + 1000 )
    //}, [exercises])

    const addExercisesToStore = (selectedExercises) => {
        console.log("add to store function");
        const exercisesToBeAdded = selectedExercises.map(e => {
            const exercise = {
                id: generateId(),
                name: e.name,
                createdAt: null, //new Date().toJSON(), !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                note: "",
            }
            return exercise
        })

        if (exercisesToBeAdded.length === 0) {
            toast.info("You didn't select any exercises!")
            return
        }

        switch (type) {
            case "active":
                dispatch(addExercises(exercisesToBeAdded))
                break
            case "template":
                dispatch(addExercisesToTemplate(exercisesToBeAdded))
                break
            default:
                throw new Error('Component Workout must have a type prop specified!')
        }

        setOpenAddModal(false)
    }


    return (
        <>
            {exercises.length === 0 &&
                <Container>
                    <Typography
                        variant="h6"
                        color={'text.secondary'}
                        align={"center"}
                        sx={{ marginBottom: 2, marginTop: 15 }}
                    >
                        Start adding exercises!
                    </Typography>
                </Container>
            }
            {!(exercises.length === 0) &&
                <Stack spacing={3} padding={0} sx={{ justifyContent: "center" }}>
                    <Defer chunkSize={1}>

                        <FlipMove>
                            {exercises.map((exercise, index) => {
                                console.log("MAPPING!!!!!!");
                                let arrayStart = false
                                let arrayEnd = false
                                if (index === 0) {
                                    arrayStart = true
                                }
                                if (index === exercises.length - 1) {
                                    arrayEnd = true
                                }
                                return (
                                    <WorkoutExercise
                                        key={exercise.id}
                                        exercise={exercise}
                                        arrayStart={arrayStart}
                                        arrayEnd={arrayEnd}
                                        type={type}
                                    />
                                )
                            })}
                        </FlipMove>

                    </Defer>
                </Stack>
            }

            <Button variant="text" fullWidth sx={{ marginBottom: 25 }} onClick={() => setOpenAddModal(true)}>
                Add exercise
            </Button>

            {openAddModal &&
                <AddExerciseToWorkoutModal
                    open={openAddModal}
                    onClose={setOpenAddModal}
                    confirmFunction={addExercisesToStore}
                />
            }
        </>
    )
}

export default memo(Workout)