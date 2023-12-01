import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'



import { Box, Button, Modal, TextField, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import FilteredExercises from '../Exercises/FilteredExercises'
import Exercises from '../Exercises/Exercises'

import { addExercises } from '../../redux/reducers/exerciseReducer'
import generateId from '../../utils/generateId'


import WarningIcon from '@mui/icons-material/Warning'
import BasicModal from './BasicModal'
import { toast } from 'react-toastify'

const AddExerciseToWorkoutModal = ({ open, onClose, confirmFunction }) => {
    console.log("Rendering AddExerciseToWorkoutModal");

    const [exercises, setExercises] = useState([])

    const dispatch = useDispatch()

    const newExercise = (exercise) => {
        setExercises(exercises.concat(exercise))
    }

    const handleClick = (event) => {
        setExercises(exercises.filter(e => e.id !== parseInt(event.target.id)))
    }

/*     const handleSubmit = () => {
        console.log("handlesubmit");
        confirmFunction(exercises)
    } */

    const addExercisesToStore = () => {
        console.log("addExercises");
        const exercisesToBeAdded = exercises.map(e => {
            const exercise = {
                id: generateId(),
                name: e.name,
                createdAt: null, //new Date().toJSON(),
                note: "",
            }
            return exercise
        })

        if (exercisesToBeAdded.length === 0) {
            toast.info("You didn't select any exercises!")
            return
        }

        dispatch(addExercises(exercisesToBeAdded))
    }

    const getContent = () => {
        return (
            <>
                <Box sx={{ overflowY: 'scroll', height: 400, paddingBottom: 4 }} >
                    <Exercises handleListClick={newExercise} />

                    {/*       <FilteredExercises exercises={exercises} /> */}
                </Box>
                <Stack direction={'row'} flexWrap={'wrap'} >
                    {exercises.map(e => {
                        return (
                            <Box
                                key={e.id}
                                display='flex'
                                flexDirection={'row'}
                                sx={{
                                    width: 'fit-content',
                                    overflow: 'hidden',
                                    border: 1,
                                    borderRadius: 2,
                                    borderColor: theme => theme.palette.primary.light,
                                    paddingY: 0.5,
                                    paddingX: 1,
                                    margin: 0.5
                                }}
                            >
                                <Typography nowrap='true' >{e.name}</Typography>
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
                </Stack>
            </>
        )
    }







    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Select exercises"
            //subTitle="Discard ongoing workout?"
            confirmButtonText={'Add'}
            //cancelButtonText={'Keep logging'}
            content={getContent()}
            onSubmit={addExercisesToStore}
        />

    )
}

export default AddExerciseToWorkoutModal