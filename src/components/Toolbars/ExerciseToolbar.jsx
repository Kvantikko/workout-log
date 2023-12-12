import { Box, Button, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExercisesMenu from '../Menus/ExerciseMenu';

import useMediaQuery from '@mui/material/useMediaQuery';

import { useDispatch } from 'react-redux';

import { setExercisesPath, resetExercisePath} from '../../redux/reducers/navReducer';





const ExerciseToolbar = ({ exercise }) => {

    const [openEdit, setOpenEdit] = useState(false)

    const dispatch = useDispatch()

    const isSmallScreen = useMediaQuery('(min-width:900px)')


    

    return (
        <>
            <Stack direction={"row"} spacing={2} >

                <Button
                    variant='secondary'
                    component={Link}
                    to={'/exercises'}
                    onClick={() => dispatch(resetExercisePath())}
                    sx={{
                        minWidth: 'auto',
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginRight: 0,

                        textTransform: 'none'
                    }}
                >
                    <ArrowBackIcon />
                    {isSmallScreen ?
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ padding: 0, margin: '0 !important' }}

                            //alignSelf={'center'}
                            //overflow={'hidden'}
                            noWrap
                        >
                            {`Exercises /`}
                        </Typography>
                        :
                        null
                    }
                </Button>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ paddingY: 1.5 }}  // paddinY 1.5 for mobile, 2 for bigger
                >
                    {exercise.name}
                </Typography>
            </Stack>
            <ExercisesMenu exercise={exercise} showDateRange={true} sx={{ paddingY: 1.5 }} />
        </>
    )
}

export default ExerciseToolbar