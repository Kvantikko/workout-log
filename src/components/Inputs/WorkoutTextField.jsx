import { useState, useEffect } from "react"
import { TextField } from "@mui/material"

const WorkoutTextField = ({ value, handleBlur, placeholder, id }) => {

    const [input, setInput] = useState(null)       
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        setInput(value)
    }, [value])    

    const determineValue = () => {
        if (input === null) {
            return value
        } else {
            return input
        }
    }

    return (
        <TextField
            variant="outlined"
            size="small"
            fullWidth
            focused={focused}
            placeholder={placeholder}
            id={id}
            type="text"
            value={determineValue()}
            autoComplete="off"
            onFocus={() => setFocused(true)}
            onBlur={() => {
                setFocused(false)
                handleBlur(input)
            }}
            onChange={(event) => setInput(event.target.value)}
            sx={{
                borderRadius: 2,
                backgroundColor: theme => theme.palette.action.disabledBackground,
                marginY: 1,
                "& fieldset": { border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: 2 },
            }}
        />
    )
}

export default WorkoutTextField
