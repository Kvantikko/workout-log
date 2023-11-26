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
import OpenModalMenu from '../Exercises/ExercisesModalMenu';
import HistoryModalMenu from './HistoryModalMenu';
import { useDispatch } from 'react-redux';
import { resetHistory } from '../../redux/reducers/navReducer';

import ConfirmationModal from '../Modals/ConfirmationModal';

//import ArrowBackIcon from '@mui/icons-material/ArrowBac';

import useMediaQuery from '@mui/material/useMediaQuery';




const HistoryIdToolbar = ({ workout, handleCopy, showModal, setShowModal }) => {
    console.log("rendering HistoryIdToolbar.jsx");

    const isSmallScreen = useMediaQuery('(min-width:900px)');


    return (
        <>
            <Stack direction={"row"} spacing={2} overflow={'hidden'}>
                <Button
                    variant='secondary'
                    component={Link}
                    to={'/history'}
                    onClick={() => dispatch(resetHistory())}
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
                   // component="div"
                    sx={{ paddingY: 1.5, margin: 'auto' }}  // paddinY 1.5 for mobile, 2 for bigger
                    alignSelf={'center'}
                    overflow={'hidden'}
                    noWrap
                >
                    {workout.title}
                </Typography>
            </Stack>
            <Stack
                direction={"row"}
                spacing={2}
                padding={2}
                alignSelf={'flex-start'}
            >
                {/* padding={0}  joo mutta nimi menee pois koska suunnittelin niin sen jos on pitkä nimi*/}
                {isSmallScreen ?
                    <Button
                    
                        sx={{ height: 1, margin: 'auto', whiteSpace: 'nowrap',
                        textAlign: 'center'}}
                        variant="contained" onClick={(event) => handleCopy(event)} >
                        Perform again
                    </Button>
                    :
                    null
                }
                <HistoryModalMenu workout={workout} />
            </Stack>
        </>
    )
}

export default HistoryIdToolbar