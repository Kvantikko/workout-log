import { Link } from "react-router-dom";

import { Button, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container, Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { formatDateTime } from "../../utils/Date";

import { useNavigate } from "react-router-dom";

import WorkoutExerciseSets from "./WorkoutExerciseSets";


const ExerciseWorkoutList = ({ workoutExercises, showDate }) => {

    console.log(workoutExercises)




    return (
        <Stack spacing={3} >
            {workoutExercises.map((exercise, text, index) => (
                <div key={exercise.id} >
                    <Stack key={exercise.id} sx={{/* backgroundColor: "green", */ width: 1 }}>
                        {showDate &&
                            <Typography variant="body1" /* color={'text.secondary'} */ noWrap textAlign={'center'} >
                                {formatDateTime(exercise.createdAt, true)}
                            </Typography>
                        }

                        {/* <Button>
                            Show whole workout
                        </Button> */}

                       <Typography variant="h6" noWrap >
                            {exercise?.name}
                        </Typography>

                        <Typography
                            variant="body1"
                            color={'text.secondary'}
                            sx={{  paddingX: 0, width: 'fit-content', borderRadius: 1 }}
                            //noWrap
                        >
                            {exercise.note}
                        </Typography>

                        {/* ALL EXERCISE SETS */}
                        <WorkoutExerciseSets workoutExerciseSets={exercise.sets} />
                    </Stack>
                    <Divider sx={{ marginTop: 2 }} />
                </div>


            ))}
        </Stack>
    )
}

export default ExerciseWorkoutList