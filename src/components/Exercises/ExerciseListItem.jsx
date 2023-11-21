import { Button, Divider, Box, Stack, Typography } from '@mui/material'


import BasicMenu from './ExercisesModalMenu';
import ListItemMenu from './ExercisesModalMenu';
import OpenModalMenu from './ExercisesModalMenu';
import { Link } from "react-router-dom"

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const ExerciseListItem = ({ exercise }) => {

    return (
        <>
            <Stack
                direction='row'
                spacing={3}
                sx={{
                    overflow: "hidden",
                    textOverflow: 'ellipsis',
                    width: '1',
                    justifyContent: 'space-between',
                    alignItems: 'center' // aligns the exercise name (and other components) horizontally
                }}
            >
                <Typography noWrap>
                    {exercise.name}
                </Typography>
                <Stack direction='row'  >
                    <Button
                        variant="contained"
                        sx={{ maxHeight: 1 }}
                        component={Link} to={`/exercises/${exercise.id}`}>
                        <ArrowForwardIcon />
                    </Button >
                    <OpenModalMenu exercise={exercise} />
                </Stack>
            </Stack>
            <Divider style={{ width: '100%' }} />
        </>
    )
}

export default ExerciseListItem