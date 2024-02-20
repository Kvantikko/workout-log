import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedExercises, setSearch } from '../../redux/reducers/exerciseLibraryReducer'
import { unExpand } from '../../redux/reducers/drawerReducer'

import { Box, Modal, IconButton, Button, Slide, Stack, useMediaQuery, Container, Typography } from '@mui/material'
import { ArrowBack, Close, Done } from '@mui/icons-material'

import ExerciseList from '../Lists/ExerciseList'
import SearchInput from '../Inputs/SearchInput'
import ExerciseForm from '../Forms/ExerciseForm'
import PageModal from './PageModal'
import { useNavigate } from 'react-router-dom'

export const addExerciseToWorkoutStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw', md: '50vw' },
    height: { xs: '100svh', sm: '89%' },
    bgcolor: '#222326',
    borderRadius: 4,
    boxShadow: 24,
    overflow: 'hidden',
    display: 'flex',
}

const CreateExerciseModal = ({ openButton, onClose, onSubmit }) => {

    console.log("Rendering AddExerciseToWorkoutModal");

    const containerRef = useRef(null)
    const selectedExercises = useSelector(state => state.exerciseLibrary.selected.all)
    const isMobile = useMediaQuery('(max-width:600px)')
    const prevUrl = window.location.href

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        //onClose ? onClose() : null
        navigate("/workout-template")
    }

    const handleSubmit = () => {
        onSubmit(selectedExercises)
        dispatch(clearSelectedExercises())
        //setOpen(false)
    }

    const handleCreateClick = () => {
        setShowCreate(true)
        /*  window.history.pushState(null, null, `${window.location.href}#create`);
         window.onpopstate = () => {
             console.log("pop");
             setShowCreate(false)
             window.onpopstate = () => handleClose()
         } */
    }

    // if browser back button is pressed -> closes the modal
    /* useEffect(() => {
        if (open) {
            window.history.pushState(null, null, `${prevUrl}#add`);
            window.onpopstate = () => handleClose()
            return (() => {
                window.history.replaceState(null, null, `${prevUrl}`);
                window.onpopstate = () => dispatch(unExpand())
            })
        }
    }, [open]) */

    return (

        <PageModal
            hideBackDrop={true}
            onClose={handleClose}
            onAction={() => setShowCreate(true)}
            header={
                <Stack paddingX={2} paddingY={2} direction={"row"} alignItems={'center'}>
                    <IconButton
                        onClick={() => window.history.back()}
                        sx={{ marginRight: 1.5 }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant='h6'>Create Exercise</Typography>
                </Stack>
            }
        >
            {/*   <Box ref={containerRef} > */}

            <ExerciseForm
                onSubmit={handleClose}
                onCancel={handleClose}
                cancelButtonText={"Back"}
                confirmButtonText={"Create"}
                height={520}
            />



            {/* 
            <Box sx={{ width: 1 }}>
                <Slide in={!showCreate} direction="right" container={containerRef.current} appear={false}>
                    <div>
                        <Stack paddingX={3} paddingY={3} direction={"row"} justifyContent={"space-between"}>
                            <Button onClick={handleCreateClick}>
                                Create
                            </Button>
                            <Stack direction={"row"} gap={2}>
                                {!isMobile &&
                                    <Button variant="outlined" onClick={() => handleClose()} >
                                        Cancel
                                    </Button>
                                }
                                <Button
                                    variant="contained"
                                    disabled={selectedExercises.length === 0}
                                    onClick={() => handleSubmit()}
                                >
                                    {`Add (${selectedExercises.length})`}
                                </Button>
                            </Stack>
                        </Stack>
                    </div>
                </Slide>
            </Box> */}
            {/* 
            <Box sx={{ position: "absolute", width: 1, pointerEvents: showCreate ? "auto" : "none" }}>
                <Slide in={showCreate} direction="left" container={containerRef.current} >
                    <div>

                        <Box padding={5}>
                            <ExerciseForm
                                onSubmit={() => setShowCreate(false)}
                                onCancel={() => {
                                    setShowCreate(false)
                                    window.history.back()
                                }}
                                cancelButtonText={"Back"}
                                confirmButtonText={"Create"}
                                height={520}
                            />
                        </Box>
                    </div>
                </Slide>
            </Box> */}

            {/*       {!isMobile &&
                        <IconButton onClick={() => handleClose()} sx={{ position: "absolute", top: 15, right: 13, }}>
                            <Close></Close>
                        </IconButton>

                    } */}
            {/*   </Box> */}

        </PageModal>
    )
}

export default CreateExerciseModal