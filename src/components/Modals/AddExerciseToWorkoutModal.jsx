import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, Button, TextField, Stack, Modal, Typography, FormControl, InputLabel, Select, MenuItem, Fab, IconButton } from '@mui/material'
import ExerciseList from '../Lists/ExerciseList'

import WarningIcon from '@mui/icons-material/Warning'
import BasicModal from './BasicModal'
import { toast } from 'react-toastify'
import SearchInput from '../Inputs/SearchInput'
import exercises from '../../services/exercises'
import { Cancel, Close, Done } from '@mui/icons-material'
import CloseModalButton from '../Buttons/CloseModalButton'
import { clearSelectedExercises } from '../../redux/reducers/selectedExercisesReducer'

export const addExerciseToWorkoutStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw' },
    height: { xs: '100vh', sm: '90%' },
    //maxHeight: '100%',
    // maxWidth: 550,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
}

const AddExerciseToWorkoutModal = ({ open, onClose, confirmFunction }) => {
    console.log("Rendering AddExerciseToWorkoutModal");

    const exercisesFromStore = useSelector(state => state.exerciseLibrary)
    const [visibleExercises, setVisibleExercises] = useState(exercisesFromStore)
    const selectedExerciseIds = useSelector(state => state.selectedExercises.allIds)
    const selectedExercises = useSelector(state => state.selectedExercises.allIds.map(id =>
        state.selectedExercises.byId[id]
    ))
    //const [selectedExercises, setSelectedExercises] = useState([])

    const dispatch = useDispatch()


    /*  const handleToggle = useCallback((exercise) => {
         const currentIndex = selectedExercises.indexOf(exercise)
         const newChecked = [...selectedExercises]
 
         console.log("CURRENT INDEX ", currentIndex);
 
         if (currentIndex === -1) {
             // add
             newChecked.push(exercise);
         } else {
             // remove
             newChecked.splice(currentIndex, 1);
         }
 
         console.log("NEW SELECTED ", newChecked);
         setSelectedExercises(newChecked);
     }, [selectedExercises]) */

    /* const dispatch = useDispatch()
    const ref = useRef(null); */
    /*  useEffect(() => {
         console.log("EFFECT HAPPENING");
         ref.current?.scrollIntoView({ behavior: 'smooth' });
     }, [selectedExercises]) */

    const handleClose = () => {
        onClose()
        dispatch(clearSelectedExercises())
    }

   const AddExercisesToWorkout = () => {
        confirmFunction(selectedExercises)
        dispatch(clearSelectedExercises())    
    }

    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backdropFilter: 'blur(3px)'
                },
            }}
        >
            <div>
                <CloseModalButton onClick={handleClose} />

                <Box sx={addExerciseToWorkoutStyle}>

                    <Box paddingX={2}>
                        <SearchInput
                            exercises={exercisesFromStore}
                            setVisibleExercises={setVisibleExercises}
                            placeholder={'Search exercises'}
                        />
                    </Box>

                    {selectedExerciseIds.length !== 0 &&
                        <Fab
                            onClick={() => AddExercisesToWorkout()}
                            color='info'
                            sx={{
                                position: 'absolute',
                                bottom: 30,
                                right: 100,
                                //backgroundColor: theme => theme.palette.primary.light
                            }} >
                            <Done />
                        </Fab>
                    }

                    <Box sx={{ overflowY: 'scroll', height: '80vh' }}  >
                        <ExerciseList exercises={visibleExercises} showChecked={true} />
                    </Box>

                </Box>
            </div>
        </Modal>
    )
}

export default AddExerciseToWorkoutModal