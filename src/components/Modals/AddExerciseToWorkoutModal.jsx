import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedExercises, setSearch } from '../../redux/reducers/exerciseLibraryReducer'

import { Box, Modal, Fab, IconButton, Button, Stack, useMediaQuery } from '@mui/material'
import { ArrowBack, Close, Done } from '@mui/icons-material'

import ExerciseList from '../Lists/ExerciseList'
import SearchInput from '../Inputs/SearchInput'
import CloseModalButton from '../Buttons/CloseModalButton'

export const addExerciseToWorkoutStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw', md: '50vw' },
    height: { xs: '100vh', sm: '89%' },
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
    const isMobile = useMediaQuery('(max-width:600px)')

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
                {/*       <CloseModalButton onClick={handleClose} /> */}

                <Box sx={addExerciseToWorkoutStyle}>

                    {/*     <IconButton
                        onClick={() => handleClose()}
                        sx={{
                            position: "absolute",
                            right: -20,
                            top: -20,
                            border: "solid"
                        }}
                    >
                        <Close></Close>
                    </IconButton> */}

                    <Stack paddingX={2} paddingY={2} direction={"row"}>
                        {isMobile &&
                            <IconButton onClick={() => handleClose()} sx={{ paddingRight: 1.5 }}>
                                <ArrowBack />
                                {/*  <Close></Close> */}
                            </IconButton>
                        }
                        <SearchInput />
                        {!isMobile &&
                            /*   <Button color='error'>
                                  <Close/>
                              </Button> */
                            <IconButton onClick={() => handleClose()} sx={{ marginLeft: 2, marginRight: 0 }}>
                                <Close></Close>
                            </IconButton>
                        }
                    </Stack>

                    <Box sx={{ overflowY: 'scroll', height: isMobile ? '89vh' : '79vh' }}  >
                        <ExerciseList showChecked={true} />
                    </Box>

                    {selectedExercises.length !== 0 &&
                        <Fab
                            onClick={() => AddExercisesToWorkout()}
                            color='info'
                            sx={{ position: 'absolute', bottom: 25, right: 25 }}
                        >
                            <Done />
                        </Fab>
                    }

                </Box>
            </div>
        </Modal>
    )
}

export default AddExerciseToWorkoutModal