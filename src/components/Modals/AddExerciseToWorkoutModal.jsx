import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';

import ModalRoot from './ModalRoot';
import HideAppBar from '../AppBar/HideAppBar';
import ExerciseToolbar from '../Exercise/ExercisesToolbar';
import FilteredExercises from '../Exercises/FilteredExercises';
import Exercises from '../Exercises/Exercises';

const AddExerciseToWorkoutModal = ({ handleClose, copyFunction, exercises }) => {
    return (
        <>
            <Box sx={{ overflow: 'scroll', maxHeight: 100 }} >
               {/*  <ModalRoot open={open} setOpen={setOpen} modalType={"createExercise"} />
                <HideAppBar drawerWidth={drawerWidth} >
                    <ExercisesToolbar input={input} setInput={setInput} setOpen={setOpen} />
                </HideAppBar> */}
                <FilteredExercises exercises={exercises} />
            </Box>
        </>
    )
}

export default AddExerciseToWorkoutModal 