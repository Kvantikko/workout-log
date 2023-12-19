import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, Button, TextField, Stack, Modal, Typography, FormControl, InputLabel, Select, MenuItem, Fab } from '@mui/material'
import FilteredExercises from '../Lists/FilteredExercises'

import WarningIcon from '@mui/icons-material/Warning'
import BasicModal from './BasicModal'
import { toast } from 'react-toastify'
import SearchInput from '../Inputs/SearchInput'
import exercises from '../../services/exercises'
import { Cancel, Close, Done } from '@mui/icons-material'

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
    const [selectedExercises, setSelectedExercises] = useState([])
    const [visibleExercises, setVisibleExercises] = useState(exercisesFromStore)

    const dispatch = useDispatch()
    const ref = useRef(null);

    useEffect(() => {
        //console.log("EFFECT HAPPENING");
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedExercises])

    const newExercise = (exercise) => {
        setSelectedExercises(selectedExercises.concat(exercise))
    }

    const handleClick = (event) => {
        setSelectedExercises(selectedExercises.filter(e => e.id !== parseInt(event.target.id)))
    }

    /* const addExercisesToStore = () => {
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
        dispatch(addExercises(exercisesToBeAdded))
        onClose()
    } */

    const getContent = () => {
        return (
            <>

                <Stack direction={'row'} paddingLeft={3}>
                    <SearchInput
                        exercises={exercisesFromStore}
                        setVisibleExercises={setVisibleExercises}
                        placeholder={'Search exercises'}
                    />
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Button
                            onClick={() => onClose()}
                            sx={{ minWidth: 0, maxHeight: 1, marginRight: 1, marginLeft: 2 }}
                        >
                            <Close></Close>
                        </Button>
                    </Box>



                </Stack>

                <Box
                    overflow='hidden'
                    sx={{
                        width: '100%',
                        paddingTop: 0.5,
                        paddingBottom: 1.5,
                        paddingX: 1,
                        overflowX: 'auto'
                    }}
                >
                    {/*  <Stack direction={'row'} flexWrap={'nowrap'} sx={{}}  >
                        {selectedExercises.map(e => {
                            return (
                                <Box
                                    ref={ref}
                                    key={e.id}
                                    display='flex'
                                    flexDirection={'row'}
                                    sx={{
                                        width: 'fit-content',
                                        minWidth: 'fit-content',
                                        overflow: 'hidden',
                                        border: 1,
                                        borderRadius: 2,
                                        borderColor: theme => theme.palette.primary.light,
                                        paddingY: 0.5,
                                        paddingX: 1,
                                        margin: 0.5
                                    }}
                                >
                                    <Typography nowrap='true' whiteSpace={'nowrap'}>{e.name}</Typography>
                                    <Button
                                        variant='text'
                                        sx={{ minWidth: 0, paddingY: 0, paddingRight: 0.4 }} id={e.id}
                                        onClick={(event) => handleClick(event)}
                                    >
                                        X
                                    </Button>
                                </Box>
                            )

                        })}
                    </Stack> */}
                </Box>

                {selectedExercises.length !== 0 &&

                    <Fab
                        onClick={() => confirmFunction(selectedExercises)}
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






                <Box sx={{ overflowY: 'scroll', height: '78vh', paddingBottom: 4 }}  >
                    {/*   <Exercises handleListClick={newExercise} /> */}


                    <FilteredExercises exercises={visibleExercises} handleListClick={newExercise} showChecked={true} />

                </Box>

            </>
        )
    }

    return (
        <Modal
            open={open}
            onClose={() => onClose()}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backdropFilter: 'blur(3px)'
                },
            }}
        >
            <Box sx={addExerciseToWorkoutStyle}>
                {getContent()}
            </Box>
        </Modal>


        /* 
                <BasicModal
                    open={open}
                    onClose={onClose}
                    //title="Select exercises"
                    //subTitle="Discard ongoing workout?"
                    confirmButtonText={'Add'}
                    //cancelButtonText={'Keep logging'}
                    content={getContent()}
                    onSubmit={addExercisesToStore}
                /> */

    )
}

export default AddExerciseToWorkoutModal