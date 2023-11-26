import { Link } from "react-router-dom";

import { Button, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container, Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { copyWorkout } from "../../redux/reducers/workoutReducer";
import { copySets } from "../../redux/reducers/setReducer";
import { copyExercises } from "../../redux/reducers/exerciseReducer";

import generateId from "../../utils/generateId";
import { formatDateTime } from "../../utils/Date";

import { clearWorkout } from "../../redux/reducers/workoutReducer"
import { stopWatch } from '../../redux/reducers/stopWatchReducer'
import { clearSets } from '../../redux/reducers/setReducer'
import { clearExercises } from '../../redux/reducers/exerciseReducer'

import { useNavigate } from "react-router-dom";

import WorkoutExerciseSets from "./WorkoutExerciseSets";


const ExerciseWorkoutList = ({ workoutExercises, showDate }) => {


   

    return (
        <Stack spacing={3} >
            {workoutExercises.map((exercise, text, index) => (
                <Stack key={exercise.id} sx={{/* backgroundColor: "green", */ width: 1 }}>
                    {showDate &&
                        <Typography variant="h6" noWrap >
                            {formatDateTime(exercise.createdAt)}
                        </Typography>
                    }

                    <Typography variant="h6" noWrap >
                        {exercise.name}
                    </Typography>

                    {/* ALL EXERCISE SETS */}
                    <WorkoutExerciseSets workoutExerciseSets={exercise.sets} />

                </Stack>

            ))}
        </Stack>
    )
}

export default ExerciseWorkoutList