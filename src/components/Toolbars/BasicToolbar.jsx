import { Box, Button, Stack, TextField, Toolbar, IconButton } from '@mui/material'
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


//import ArrowBackIcon from '@mui/icons-material/ArrowBac';

import useMediaQuery from '@mui/material/useMediaQuery';






const BasicToolbar = ({ children, title, showBack, backFunction, link, handleCopy, menu, showModal, setShowModal }) => {
    console.log("rendering HistoryIdToolbar.jsx");

    const isSmallScreen = useMediaQuery('(min-width:900px)');

    const dispatch = useDispatch()


    return (

        <>
            <Stack direction={"row"} spacing={1} overflow={'hidden'}>
                {showBack &&
                    <IconButton component={Link}  to={link} onClick={backFunction} >
                        <ArrowBackIcon />
                    </IconButton>
                }
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginLeft: 1 }}
                    alignSelf={'center'}
                    overflow={'hidden'}
                    noWrap
                    margin={0}
                >
                    {title}
                </Typography>
            </Stack>

            <Stack
                direction={"row"}
                spacing={2}
                alignSelf={'flex-start'}
            >
                {/* {isSmallScreen ?
                    <Button

                        sx={{
                            height: 1, margin: 'auto', whiteSpace: 'nowrap',
                            textAlign: 'center', paddingY: 0.5, paddingX: 2

                        }}
                        variant="contained" onClick={(event) => handleCopy(event)} >
                        Perform again
                    </Button>
                    :
                    null
                } */}
                {children}
            </Stack>
        </>
    )
}

export default BasicToolbar