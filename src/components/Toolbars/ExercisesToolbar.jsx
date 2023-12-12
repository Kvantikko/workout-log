import { Box, Button, Stack, TextField, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState, useRef, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { createExercise } from '../../redux/reducers/exerciseLibraryReducer';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CancelIcon from '@mui/icons-material/Cancel'
import ClearIcon from '@mui/icons-material/Clear';
import FormModal from '../Modals/FormModal';
import ExerciseForm from '../Forms/ExerciseForm';

import useMediaQuery from '@mui/material/useMediaQuery';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setSearch } from '../../redux/reducers/searchReducer';

import exerciseService from "../../services/exercises"



const ExercisesToolbar = ({ input, setInput, setOpen }) => {
    console.log("Rendering ExerciseToolbar ");

    const searchState = useSelector(state => state.search)

    const [showFullWidthSearch, setShowFullWidthSearch] = useState(searchState.showFullWidth)
    const [openAddModal, setOpenAddModal] = useState(false)


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
        //console.log("handling blur...")
        dispatch(
            setSearch({
                searchString: input,
                showFullWidth: showFullWidthSearch
            })
        )
    }

    const saveExercise = async (exerciseName, targetMuscle) => {
        try {
            const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
            console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
            dispatch(createExercise(newExercise))
            toast.success('New exercsise created!')
            setOpenAddModal(false)
        } catch (err) {
            toast.error(err.response)
        }

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
                //onFocus={() => console.log("FOCUSED")}
                onBlur={handleBlur}
                //onClick={() => console.log("clicked textf")}
                //onMouseDown={() => console.log("mousse down textf")}
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

                            <IconButton aria-label="search" sx={{ color: '#90CAF9' }} onClick={handleSearchClick}>
                                <SearchIcon />
                            </IconButton>

                        }

                        <IconButton aria-label="add" sx={{ color: '#90CAF9' }} onClick={() => setOpenAddModal(true)} >
                            <AddIcon />
                        </IconButton>
                        {openAddModal &&
                            <FormModal
                                open={openAddModal}
                                onClose={() => setOpenAddModal(false)}
                                title="Create exercise"
                            >
                                <ExerciseForm onSubmit={saveExercise} onCancel={() => setOpenAddModal(false)} />
                            </FormModal>
                        }
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

                            <IconButton aria-label="cancel" color="error" onClick={handleSearchClick}>
                                <SearchIcon />
                            </IconButton>
                            /*  <Button
                                 variant="contained"
                                 onClick={handleSearchClick}
                             >
                                
                             </Button> */


                        }
                        {openAddModal &&
                            <FormModal
                                open={openAddModal}
                                onClose={() => setOpenAddModal(false)}
                                title="Create exercise"
                            >
                                <ExerciseForm onSubmit={saveExercise} onCancel={() => setOpenAddModal(false)} />
                            </FormModal>
                        }
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