import { useState, useEffect, useCallback, memo } from "react"
import { TransitionGroup } from 'react-transition-group'

import { useDispatch, useSelector } from "react-redux"
import { addExercisesToWorkout, editWorkoutNote, endWorkout } from "../../redux/reducers/workoutReducer"
import { resetSearch, setSearch } from "../../redux/reducers/exerciseLibraryReducer"
import { addExercisesToTemplate, deleteExerciseFromTemplate, editTemplateNote } from "../../redux/reducers/templateReducer"
import { selectAllTemplateExercises } from "../../redux/selectors"
import { selectAllWorkoutExercises } from "../../redux/selectors"

import { Button, Stack, Box, Slide, Toolbar, Typography, Fab, Collapse, Grow, Divider } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'

import AddExerciseToWorkoutModal from "../Modals/AddExerciseToWorkoutModal"
import Defer from "../Defer/Defer"
import HideAppBar from "../AppBar/HideAppBar"
import WorkoutToolbar from "../Toolbars/WorkoutToolbar"
import WorkoutNameField from "../Inputs/WorkoutNameField";
import BasicModal from "../Modals/BasicModal"
import NoteField from "../Inputs/NoteField"
import SaveWorkoutModal from "../Modals/SaveWorkoutModal"
import WorkoutExercise from "./WorkoutExercise"
import StopWatch from "../Clock/StopWatch"

import { toast } from "react-toastify"
import generateId from "../../utils/generateId"
import FlipMove from "react-flip-move"
import { ArrowUpward } from "@mui/icons-material"

