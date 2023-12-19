import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { TextField } from "@mui/material"

const NoteField = ({ note, handleBlur, placeholder }) => {

    

    const [input, setInput] = useState(null)       
    const [focused, setFocused] = useState(false)

    const dispatch = useDispatch()

    const determineValue = () => {
        if (input === null) {
            return note
        } else {
            return input
        }
    }

    return (
        <TextField
            variant="outlined" size="small"
            fullWidth
            placeholder={placeholder}
            //style={{ width: 100, minWidth: 80 }}
            id="note"
            type="text"
            value={determineValue()}
            autoComplete="off"
            inputProps={{
                /* sx: {
                    color: focused ?
                        theme => theme.palette.action.active :
                        theme => theme.palette.text.disabled
                }, */
            }}

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

export default NoteField
