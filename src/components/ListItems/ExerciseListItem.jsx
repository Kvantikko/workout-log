import { memo } from "react"
import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useDispatch, useSelector } from "react-redux"
import { addSelectedExercise, removeSelectedExercise } from "../../redux/reducers/exerciseLibraryReducer"

const ExerciseListItem = ({ exercise, showChecked, handleClick }) => {

    console.log("Rendering ExerciseListItem ", exercise.name)

    const dispatch = useDispatch()

    const checked = useSelector(state => state.exerciseLibrary.selected.byId[exercise.id]) ? true : false

    const handleListClick = (exercise) => {
        console.log("click");
        if (showChecked) {
            console.log("1st true");
            if (checked) {
                console.log("checked true");
                dispatch(removeSelectedExercise(exercise.id))
            } else {
                console.log("checked false");
                dispatch(addSelectedExercise(exercise))
            }
        } else {
            handleClick(exercise)
        }
    }



    return (
        <ListItem disableGutters disablePadding  >
            <ListItemButton
                onClick={() => handleListClick(exercise)}
                sx={{ paddingX: { xs: 2, sm: 3 } }}
            >
               
                {showChecked &&
                    <ListItemIcon /* sx={{ justifyContent: "center" }} */ >
                        <Checkbox
                            edge="end"
                            checked={checked}
                            tabIndex={-1}
                            disableRipple
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            style={{
                                transform: "scale(1.1)",
                            }}
                        />
                    </ListItemIcon>
                }
                 <ListItemText primary={exercise.name} />
            </ListItemButton>
        </ListItem>
    )
}

export default memo(ExerciseListItem)