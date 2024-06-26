import { useState, useRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
//import { setSearch } from '../../redux/reducers/searchReducer'
import { saveExercise, setSearch } from '../../redux/reducers/exerciseLibraryReducer'

import { Box, Stack, IconButton, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import useMediaQuery from '@mui/material/useMediaQuery'

import ExerciseForm from '../Forms/ExerciseForm'
import FormModal from '../Modals/FormModal'
import SearchInput from '../Inputs/SearchInput'

const ExercisesToolbar = () => {

    const showFullWidthSearch = useSelector(state => state.exerciseLibrary.search.showFullWidth)
    const [openAddModal, setOpenAddModal] = useState(false)

    const isSmallScreen = useMediaQuery('(max-width:700px)');
    const inputRef = useRef(null);
    const dispatch = useDispatch()

    const handleSearchClick = (event) => {
        dispatch(
            setSearch({
                searchString: '',
                showFullWidth: true
            })
        )
    }

    const handleBackClick = (event) => {
        dispatch(
            setSearch({
                searchString: '',
                showFullWidth: false
            })
        )
    }

    const handleSave = (exerciseName, targetMuscle) => {
        setOpenAddModal(false)
        dispatch(saveExercise(exerciseName, targetMuscle))
    }

    return (
        <>
            {!showFullWidthSearch &&
                <>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} >
                        <Typography variant="h6" component="div" >
                            Exercises
                        </Typography>
                    </Box>

                    {!isSmallScreen &&
                        <Box sx={{ width: "100%", paddingX: 2 }}>
                            <SearchInput />
                        </Box>
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
                                <ExerciseForm onSubmit={handleSave} onCancel={() => setOpenAddModal(false)} />
                            </FormModal>
                        }
                    </Stack>
                </>
            }

            {showFullWidthSearch && !isSmallScreen &&
                <>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} >
                        <Typography variant="h6" component="div" >
                            Exercises
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%", paddingX: 2 }}>
                        <SearchInput />
                    </Box>
                    <Stack direction="row" spacing={2}>
                        {isSmallScreen &&
                            <IconButton aria-label="cancel" color="error" onClick={handleSearchClick}>
                                <SearchIcon />
                            </IconButton>
                        }
                        {openAddModal &&
                            <FormModal
                                open={openAddModal}
                                onClose={() => setOpenAddModal(false)}
                                title="Create exercise"
                            >
                                <ExerciseForm onSubmit={handleSave} onCancel={() => setOpenAddModal(false)} />
                            </FormModal>
                        }
                    </Stack>
                </>
            }

            {isSmallScreen && showFullWidthSearch &&
                <>
                    <IconButton
                        onClick={handleBackClick}
                        sx={{ marginRight: 1 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <SearchInput />
                </>
            }
        </>
    )
}

export default ExercisesToolbar