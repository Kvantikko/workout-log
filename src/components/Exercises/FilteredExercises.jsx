import { Stack, TextField, Divider, Box, Typography } from '@mui/material'
import { ListItem, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setExercisesPath } from '../../redux/reducers/navReducer'
import ExerciseListButton from './ExerciseListButton'

const FilteredExercises = ({ exercises, handleListClick }) => {
    const dispatch = useDispatch()

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
            {exercises.length === 0 && <Typography variant='h6'>No exercises found &#129300;</Typography>}
            {exercises.map(exercise =>
                <ExerciseListButton key={exercise.id} exercise={exercise} handleListClick={handleListClick} />
            )}
        </Stack>
    )
}

export default FilteredExercises