const Workout = ({ type }) => {
    console.log("Rendering Workout");

    let workoutStartTime
    let workoutName
    let exercises
    let note
    switch (type) {
        case "active":
            workoutStartTime = useSelector(state => state.workout.workoutStartTime)
            workoutName = useSelector(state => state.workout.name)
            exercises = useSelector(selectAllWorkoutExercises)
            note = useSelector(state => state.workout.note)
            break;
        case "template":
            workoutStartTime = null
            workoutName = useSelector(state => state.template.name)
            exercises = useSelector(selectAllTemplateExercises)
            note = useSelector(state => state.template.note)
            break;
        default:
            throw new Error('Component Workout must have a type prop specified!')
    }
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openFinishModal, setOpenFinishModal] = useState(false)
    const [openCancelModal, setOpenCancelModal] = useState(false)

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

    const handleBackToTopClick = () => {
        window.scrollTo(0)
    }

    const handleClear = () => {
        setOpenCancelModal(false)
        dispatch(endWorkout())
    }

    const handleFinishClick = () => {
        if (exercises.length === 0) {
            toast.warning('Add at least one exercise before finishing!')
            return
        }
        if (workoutName === "" || workoutName === undefined || workoutName === null) {
            toast.warning('Name your workout before finishing!')
            return
        }
        setOpenFinishModal(true)
    }

    const addExercisesToStore = (selectedExercises) => {
        console.log("add to store function");
        const exercisesToBeAdded = selectedExercises.map(e => {
            const workoutExercise = {
                id: generateId(), // e.id, // 
                exerciseId: e.id,
                name: e.name,
                muscle: e.muscle,
                createdAt: new Date().toJSON(), // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                note: "",
            }
            return workoutExercise
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

    const handleBlur = (note) => {
        switch (type) {
            case "active":
                dispatch(editWorkoutNote(note))
                break
            case "template":
                dispatch(editTemplateNote(note))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }

    }

    const handleOpenAddModal = () => {
        dispatch(resetSearch())
        setOpenAddModal(true)
    }

    return (
        <div className="scrollTesttt" >
            <Box className="scrollTesttt" display={'flex'} flexDirection={'column'} gap={0.5} padding={2}  >
                {type === "active" &&
                    <Box display={'flex'} flexDirection={'column'} paddingLeft={2} gap={1}>
                        <Stack
                            direction={'row'}
                            spacing={1} alignContent={'center'}
                            alignItems={'center'}
                        >
                            <Typography variant="h6" color={'text.secondary'} >
                                Started at
                            </Typography>
                            <Typography variant="h6" color={'text.secondary'} >
                                {workoutStartTime !== null ? workoutStartTime : " --:--"}
                            </Typography>
                        </Stack>
                        <Stack
                            direction={'row'}
                            spacing={1} alignContent={'center'}
                            alignItems={'center'}
                        >
                            <Typography variant="h6" color={'text.secondary'} >
                                Elapsed time
                            </Typography>
                            <StopWatch size="h6" showButtons={true} />
                        </Stack>
                    </Box>
                }
                <Stack spacing={3} marginTop={3}>
                    <WorkoutNameField /*  workoutName={workoutName}  */ type={type} />
                    <NoteField note={note} handleBlur={handleBlur} placeholder={"Workout note"} ></NoteField>
                </Stack>


                {type === "active" &&
                    <Box paddingTop={3} display={'flex'} flexDirection={{ xs: "column", sm: "row" }} /* flexWrap={"wrap"} flexDirection={'row'} */  >
                        <Button
                            variant="text"
                            color="success"
                            fullWidth
                            sx={{ marginBottom: { xs: 2, sm: 0 } }}
                            onClick={handleFinishClick}
                        >
                            Finish workout
                        </Button>
                        <Button
                            variant="text"
                            color="error"
                            fullWidth
                            //sx={{ marginBottom: 2 }}
                            onClick={() => setOpenCancelModal(true)}
                        >
                            Cancel workout
                        </Button>
                    </Box>
                }

            </Box>
            <Divider sx={{ marginBottom: 4, marginTop: 2 }} />


            {!(exercises.length === 0) &&
                <Stack spacing={3} padding={0} sx={{ justifyContent: "center" }}>
                    <Defer chunkSize={1} isFlip={true}>
                            {exercises.map((exerciseId, index) => {
                                //console.log("MAPPING!!!!!!");
                                let arrayStart = false
                                let arrayEnd = false
                                if (index === 0) { arrayStart = true }
                                if (index === exercises.length - 1) { arrayEnd = true }
                                return (
                                    <WorkoutExercise
                                        key={exerciseId}
                                        exerciseId={exerciseId}
                                        arrayStart={arrayStart}
                                        arrayEnd={arrayEnd}
                                        type={type}
                                    />
                                )
                            })}
                    </Defer>
                </Stack>
            }


            <Stack sx={{ marginBottom: 8 }} >
                <Button variant="text" fullWidth sx={{ marginBottom: 2 }} onClick={() => handleOpenAddModal()}>
                    <AddIcon sx={{ marginRight: 1 }} />
                    Add exercise
                </Button>
            </Stack>

            {openAddModal &&
                <AddExerciseToWorkoutModal
                    open={openAddModal}
                    onClose={setOpenAddModal}
                    confirmFunction={addExercisesToStore}
                />
            }
            {/*   {openFinishModal &&
                <AddExerciseToWorkoutModal
                    open={openAddModal}
                    onClose={setOpenAddModal}
                    confirmFunction={addExercisesToStore}
                />
            } */}
            {openCancelModal &&
                <BasicModal
                    open={openCancelModal}
                    onClose={() => setOpenCancelModal(false)}
                    title="Discard workout?"
                    subTitle="Are you sure you want to discard ongoing workout?"
                    confirmButtonText={'Discard'}
                    confirmButtonColor={"error"}
                    cancelButtonText={'Keep logging'}
                    onSubmit={() => handleClear()}
                />
            }
            {openFinishModal &&
                <SaveWorkoutModal
                    open={openFinishModal}
                    onClose={() => setOpenFinishModal(false)}
                    type={"active"}

                />
            }
        </div>
    )
}

export default memo(Workout)