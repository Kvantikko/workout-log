
import WorkoutExercise from "./WorkoutExercise"
import { useState, useEffect, useCallback, memo } from "react"
import { useDispatch } from "react-redux"
import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Slide, Toolbar, Typography, Collapse, Grow, Divider } from "@mui/material"
import { TransitionGroup } from 'react-transition-group';
import { useSelector } from "react-redux"
import generateId from "../../utils/generateId"
import { addExercisesToTemplate, deleteExerciseFromTemplate, editTemplateNote } from "../../redux/reducers/templateReducer"
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
import { addExercisesToWorkout, editWorkoutNote } from "../../redux/reducers/workoutReducer";
import { terminateTimer } from "../../redux/reducers/timerReducer";
import { stopWatch } from "../../redux/reducers/stopWatchReducer";
import { clearWorkout } from "../../redux/reducers/workoutReducer";
import BasicModal from "../Modals/BasicModal";
import NoteField from "../Inputs/NoteField";
import SaveWorkoutModal from "../Modals/SaveWorkoutModal";
import Timer from "../Clock/Timer";




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
   /*  const [openFinishModal, setOpenFinishModal] = useState(false)
    const [openCancelModal, setOpenCancelModal] = useState(false); */

    const dispatch = useDispatch()

    console.log(workoutName);

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

  /*   const handleClear = () => {
        setOpenCancelModal(false)
        dispatch(clearWorkout())
        dispatch(stopWatch())
      
        dispatch(terminateTimer())

    } */

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

    

    return (
        <>
            <Box display={'flex'} flexDirection={'column'} gap={0.5} padding={2}  >
                {type === "active" &&
                    <Box  display={'flex'} flexDirection={'column'}  paddingLeft={2} gap={1.5}>
                        <Typography
                            variant="h6"
                            color={'text.secondary'}

                        >
                            Started at {workoutStartTime}
                        </Typography>

                        <Stack direction={'row'} spacing={1}>
                            <Typography
                                variant="h6"
                                color={'text.secondary'}

                            >
                                Elapsed time
                            </Typography>

                            <Timer size="h6" />
                        </Stack>

                    </Box>
                }
                <Stack spacing={3} marginTop={3}>
                    <WorkoutNameField /*  workoutName={workoutName}  */ type={type} />
                    <NoteField note={note} handleBlur={handleBlur} placeholder={"Workout note"} ></NoteField>
                </Stack>


            {/*     {type === "active" &&
                    <>
                        <Button variant="text" color="success" fullWidth sx={{ marginBottom: 2 }} onClick={() => setOpenFinishModal(true)}>
                            Finish workout
                        </Button>
                        <Button variant="text" color="error" fullWidth sx={{ marginBottom: 2 }} onClick={() => setOpenCancelModal(true)}>
                            Cancel workout
                        </Button>
                    </>
                } */}




            </Box>
            <Divider sx={{ marginBottom: 4, marginTop: 2 }}/>

         {/*    {exercises.length === 0 &&
                <Container>
                    <Typography
                        variant="h6"
                        color={'text.secondary'}
                        align={"center"}
                        sx={{ marginBottom: 2, marginTop: 8 }}
                    >
                        Start adding exercises!
                    </Typography>
                </Container>
            } */}
            {!(exercises.length === 0) &&
                <Stack spacing={3} padding={0} sx={{ justifyContent: "center" }}>
                    <Defer chunkSize={1}>

                        <FlipMove>
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
                        </FlipMove>

                    </Defer>
                </Stack>
            }

            <Stack sx={{ marginBottom: 8 }} >
                <Button variant="text" fullWidth sx={{ marginBottom: 2 }} onClick={() => setOpenAddModal(true)}>
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
         {/*    {openCancelModal &&
                <BasicModal
                    open={openCancelModal}
                    onClose={() => setOpenCancelModal(false)}
                    title="Discard workout?"
                    subTitle="Are you sure you want to discard ongoing workout?"
                    confirmButtonText={'Discard'}
                    cancelButtonText={'Keep logging'}
                    onSubmit={() => handleClear()}
                />
            } */}
          {/*   {openFinishModal &&
                <SaveWorkoutModal
                    open={openFinishModal}
                    onClose={setOpenFinishModal}
                    type={"active"}
               
                />
            } */}
        </>
    )
}

export default memo(Workout)