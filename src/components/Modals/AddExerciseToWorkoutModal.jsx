import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedExercises, setSearch } from '../../redux/reducers/exerciseLibraryReducer'

import { Box, Modal, Fab } from '@mui/material'
import { Done } from '@mui/icons-material'

import ExerciseList from '../Lists/ExerciseList'
import SearchInput from '../Inputs/SearchInput'
import CloseModalButton from '../Buttons/CloseModalButton'

export const addExerciseToWorkoutStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw' },
    height: { xs: '100vh', sm: '90%' },
    //maxHeight: '100%',
    // maxWidth: 550,
    bgcolor: '#222326',
    borderRadius: 4,
    //border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
}

const AddExerciseToWorkoutModal = ({ open, onClose, confirmFunction }) => {

    console.log("Rendering AddExerciseToWorkoutModal");

    const selectedExercises = useSelector(state => state.exerciseLibrary.selected.all)

    const dispatch = useDispatch()

    /* 
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

                    <Box paddingX={2} paddingY={2}>
                        <SearchInput />
                    </Box>

                    {selectedExercises.length !== 0 &&
                        <Fab
                            onClick={() => AddExercisesToWorkout()}
                            color='info'
                            sx={{ position: 'absolute', bottom: 30, right: 100 }}
                        >
                            <Done />
                        </Fab>
                    }

                    <Box sx={{ overflowY: 'scroll', height: '80vh' }}  >
                        <ExerciseList showChecked={true} />
                    </Box>

                </Box>
            </div>
        </Modal>
    )
}

export default AddExerciseToWorkoutModal