import { useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { resetHistoryPath } from "../redux/reducers/navReducer"

import WorkoutDetails from "./WorkoutDetails"
import HistoryMenu from "../components/Menus/HistoryMenu"

const CompletedWorkout = () => {

    const { id }= useParams()
    const completedWorkout = useSelector(state => state.history.find(workout => workout.id === Number.parseInt(id)))
    const dispatch = useDispatch()

    return (
        <WorkoutDetails
            workout={completedWorkout}
            backFunction={() => dispatch(resetHistoryPath())}
            link="/"
            startButtonText="Perform again"
            menu={
                <HistoryMenu workout={completedWorkout} />
            }
        />
    )
}

export default CompletedWorkout 