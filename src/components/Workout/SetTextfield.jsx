import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editSet } from "../../redux/reducers/setReducer";


const SetTextField = ({ id, set, minWidth, step }) => {
    console.log("Rendering SetTextField")

    const [value, setValue] = useState(id === "weight" ? set.weight : set.reps)


    const dispatch = useDispatch()

    const handleBlur = (event) => {
        if (event.target.value === "") {
            setValue(0)
        }
        if (id === "weight") {
            console.log("value ", value);
            const changedSet = { ...set, weight: parseFloat(value), reps: set.reps, warmup: set.warmup }
            dispatch(editSet({ setId: set.id, changedSet: changedSet }))
        }
        if (id === "reps") {
            const changedSet = { ...set, weight: set.weight, reps: parseFloat(value), warmup: set.warmup }
            dispatch(editSet({ setId: set.id, changedSet: changedSet }))
        }
    }


    return (
        <TextField
            disabled={set.done ? true : false}
            variant="outlined" size="small"
            style={{ width: 100, minWidth: minWidth }}
            id={id}
            type="number"
            value={value}
            min={0}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                style: { textAlign: 'center' },
                min: 0,
                step: step,
            }}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(event) => {
                if (event?.key === '-' ||
                    event?.key === '+' ||
                    event?.key === '.' ||
                    event?.key === 'e' ||
                    event?.key === 'E') {
                    event.preventDefault();
                }
            }}
            onBlur={(event) => handleBlur(event)}
            onInput={(e) => {
                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, id === 'weight' ? 5 : 3)
            }}
            sx={{
                borderRadius: 2,
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" },
                "& input[type=number]": { MozAppearance: "textfield" },
                backgroundColor: set.done ? '' : theme => theme.palette.action.disabledBackground,
                "& fieldset": { border: set.done ? 'none' : '1px solid rgba(255, 255, 255, 0.16)', borderRadius: 2 },
            }}
        />
    )

}

export default SetTextField