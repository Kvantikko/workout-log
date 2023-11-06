import { Button, Divider, Box, Stack, Typography } from '@mui/material'


import BasicMenu from './OpenModalMenu';
import ListItemMenu from './OpenModalMenu';
import OpenModalMenu from './OpenModalMenu';

const ExerciseListItem = ({ exercise }) => {

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
                <OpenModalMenu exercise={exercise} />
            </Stack>
        </Stack>
        <Divider style={{ width: '100%' }} />
        </>
    )
}

export default ExerciseListItem