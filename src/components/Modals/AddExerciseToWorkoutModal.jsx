import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedExercises, setSearch } from '../../redux/reducers/exerciseLibraryReducer'
import { unExpand } from '../../redux/reducers/drawerReducer'

import { Box, Modal, IconButton, Tab, Tabs, Button, Slide, Stack, useMediaQuery, Container, Typography, Toolbar, Fab } from '@mui/material'
import { ArrowBack, Close, Done } from '@mui/icons-material'

import ExerciseList from '../Lists/ExerciseList'
import SearchInput from '../Inputs/SearchInput'
import ExerciseForm from '../Forms/ExerciseForm'
import PageModal from './PageModal'
import { Outlet, useNavigate } from 'react-router-dom'
import { addExercisesToWorkout } from '../../redux/reducers/workoutReducer'
import { addExercisesToTemplate } from '../../redux/reducers/templateReducer'

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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AddExerciseToWorkoutModal = ({ openButton, onClose, onSubmit }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("Rendering AddExerciseToWorkoutModal");

    const selectedExercises = useSelector(state => state.exerciseLibrary.selected.all)
    const prevUrl = window.location.href
    const searchString = useSelector(state => state.exerciseLibrary.search.searchString)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        onClose ? onClose() : null
        //setOpen(false)
        dispatch(clearSelectedExercises())
        window.history.back()
    }

    const handleSubmit = () => {
        //onSubmit(selectedExercises)
        dispatch(addExercisesToTemplate(selectedExercises))
        //dispatch(clearSelectedExercises())
        navigate(-1)
    }

    const handleCreateClick = () => setValue(1)

    return (

        <PageModal

            onClose={handleClose}
            onAction={() => navigate("/workout-template/create-exercise")}
            header={
                <Box >
                    <Typography variant='h6'>Add exercises</Typography>
                </Box>
            }
            secondaryHeader={
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                        <Tabs value={value} onChange={handleChange} variant="fullWidth"  >
                            <Tab label="Search" {...a11yProps(0)} />
                            <Tab label="Create" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    {value === 0 ?
                        <Box sx={{ paddingX: 3, paddingTop: 3, paddingBottom: 2 }}>
                            <SearchInput />
                        </Box>
                        :
                        null
                    }
                </>
            }
            hideFooter={true}

        >
            <Box sx={{ width: '100%' }}>
                <CustomTabPanel value={value} index={0} >
                    <ExerciseList showChecked={true} handleCreateClick={handleCreateClick} />
                    {selectedExercises.length > 0 &&
                        <Fab
                            onClick={handleSubmit}
                            color='info'
                            sx={{ position: 'absolute', top: { xs: "88svh", sm: "79svh" }, right: { xs: 20, sm: 30 } }}
                        >
                            <Done />
                            {` ${selectedExercises.length}`}
                        </Fab>
                    }

                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} >
                    {/*  <Stack paddingX={2} paddingY={2} direction={"row"} alignItems={'center'}>
                        <IconButton
                            onClick={() => {
                                setShowCreate(false)
                                window.history.back()
                            }}
                            sx={{ marginRight: 1.5 }}
                        >
                            <ArrowBack />
                        </IconButton>

                    </Stack> */}
                    <Box sx={{ p: 3 }}>
                        <ExerciseForm
                            onSubmit={handleClose}
                            cancelButtonText={"Back"}
                            confirmButtonText={"Create"}
                            exercise={{ name: searchString }}
                        //height={520}


                        />
                    </Box>

                </CustomTabPanel>
            </Box>

            {/*   <Box ref={containerRef} > */}

            {/* !showCreate ?
                <ExerciseList showChecked={true} handleCreateClick={handleCreateClick} />
                :
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
                */}




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
            <Outlet></Outlet>
        </PageModal>
    )
}

export default AddExerciseToWorkoutModal