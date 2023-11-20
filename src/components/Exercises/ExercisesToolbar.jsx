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


const ExercisesToolbar = ({ input, setInput, setOpen }) => {
    console.log("ExerciseToolbar rendering");
    const [showSearch, setShowSearch] = useState(false)


    const inputRef = useRef(null);

    /* useEffect(() => {
        if (inputRef !== null) {
            console.log("EFFECT AND NOT NULL");
            inputRef.current?.focus()
        }
    }) */

    const handleSearchClick = (event) => {
        setShowSearch(true)
    }

    const handleBlur = () => {
        console.log("blur happening");
        setShowSearch(false)
        setInput('')
        //console.log(inputRef.current);
        //inputRef.current.focus()
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

    return (
        <>
            {(!showSearch) &&
                <>
                    <Typography variant="h6" component="div" >
                        Exercises
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button color='info' variant="contained" onClick={handleSearchClick} >
                            <SearchIcon />
                        </Button>
                        <Button color='info' variant="contained" onClick={() => setOpen(true)}  >
                            <AddIcon />
                        </Button>
                    </Stack>
                </>
            }

            {(showSearch) &&
                <>
                    <Button variant="secondary"
                        sx={{
                            minWidth: 'auto',
                            paddingRight: 0.5,
                            paddingLeft: 0

                        }}
                    >
                        <ArrowBackIcon />
                    </Button>
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

                        //InputProps={{ sx: { borderRadius: 0 } }}
                        InputProps={{
                            sx: {
                                backgroundColor: '#3a88d6',
                                input: {
                                    color: 'white',
                                    //backgroundColor: '#42a1f5'
                                }
                            },
                            /* startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ), */
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
                </>
            }
        </>
    )
}

export default ExercisesToolbar