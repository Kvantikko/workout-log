import { memo } from "react"
import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material'
import Defer from '../Defer/Defer'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import { useDispatch, useSelector } from "react-redux"
import { addSelectedExercise, removeSelectedExercise } from "../../redux/reducers/exerciseLibraryReducer"


const ExerciseListItem = ({ exercise, showChecked, handleClick }) => {
    console.log("Rendering ExerciseListItem ", exercise.name );

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
      /*   <Defer key={exercise.id} chunkSize={10}> */
            <ListItem disableGutters disablePadding >
                <ListItemButton onClick={() => handleListClick(exercise)} sx={{ paddingLeft: 3 }}  >
                    <ListItemText primary={exercise.name} /* id={labelId}  */ />
                    {showChecked &&
                        <ListItemIcon>
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
                            //inputProps={{ 'aria-labelledby': labelId }}
                            />

                        </ListItemIcon>
                    }
                    {/*  <ExerciseListButton exercise={exercise} handleListClick={handleListClick} /> */}
                </ListItemButton>
            </ListItem>
      /*   </Defer> */
    )
}

export default memo(ExerciseListItem)