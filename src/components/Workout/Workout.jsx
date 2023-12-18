
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
import AddExerciseToWorkoutModal from "../Modals/AddExerciseToWorkoutModal"
import FlipMove from "react-flip-move";
import Defer from "../Defer/Defer"
import WorkoutNameField from "../Inputs/WorkoutNameField";
import { selectAllTemplateExercises } from "../../redux/selectors";
import { selectAllWorkoutExercises } from "../../redux/selectors";
import { addExercisesToWorkout } from "../../redux/reducers/workoutReducer";


const Workout = ({ type }) => {
    console.log("Rendering Workout");

    let workoutName
    let exercises
    switch (type) {
        case "active":
            workoutName = useSelector(state => state.workout.name)
            exercises = useSelector(selectAllWorkoutExercises)
            break;
        case "template":
            workoutName = useSelector(state => state.template.name)
            exercises = useSelector(selectAllTemplateExercises)
            break;
        default:
            throw new Error('Component Workout must have a type prop specified!')
    }
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openFinishModal, setOpenFinishModal] = useState(false)

    const dispatch = useDispatch()

    //console.log(exercises);

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
                createdAt: new Date().toJSON(), // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
                dispatch(addExercisesToWorkout(exercisesToBeAdded))
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
            <Box padding={2}>
                <WorkoutNameField workoutName={workoutName} type={type} />
            </Box>

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
                                //console.log("MAPPING!!!!!!");
                                let arrayStart = false
                                let arrayEnd = false
                                if (index === 0) { arrayStart = true }
                                if (index === exercises.length - 1) { arrayEnd = true }
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

            <Stack sx={{ marginBottom: 8 }} >
                <Button variant="text" fullWidth sx={{ marginBottom: 2 }} onClick={() => setOpenAddModal(true)}>
                    Add exercise
                </Button>
                {type === "active" &&
                    <>
                        <Button variant="text" color="success" fullWidth sx={{ marginBottom: 2 }} onClick={() => setOpenAddModal(true)}>
                            Finish workout
                        </Button>
                        <Button variant="text" color="error" fullWidth sx={{ marginBottom: 2 }} onClick={() => setOpenAddModal(true)}>
                            Cancel workout
                        </Button>
                    </>
                }

            </Stack>

            {openAddModal &&
                <AddExerciseToWorkoutModal
                    open={openAddModal}
                    onClose={setOpenAddModal}
                    confirmFunction={addExercisesToStore}
                />
            }
            {openFinishModal &&
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