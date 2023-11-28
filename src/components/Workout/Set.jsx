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
    const [color, setColor] = useState(set.done ? "rgba(25, 255, 255, 0.12)" : "") // only works darmodes
    //const [placeholder, setPlaceHolder] = useState(0)
    // const [color, setColor] = useState(set.done ? { darkMode ? "rgba(255, 255, 255, 0.12)" : "#c9ffcc"} : "")

    const dispatch = useDispatch()

    const updateSet = (weight, reps, warmup) => {
        const changedSet = { ...set, weight: parseFloat(weight), reps: parseFloat(reps), warmup }
        _setWeight(weight)
        _setReps(reps)
        dispatch(editSet({ setId: set.id, changedSet: changedSet }))
    }

    const removeSet = () => {
        if (index === 0) {
            /* console.log("kayttäjälle ilmotus että pitää olla ainakin yksi setti");
            return */
        }
        dispatch(deleteSet(set.id))
    }

    const handleBlur = (event) => {
        console.log("handling blur", event.target.value);


        if (event.target.value === "" && event.target.id === "weight") {
            console.log('AAAAAAAAAAAAAAAAAAA');
            _setWeight(0)
            console.log(weight);
        }

        if (event.target.value === "" && event.target.id === "reps") {
            console.log('BBBBBBBBBBBBBBBBBBBB');
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
        <Stack direction={"row"} paddingX={1} spacing={1} sx={{ justifyContent: "space-between", py: 1, backgroundColor: color }}>
            <Button onClick={() => updateSet(weight, reps, !set.warmup)} sx={{ maxWidth: 0, minWidth: 0 }}>
                {number === 0 ? <Typography color={'#ffa726'}>W</Typography> : number}
            </Button>

            <TextField
                variant="outlined" size="small"
                style={{ width: 100, minWidth: 80 }}
                id="weight"
                type="number"
                value={weight}
                //defaultValue={}
                // placeholder={placeholder}
                min={0}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{
                    style: { textAlign: 'center' },
                    min: 0,
                    step: 2.5,
                    inputmode: 'numeric',
                    pattern: '[0-9]*'
                }}
                //inputProps={{ inputmode: 'numeric' pattern: '[0-9]*' }}
                onChange={(e) => updateSet(e.target.value, reps, set.warmup)}
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
            // onClick={() => setPlaceHolder('')}

            //margin="normal"

            />
            <TextField
                variant="outlined" size="small"
                style={{ width: 100, minWidth: 60 }}
                id="reps"
                type="number"
                value={reps}
                // placeholder={placeholder}
                min={0}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    style: { textAlign: 'center' },
                    min: 0,
                    step: 1
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
            //margin="normal"
            />

            <Button variant="outlined" color="warning" onClick={removeSet} sx={{ minWidth: 0 }}>
                <CloseIcon />
            </Button>
            <Button variant={color === '' ? "outlined" : 'contained'} color="success" onClick={handleDoneClick} sx={{ minWidth: 0 }}>
                <DoneIcon />
            </Button>
        </Stack>

    )
}

// react memo for preventing unneccessary re-renders (not enough tho, needs useCallback)
export default React.memo(Set)
//export default React.memo(Set (prevProps, currentProps) => isDeepEqual(prevProps.someObject, currentProps.someObject))