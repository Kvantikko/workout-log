import { Box, Button, Stack, TextField, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ModalRoot from '../Modals/ModalRoot';
import { useState, useRef, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CancelIcon from '@mui/icons-material/Cancel'
import ClearIcon from '@mui/icons-material/Clear';
import FormModal from '../Modals/FormModal';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';

import { setSearch } from '../../redux/reducers/searchReducer';



const ExercisesToolbar = ({ input, setInput, setOpen }) => {
    console.log("ExerciseToolbar rendering");

    const searchState = useSelector(state => state.search)

    const [showFullWidthSearch, setShowFullWidthSearch] = useState(searchState.showFullWidth)
    

    const isSmallScreen = useMediaQuery('(max-width:700px)');

    const inputRef = useRef(null);

    const dispatch = useDispatch()

    useEffect(() => {
        setInput(searchState.searchString)
        setShowFullWidthSearch(searchState.showFullWidth)
    }, [])

    const handleSearchClick = (event) => {
        setShowFullWidthSearch(true)
    }

    const handleClick = () => {
        //console.log("blur happening");
        if (isSmallScreen) {

        }
        setShowFullWidthSearch(false)
        setInput('')
        dispatch(
            setSearch({
                searchString: '',
                showFullWidth: false
            })
        )

        //setInput('')
        //console.log(inputRef.current);
        //inputRef.current.focus()
    }

    const handleBlur = () => {
        console.log("handling blur...")
        dispatch(
            setSearch({
                searchString: input,
                showFullWidth: showFullWidthSearch
            })
        )
    }

    const handleClear = (event) => {

        inputRef.current.focus()
        //event.stopPropagation()
    }

    const handleMouseDown = (event) => {
        event.preventDefault()

        //event.stopPropagation()
        setInput('')
        inputRef.current.focus()
        //setShowSearch(true)
    }

    const searchInput = () => {

        return (
            <TextField
                //label="Search field"
                ref={inputRef}
                size='small'
                type="text"
                variant="outlined"
                placeholder="Search"
                autoFocus
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onFocus={() => console.log("FOCUSED")}
                onBlur={handleBlur}
                onClick={() => console.log("clicked textf")}
                onMouseDown={() => console.log("mousse down textf")}
                fullWidth
                sx={{ paddingX: { xs: 0, sm: 4 } }}
                //width={1000}


                //InputProps={{ sx: { borderRadius: 0 } }}
                InputProps={{
                    sx: {
                        //backgroundColor: '#3a88d6',
                        input: {
                            //color: 'white',
                            //backgroundColor: '#42a1f5'
                        }
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: input && (
                        <IconButton
                            onClick={() => console.log("clicked clear button")}
                            onMouseDown={handleMouseDown}
                            color='white'
                        >
                            <ClearIcon sx={{ color: 'white' }} />
                        </IconButton>
                    )
                }}
            />

        )

    }

    return (
        <>
            {!showFullWidthSearch &&
                <>
                    <Typography variant="h6" component="div" >
                        Exercises
                    </Typography>

                    {!isSmallScreen &&
                        searchInput()
                    }

                    <Stack direction="row" spacing={2}>
                        {isSmallScreen &&
                            <Button
                                variant="contained"
                                onClick={handleSearchClick}
                            >
                                <SearchIcon />
                            </Button>
                        }
                        <FormModal
                            modalType='createExercise'
                            openButton={
                                <AddIcon />
                            }
                            confirmButton='Create'
                        />
                    </Stack>
                </>
            }

            {showFullWidthSearch && !isSmallScreen &&
                <>
                    <Typography variant="h6" component="div" >
                        Exercises
                    </Typography>
                    {searchInput()}
                    <Stack direction="row" spacing={2}>
                        {isSmallScreen &&
                            <Button
                                variant="contained"
                                onClick={handleSearchClick}
                            >
                                <SearchIcon />
                            </Button>
                        }
                        <FormModal
                            modalType='createExercise'
                            openButton={
                                <AddIcon />
                            }
                            confirmButton='Create'
                        />
                    </Stack>
                </>
            }


            {isSmallScreen && showFullWidthSearch &&
                <>
                    <Button variant="secondary"
                        onClick={handleClick}
                        sx={{
                            minWidth: 'auto',
                            paddingRight: 0.5,
                            paddingLeft: 0

                        }}
                    >
                        <ArrowBackIcon />
                    </Button>
                    {searchInput()}
                </>
            }
        </>
    )
}

export default ExercisesToolbar