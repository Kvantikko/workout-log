import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { TextField } from "@mui/material"

import { setTemplateName } from "../../redux/reducers/templateReducer"
import { setWorkoutName } from "../../redux/reducers/workoutReducer"


const WorkoutNameField = ({ /* workoutName, */ type }) => {

    console.log("Rendering WorkoutNameField ")

    let workoutName
    switch (type) {
        case "active":
            workoutName = useSelector(state => state.workout.name)
            break
        case "template":
            workoutName = useSelector(state => state.template.name)
            break
        default:
            throw new Error('Component must have a type prop specified!')
    }
    const [input, setInput] = useState(null)
    const [helperText, setHelperText] = useState('')
    const [error, setError] = useState(!(helperText === ''))

   // console.log("kak ", input)

    /* useEffect(() => {
        setInput(workoutName)
    }, [])    */    
 
    const dispatch = useDispatch()

    const handleBlur = (event) => {
       // console.log("handling blurs");
        setInput(event.target.value)
        switch (type) {
            case "active":
                dispatch(setWorkoutName(input))
                break
            case "template":
                console.log("AAAAAAAAAAAAAAAAAAAAAAa ", input);
                dispatch(setTemplateName(input))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }
    }

    const determineValue = () => {
        if (input === null) {
            return workoutName
        } else {
            return input
        }
    }

    return (
        <TextField
            fullWidth
            //id='workoutName'
            //variant="standard"
            variant="outlined"
            size='small'
            //label="Workout name"
            //placeholder={workoutName}
            placeholder="Workout name"
            value={determineValue()}
            onChange={(event) => {
                //console.log(event.target.value)
                setInput(event.target.value)
            }}
            onKeyDown={e => {
                if (e.code === 'enter' && e.target.value) {
                    setSelected(e.target.value)
                    //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                }
            }}
            onBlur={(event) => handleBlur(event)}
            onClick={() => setHelperText('')}
            error={error}
            helperText={helperText}
            sx={{
                borderRadius: 2,
                //marginX: 2,
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" },
                "& input[type=number]": { MozAppearance: "textfield" },
                backgroundColor: theme => theme.palette.action.disabledBackground,
                "& fieldset": { border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: 2 },
            }}
        />
    )
}

export default WorkoutNameField