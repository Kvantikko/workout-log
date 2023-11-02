import { Button, Divider, Box, Stack, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import exerciseService from '../../services/exercises'

import EditExerciseModal from './EditExerciseModal';

import { useDispatch } from 'react-redux';

import { removeExercise, updateExercise } from '../../redux/reducers/exerciseLibraryReducer'
import DeleteExerciseModal from './DeleteExerciseModal';


import BasicMenu from './ListItemMenu';
import ListItemMenu from './ListItemMenu';

const ExerciseListItem = ({ exercise }) => {
    const dispatch = useDispatch()

    const deleteExercise = async () => {
        const response = await exerciseService.remove(exercise.id)
        console.log('delete response: ', response);
        dispatch(removeExercise(exercise.id))
    }

    const editExercise = async () => {
        const response = await exerciseService.update(exercise.id)
        console.log('update response: ', response);
        //dispatch(updateExercise(exercise.id))
    }

    return (
        <>
        <Stack
            direction='row'
            spacing={3}
            sx={{ overflow: "hidden", textOverflow: 'ellipsis', width: '1', justifyContent: 'space-between' }}
            >
            <Typography noWrap >
                {exercise.name}
            </Typography>
            <Stack direction='row'  >
                <Button
                    variant="contained"
                    sx={{ maxHeight: 1 }}
                    onClick={() => console.log('tää nappi pitäis viedä liikkeen historiaan')}>
                    View
                </Button >
                <ListItemMenu exercise={exercise} ></ListItemMenu>
            </Stack>
        </Stack>
        <Divider style={{ width: '100%' }} />
        </>
    )
}

export default ExerciseListItem