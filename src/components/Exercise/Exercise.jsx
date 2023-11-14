
import ExerciseToolbar from './ExercisesToolbar';
import HideAppBar from '../AppBar/HideAppBar';
import axios from 'axios';

import { useEffect, useState } from 'react';

import exerciseService from '../../services/exercises'
import WorkoutExerciseList from '../History/WorkoutExerciseList';
import { useSelector } from 'react-redux';


const Exercise = ({ exercise }) => {
    //workoutExercises
    const history = useSelector(state => state.history)
    const [workoutExercises, setworkoutExercises] = useState([])

    /**
     * ekalla componentin mountilla fetchataan data ja pistetään storeen, ja aina kun komponentti
     * mounttaa seuraavaksi niin haetaan storesta
     */

    useEffect(() => {
        exerciseService
            .getHistory(exercise.id)
            .then((response) => {
                console.log("EXERCISE COMPONENT ", response);
                setworkoutExercises(response)
            })
    }, [history])

    return (
        <div>
            {/*  <ModalRoot open={open} setOpen={setOpen} modalType={"createExercise"} /> */}
            <HideAppBar>
                <ExerciseToolbar exercise={exercise} />
            </HideAppBar>
            <WorkoutExerciseList workoutExercises={workoutExercises} showDate={true}/>
        </div>
    )
}

export default Exercise