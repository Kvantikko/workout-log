import React from "react"
import { useState } from "react"
import { TextField, Button, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { editSet, deleteSet } from "../../redux/reducers/setReducer"

const Set = ({ set, number, index }) => {
    console.log("-------------------- A set is rendering ----------------------------- ", index)

    const darkMode = useSelector(state => state.darkMode)
    const [weight, _setWeight] = useState(set.weight)
    const [reps, _setReps] = useState(set.reps)
    const [color, setColor] = useState(set.done ? "rgba(25, 255, 255, 0.12)" : "")

    const dispatch = useDispatch()

    const updateSet = (weight, reps, warmup) => {
        const changedSet = { ...set, weight: parseFloat(weight), reps: parseFloat(reps), warmup }
        _setWeight(weight)
        _setReps(reps)
        dispatch(editSet({ setId: set.id, changedSet: changedSet }))
    }

    const removeSet = () => {
        if (set.done) {
            setShowConfirm
            /* console.log("kayttäjälle ilmotus että pitää olla ainakin yksi setti");
            return */
        }
        dispatch(deleteSet(set.id))
    }

    const handleBlur = (event) => {
        console.log("handling blur", event.target.value);

        if (event.target.value === "" && event.target.id === "weight") {
            _setWeight(0)
            console.log(weight);
        }

        if (event.target.value === "" && event.target.id === "reps") {
            _setReps(0)
            console.log(reps);
        }
    }

    const handleDoneClick = () => {
        if (color === "") {
            setColor("rgba(25, 255, 255, 0.12)")
            const changedSet = { ...set, done: true }
            dispatch(editSet({ setId: set.id, changedSet: changedSet }))
        } else {
            setColor("")
            const changedSet = { ...set, done: false }
            dispatch(editSet({ setId: set.id, changedSet: changedSet }))
        }
    }

    return (
        <Stack
            direction={"row"}
            paddingRight={2}
            paddingLeft={2}
            spacing={1}
            sx={{ justifyContent: "space-between", py: 1, backgroundColor: color, borderRadius: { xs: 0, sm: 2 } }}
        >
            <Button
                onClick={() => updateSet(weight, reps, !set.warmup)}
                sx={{ maxWidth: 0.2, minWidth: 0.1 }}
                disabled={set.done ? true : false}
            >
                {number === 0 ? <Typography color={set.done ? theme => theme.palette.text.disabled : '#ffa726'}>W</Typography> : number}
            </Button>

            <TextField
                disabled={set.done ? true : false}
                variant="outlined" size="small"
                style={{ width: 100, minWidth: 80 }}
                id="weight"
                type="number"
                value={weight}
                min={0}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{
                    style: { textAlign: 'center' },
                    min: 0,
                    step: 2.5,
                    //disableUnderline: true, // <== added this
                    //maxLength: 6, ei toimi jos tyyppi on number
                }}
                onChange={(e) => updateSet(e.target.value, reps, set.warmup)}
                onKeyDown={(event) => {
                    if (event?.key === '-' ||
                        event?.key === '+' ||
                        event?.key === '.' ||
                        event?.key === 'e' ||
                        event?.key === 'E') {
                        event.preventDefault()
                    }
                }}
                onBlur={(event) => handleBlur(event)}
                onInput={(e) => {
                    e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 5)
                }}
                sx={{
                    borderRadius: 2,
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                        display: "none",
                    },
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                    backgroundColor: set.done ? '' : theme => theme.palette.action.disabledBackground,

                    "& fieldset": { border: set.done ? 'none' : '1px solid rgba(255, 255, 255, 0.16)', borderRadius: 2 },
                }}
            // onClick={() => setPlaceHolder('')}

            //margin="normal"

            />
            <TextField
                disabled={set.done ? true : false}
                variant="outlined" size="small"
                style={{ width: 100, minWidth: 40 }}
                id="reps"
                type="number"
                value={reps}
                min={0}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    style: { textAlign: 'center' },
                    min: 0,
                    step: 1,
                    //maxLength: 6, ei toimi jos tyyppi on number
                }}

                onChange={(e) => updateSet(weight, e.target.value, set.warmup)}
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
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                }}
                sx={{
                    borderRadius: 2,
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                        display: "none",
                    },
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                    backgroundColor: set.done ? '' : theme => theme.palette.action.disabledBackground,

                    "& fieldset": { border: set.done ? 'none' : '1px solid rgba(255, 255, 255, 0.16)', borderRadius: 2 },
                }}
            />

            <Button
                variant={color === '' ? 'text' : 'text'}
                color="warning"
                onClick={removeSet}
                sx={{ minWidth: 0.1 }}
            >
                <CloseIcon />
            </Button>
            <Button
                variant={color === '' ? "outlined" : 'contained'}
                color="success"
                onClick={handleDoneClick}
                sx={{ maxWidth: 0.15, minWidth: 0 }}
                //sx={{ minWidth: 0 }}
            >
                <DoneIcon />
            </Button>
        </Stack>

    )
}

// react memo for preventing unneccessary re-renders (not enough tho, needs useCallback)
export default React.memo(Set)
//export default React.memo(Set (prevProps, currentProps) => isDeepEqual(prevProps.someObject, currentProps.someObject))