import { Stack, Button, TextField, Divider, Box, Typography } from '@mui/material'
import { ListItem, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setExercisesPath } from '../../redux/reducers/navReducer'
import ExerciseListButton from '../Buttons/ExerciseListButton'
import Defer from '../Defer/Defer'
import { useState } from 'react'
import FormModal from '../Modals/FormModal'
import ExerciseForm from '../Forms/ExerciseForm'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'
import { toast } from 'react-toastify'
import exerciseService from "../../services/exercises"

const FilteredExercises = ({ exercises, handleListClick }) => {

    const [openCreateModal, setOpenCreateModal] = useState(false)

    const dispatch = useDispatch()

    const saveExercise = async (exerciseName, targetMuscle) => {
        try {
            const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
            console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
            dispatch(createExercise(newExercise))
            toast.success('New exercsise created!')
            setOpenCreateModal(false)
        } catch (err) {
            toast.error(err.response)
        }

    }

    // use List instead of Stack?
    return (

        <Stack
            spacing={0}
            sx={{
                //marginTop: 2,
                // paddingX: { xs: 0, sm: 2, md: 4 },
                //overflow: "hidden",
                //textOverflow: 'ellipsis',
                // width: 1,
            }}
        >
            {exercises.length === 0 &&
                <Stack spacing={2} paddingTop={6}>
                    <Typography variant='h6' textAlign={'center'}>No matches found</Typography>
                    <Button onClick={() => setOpenCreateModal(true)}>Create exercise</Button>
                </Stack>
            }
            {exercises.map(exercise =>
                <Defer key={exercise.id} chunkSize={10}>
                    <ExerciseListButton exercise={exercise} handleListClick={handleListClick} />
                </Defer>
            )}
            {openCreateModal &&
                <FormModal
                    open={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    title="Create exercise"
                >
                    <ExerciseForm onSubmit={saveExercise} onCancel={() => setOpenCreateModal(false)} />
                </FormModal>
            }
        </Stack>
    )
}

export default FilteredExercises