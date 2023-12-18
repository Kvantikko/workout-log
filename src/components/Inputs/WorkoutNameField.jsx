import { useState } from "react"

import { TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { setTemplateName } from "../../redux/reducers/templateReducer"


const WorkoutNameField = ({ workoutName, type }) => {

    const [input, setInput] = useState(workoutName)
    const [helperText, setHelperText] = useState('')
    const [error, setError] = useState(!(helperText === ''))

    const dispatch = useDispatch()

    const handleBlur = (event) => {
        setInput(event.target.value)
        switch (type) {
            case "active":
                //dispatch()
                break
            case "template":
                dispatch(setTemplateName(input))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }
    }

    return (
        <TextField
            fullWidth
            //id='workoutName'
            variant="standard"
            size='normal'
            //label="Workout name"
            //placeholder={workoutName}
            placeholder="Workout name"
            value={input}
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
                // marginX: 2,
                /*   "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" }, */
                /*   "& input[type=number]": { MozAppearance: "textfield" }, */
                //backgroundColor: theme => theme.palette.action.disabledBackground,
                "& fieldset": { border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: 2 },
            }}
        />
    )
}

export default WorkoutNameField