import { Box, Button, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenModalMenu from '../Menus/ExerciseMenu';
import HistoryModalMenu from '../Menus/HistoryMenu';
import { useDispatch } from 'react-redux';
import { resetHistory } from '../../redux/reducers/navReducer';

import { setWorkoutPath, resetWorkoutPath } from "../../redux/reducers/navReducer"


//import ArrowBackIcon from '@mui/icons-material/ArrowBac';

import useMediaQuery from '@mui/material/useMediaQuery';
import TemplateMenu from '../Menus/TemplateMenu';





const TemplateToolbar = ({ workout, handleCopy, showModal, setShowModal }) => {
    console.log("rendering HistoryIdToolbar.jsx");

    const isSmallScreen = useMediaQuery('(min-width:900px)');

    const dispatch = useDispatch()


    return (
        <>
            <Stack direction={"row"} spacing={0} overflow={'hidden'}>
                <Button
                    variant='secondary'
                    component={Link}
                    to={'/'}
                    onClick={() => dispatch(resetWorkoutPath())}
                    sx={{
                        minWidth: 'auto',
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 0,

                        textTransform: 'none'
                    }}
                >
                    <ArrowBackIcon sx={{ marginRight: isSmallScreen ? 1 : 0 }} />
                    {isSmallScreen ?
                        <Typography
                            variant="h6"

                            //sx={{ paddingY: 1.5, marginY: 'auto' }} 
                            alignSelf={'center'}
                            overflow={'hidden'}
                            noWrap
                        >
                            {`Workout /`}
                        </Typography>
                        :
                        null
                    }
                </Button>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginLeft: 1 }}
                    alignSelf={'center'}
                    overflow={'hidden'}
                    noWrap
                    margin={0}
                >
                    {`${workout.title}`}
                </Typography>
            </Stack>




            <Stack
                direction={"row"}
                spacing={2}
                padding={2}
                alignSelf={'flex-start'}
            >

                {isSmallScreen ?
                    <Button

                        sx={{
                            height: 1, margin: 'auto', whiteSpace: 'nowrap',
                            textAlign: 'center', paddingY: 0.5, paddingX: 2

                        }}
                        variant="contained" onClick={(event) => handleCopy(event)} >
                        Start workout
                    </Button>
                    :
                    null
                }
                <TemplateMenu workout={workout} />
            </Stack>
        </>
    )
}

export default TemplateToolbar