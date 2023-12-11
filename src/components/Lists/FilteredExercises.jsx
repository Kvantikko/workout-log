import { Stack, Button, TextField, Divider, Box, Typography } from '@mui/material'
import { ListItem, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setExercisesPath } from '../../redux/reducers/navReducer'
import ExerciseListButton from '../Buttons/ExerciseListButton'
import Defer from '../Defer/Defer'
import CreateExerciseModal from '../Modals/CreateExerciseModal'
import { useState } from 'react'

const FilteredExercises = ({ exercises, handleListClick }) => {
    const dispatch = useDispatch()

    const [openCreateModal, setOpenCreateModal] = useState(false)

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
                <CreateExerciseModal
                    open={openCreateModal}
                    onClose={setOpenCreateModal}
                />
            }

        </Stack>
    )
}

export default FilteredExercises