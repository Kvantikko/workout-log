import { Box, Button, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ModalRoot from '../Modals/ModalRoot';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenModalMenu from '../Exercises/OpenModalMenu';

//import ArrowBackIcon from '@mui/icons-material/ArrowBac';




const ExerciseToolbar = ({ exercise }) => {
    console.log("EXERCISE ", exercise);

    return (
        <>
            <Stack direction={"row"} spacing={2} >
                <Button
                    variant='secondary'
                    component={Link}
                    to={'/exercises'}
                    sx={{
                        minWidth: 'auto',
                        paddingRight: 0,
                        paddingLeft: 0

                    }}
                >
                    <ArrowBackIcon />
                </Button>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ paddingY: 1.5 }}  // paddinY 1.5 for mobile, 2 for bigger
                >
                    {exercise.name}
                </Typography>
            </Stack>
            <OpenModalMenu exercise={exercise} showDateRange={true}  sx={{ paddingY: 1.5 }} />
        </>
    )

    return (
        <>
            <Stack direction={"row"} spacing={2} sx={{ padding: 0, alignItems: 'center', alignContent: 'center' }}>
                <Button
                    variant='secondary'
                    component={Link}
                    to={'/exercises'}
                    sx={{
                        minWidth: 'auto',
                        paddingRight: 0,
                        paddingLeft: 0

                    }}
                >
                    <ArrowBackIcon />
                </Button>
                <Typography variant="h6" component="div"
                    sx={{ paddingY: 1.5, margin: 0 }}  // paddinY 1.5 for mobile, 2 for bigger
                >
                    {exercise.name}
                </Typography>
            </Stack>
            <OpenModalMenu exercise={exercise} showDateRange={true} />
        </>
    )
}

export default ExerciseToolbar