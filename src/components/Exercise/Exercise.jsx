
import ExerciseToolbar from './ExercisesToolbar';
import HideAppBar from '../AppBar/HideAppBar';
import axios from 'axios';

import { useEffect, useState } from 'react';

import exerciseService from '../../services/exercises'
import WorkoutExerciseList from '../HistoryId/WorkoutExerciseList';
import { useSelector } from 'react-redux';
import { Typography, Box, CircularProgress } from '@mui/material';


const Exercise = ({ exercise, drawerWidth }) => {
    //workoutExercises
    const history = useSelector(state => state.history)
    const user = useSelector(state => state.user)
    const [workoutExercises, setworkoutExercises] = useState([])
    const [loading, setLoading] = useState(true)

    /**
     * ekalla componentin mountilla fetchataan data ja pistetään storeen, ja aina kun komponentti
     * mounttaa seuraavaksi niin haetaan storesta
     */

    useEffect(() => {
        // etsi storesta
        // jos ei, niin servulle pyyntö

        exerciseService
            .getHistory(user.email, exercise.id)
            .then((response) => {
                console.log("EXERCISE COMPONENT ", response);
                setworkoutExercises(response)
                setLoading(false)
            })

    }, [history])

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <ExerciseToolbar exercise={exercise} />
            </HideAppBar>

            <div>

                {loading ?
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="75vh"
                        //minWidth="75vh"
                        padding={4}
                    //maxWidth="75vw"
                    //sx={{ maxWidth: 600 }}
                    //minHeight="75vh"
                    >
                        <CircularProgress />
                    </Box>
                    :

                    < div >

                        {(workoutExercises.length === 0) &&
                            <Box
                                display="flex"
                                flexDirection="column"
                                //justifyContent="center"
                                alignItems="center"
                                minHeight="75vh"
                                //minWidth="75vh"
                                padding={4}
                            //maxWidth="75vw"
                            //sx={{ maxWidth: 600 }}
                            //minHeight="75vh"
                            >
                                <Typography variant='h6' textAlign={"center"}>
                                    You haven't had any workouts with this exercise yet &#128586;
                                </Typography>
                                <Typography variant='h6' textAlign={"center"} sx={{ marginTop: 3 }}>
                                    The history of the exercise is shown here!
                                </Typography>
                            </Box>
                        }


                        <Box paddingY={ {xs: 2, md: 5} } paddingX={ {xs: 2, sm: 4, md: 6} }  >
                            <WorkoutExerciseList workoutExercises={workoutExercises} showDate={true} />
                        </Box>
                    </div>
                }
            </div >
        </>
    )
}

export default Exercise