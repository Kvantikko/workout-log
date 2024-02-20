import { Link } from "react-router-dom"

import { useDispatch } from "react-redux"
import { addExercisesToWorkout, endWorkout } from "../../redux/reducers/workoutReducer"
import { resetSearch } from "../../redux/reducers/exerciseLibraryReducer"
import { addExercisesToTemplate } from "../../redux/reducers/templateReducer"

import { Button, Box, Divider } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'

import AddExerciseToWorkoutModal from "../Modals/AddExerciseToWorkoutModal"
import ExerciseList from "./ExerciseList"
import NewBasicModal from "../Modals/NewBasicModal"
import SaveWorkoutModal from "../Modals/SaveWorkoutModal"
import InitialWorkoutDetails from "./InitialWorkoutDetails"

import generateId from "../../utils/generateId"

const Workout = ({ type }) => {

    //console.log("Rendering Workout");

    if (!type) throw new Error('Component must have a type prop specified!')

    const dispatch = useDispatch()

    const addSelectedExercisesToStore = (selectedExercises) => {
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
        type === "active" ?
            dispatch(addExercisesToWorkout(exercisesToBeAdded)) :
            dispatch(addExercisesToTemplate(exercisesToBeAdded))
    }

    return (
        <div className="active-workout">
            <Box display={'flex'} flexDirection={'column'} gap={0.5} padding={2}  >

                <InitialWorkoutDetails type={type} />

                {type === "active" &&
                    <Box paddingTop={3} display={'flex'} flexDirection={{ xs: "column", sm: "row" }} >
                        <SaveWorkoutModal
                            openButton={
                                <Button variant="text" color="success" fullWidth sx={{ marginBottom: { xs: 2, sm: 0 } }} >
                                    Finish workout
                                </Button>
                            }
                            type={"active"}
                        />
                        <NewBasicModal
                            openButton={
                                <Button variant="text" color="error" fullWidth >
                                    Cancel workout
                                </Button>
                            }
                            title="Discard workout?"
                            subTitle="Are you sure you want to discard ongoing workout?"
                            confirmButtonText={'Discard'}
                            confirmButtonColor={"error"}
                            cancelButtonText={'Keep logging'}
                            onSubmit={() => dispatch(endWorkout())}
                        />
                    </Box>
                }
            </Box>
            <Divider sx={{ marginBottom: 4, marginTop: 2 }} />

            <ExerciseList type={type} />

            <Button
                variant="text"
                fullWidth
                sx={{ marginBottom: 2 }}
                component={Link}
                to='add-exercises'
                onClick={() => dispatch(resetSearch())}
            >
                <AddIcon sx={{ marginRight: 1 }} />
                Add exercise
            </Button>

            {/*   <AddExerciseToWorkoutModal
                openButton={
                    <Button variant="text" fullWidth sx={{ marginBottom: 2 }} onClick={() => dispatch(resetSearch())}>
                        <AddIcon sx={{ marginRight: 1 }} />
                        Add exercise
                    </Button>
                }
                onSubmit={addSelectedExercisesToStore}
            /> */}

        </div>
    )
}

export default Workout