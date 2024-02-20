import { useSelector } from "react-redux"
import { selectAllTemplateExercises } from "../../redux/selectors"
import { selectAllWorkoutExercises } from "../../redux/selectors"

import { Stack } from "@mui/material"

import Defer from "../Defer/Defer"
import ExerciseListItem from "./ExerciseListItem"

const ExerciseList = ({ type }) => {

    const exercises = useSelector(type === "active" ? selectAllWorkoutExercises : selectAllTemplateExercises)

    return (
        <>
            {!(exercises.length === 0) &&
                <Stack spacing={3} padding={0} sx={{ justifyContent: "center" }}>
                    <Defer chunkSize={1} isFlip={true}>
                        {exercises.map((exerciseId, index) => {
                            let arrayStart = false
                            let arrayEnd = false
                            if (index === 0) { arrayStart = true }
                            if (index === exercises.length - 1) { arrayEnd = true }
                            return (
                                <ExerciseListItem
                                    key={exerciseId}
                                    exerciseId={exerciseId}
                                    arrayStart={arrayStart}
                                    arrayEnd={arrayEnd}
                                    type={type}
                                />
                            )
                        })}
                    </Defer>
                </Stack>
            }
        </>
    )
}

export default ExerciseList