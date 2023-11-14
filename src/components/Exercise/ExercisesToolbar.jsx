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

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    //width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        // maxWidth: '60%',
        // marginLeft: 20,
        //marginRight: 20
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: "green"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        //width: "100%",
        width: "18ch",
        "&:focus": {
            width: "35ch"
        },
        [theme.breakpoints.down("sm")]: {
            width: "0ch",
            "&:focus": {
                width: "15.3ch",
                maxWidth: '100%'
            }
        }
    },
    //backgroundColor: 'yellow'
}));

const ExerciseToolbar = ({ exercise }) => {




    console.log("EXERCISE ", exercise);

    return (
        <>
            <Stack direction={"row"} spacing={2} >
                <Button
                    variant='secondary'
                    component={Link}
                    to={'/exercises'}
                    sx={{ minWidth: 0, padding: 0, margin: 0 }}>
                    <ArrowBackIcon />
                </Button>
                <Typography variant="h6" component="div" >
                    {exercise.name}
                </Typography>
            </Stack>
            <OpenModalMenu exercise={exercise} showDateRange={true} />
        </>
    )
}

export default ExerciseToolbar