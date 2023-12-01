
import WorkoutExercise from "./WorkoutExercise"
import { useState, useEffect, useCallback, memo } from "react"
import { useDispatch } from "react-redux"
import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Typography, Collapse } from "@mui/material"
import { TransitionGroup } from 'react-transition-group';
import { useSelector } from "react-redux"
import generateId from "../../utils/generateId"
import { addExercises, deleteExercise } from "../../redux/reducers/exerciseReducer"
import HideAppBar from "../AppBar/HideAppBar"
import WorkoutToolbar from "./WorkoutToolbar"
import FormModal from "../Modals/FormModal"
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from "../Modals/ConfirmationModal"
import AddExerciseToWorkoutModal from "../Modals/AddExerciseToWorkoutModal"

import Defer from "../Defer/Defer"

const ActiveWorkout = () => {
    console.log("Rendering ActiveWorkout");

    //const exerciseNames = useSelector(state => state.exerciseLibrary).map(e => e.name)
    const exercises = useSelector(state => state.exercises)

    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
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


    /*  const createExercise = () => {
         if (!selected) return
 
         if (!exerciseNames.includes(selected)) {
         
             setShowModal2(true)
         } else {
             addNewExercise()
         }
 
 
     } */




    return (
        <>
            {exercises.length === 0 &&
                <Container>
                    <Typography variant="h6" color={'text.secondary'} align={"center"} sx={{ marginBottom: 2, marginTop: 15 }}>
                        Start adding exercises!
                    </Typography>
                </Container>
            }
            {!(exercises.length === 0) &&
                <Stack spacing={3} padding={0} sx={{ justifyContent: "center" }}>
                    <Defer chunkSize={1}>


                       {/*  <TransitionGroup>
                            {exercises.map(exercise => (
                                <Collapse key={exercise.id}>
                                    <WorkoutExercise
                                        key={exercise.id}
                                        exercise={exercise}
                                    />
                                </Collapse>
                            ))}
                        </TransitionGroup> */}



                        {exercises.map(exercise => {
                            return (
                                <WorkoutExercise
                                    key={exercise.id}
                                    exercise={exercise}
                                />
                            )
                        })}





                    </Defer>



                </Stack>
            }

            <Button variant="text" fullWidth sx={{ marginBottom: 25 }} onClick={() => setOpenAddModal(true)}>Add exercise</Button>

            {openAddModal &&
                <AddExerciseToWorkoutModal
                    open={openAddModal}
                    onClose={setOpenAddModal}
                //confirmFunction={addExercises}
                //exercises={exercises}
                />
            }
        </>
    )
}

export default memo(ActiveWorkout)