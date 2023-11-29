
import WorkoutExercise from "./WorkoutExercise"
import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import generateId from "../../utils/generateId"
import { addExercise, deleteExercise } from "../../redux/reducers/exerciseReducer"
import HideAppBar from "../AppBar/HideAppBar"
import WorkoutToolbar from "./WorkoutToolbar"
import FormModal from "../Modals/FormModal"
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from "../Modals/ConfirmationModal"


const ActiveWorkout = ({ drawerWidth }) => {
    console.log("ActiveWorkout is rendering");
    const exerciseNames = useSelector(state => state.exerciseLibrary).map(e => e.name)
    const exercises = useSelector(state => state.exercises)
    //const workout = useSelector(state => state.workout)
    const [selected, setSelected] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
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
            setShowModal2(true)
        } else {
            addNewExercise()
            // console.log("exercise dsipatched ", exercises);
        }


    }

    const addNewExercise = () => {
        const newExercise = {
            id: generateId(),
            name: selected,
            createdAt: new Date().toJSON(),
            note: "",
        }
        dispatch(addExercise(newExercise))
    }

    const handleNewExercise = () => {
        setShowModal2(false)
        setShowModal(true)
    }

    const paska = () => {



        addNewExercise()
        // setShowModal(false)
    }


    /* const removeExercise = (exerciseId) => {
        dispatch(deleteExercise(exerciseId))
    }

    const memoizedRemoveExercise = useCallback(removeExercise, []); */


    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <WorkoutToolbar />
            </HideAppBar>
            <Container disableGutters sx={{
                marginTop: { xs: 3, sm: 4, md: 6 },
                width: 0,
                minWidth: { xs: '100%', sm: '90%', md: '80%' },

            }}
            >
                {exercises.length === 0 &&
                    <Container>
                        <Typography variant="h6" color={'text.secondary'} align={"center"} sx={{ marginBottom: 2, marginTop: 15 }}>
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
                                    exercise={exercise}
                                    name={exercise.name}
                                //deleteExercise={memoizedRemoveExercise}
                                />
                            )
                        })}
                    </Stack>
                }

                <Stack direction={"row"} sx={{ justifyContent: "center", mx: 0, marginBottom: 6 }}>
                    <Autocomplete
                        value={selected}
                        onInputChange={(event, newInputValue) => setSelected(newInputValue)}
                        freeSolo
                        disablePortal
                        id="combo-box-demo"
                        options={exerciseNames}
                        sx={{ width: 300 }}
                        onKeyDown={e => {
                            if (e.code === 'enter' && e.target.value) {
                                console.log("dööööööööööö");
                                // setSelected(e.target.value)
                                //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                            }
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Exercise"
                                size="small"
                                //style={{ height: 4  0 }}
                                onKeyDown={e => {
                                    if (e.code === 'Enter' && e.target.value) {
                                        console.log("dööööööööööö");
                                        //setSelected(e.target.value)
                                        //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                                        setSelected('')
                                        createExercise()

                                    }
                                }}
                            />
                        }
                    />
                    <Button variant="contained" onClick={createExercise}>Add</Button>
                </Stack>

                <Button variant="text" fullWidth onClick={() => setShowAddExerciseModal(true)}>Add exercise</Button>

                <FormModal
                    hideOpenButton='true'
                    showModal={showAddExerciseModal}
                    closeFromParent={setShowAddExerciseModal}

                    //menuItem={false}
                    modalType='addExerciseToWorkout'
                    //color='info'
                    confirmButton=''
                //confirmFunction={paska}
                    object={exerciseNames}
                //handleMenuClose={handleClose}
                />

                <FormModal
                    hideOpenButton='true'
                    showModal={showModal}
                    closeFromParent={setShowModal}

                    //menuItem={false}
                    modalType='createExercise'
                    //color='info'
                    confirmButton='Create'
                //confirmFunction={paska}
                //object={exercise}
                //handleMenuClose={handleClose}
                />
                <ConfirmationModal
                    hideOpenButton='true'
                    showModal={showModal2}
                    closeFromParent={setShowModal2}
                    modalType='exerciseDoesntExist'
                    color='info'
                    confirmButton='Yes'
                    confirmFunction={handleNewExercise}
                />

            </Container >
        </>
    )
}

export default ActiveWorkout