import React from "react"
import { useState } from "react"
import { TextField, Button, Stack } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { editSet, deleteSet } from "../../redux/reducers/setReducer"

const Set = ({ set, number, index }) => { 
    console.log("-------------------- A set is rendering ----------------------------- ", index)

    const [weight, _setWeight] = useState(set.weight)
    const [reps, _setReps] = useState(set.reps)
    const [color, setColor] = useState("white")
    
    const dispatch = useDispatch()
   
    const updateSet = (weight, reps, warmup) => {
        const changedSet = { ...set, weight: parseInt(weight), reps: parseInt(reps), warmup }
        _setWeight(weight)
        _setReps(reps)
        dispatch(editSet({ setId: set.id, changedSet: changedSet }))
    }

    const removeSet = () => {
        if (index === 0) {
            console.log("kayttäjälle ilmotus että pitää olla ainakin yksi setti");
            return
        }
        dispatch(deleteSet(set.id))
    }

    const handleDoneClick = () => {
        if (color === "white") {
            setColor("#c9ffcc")
        } else {
            setColor("white")
        }
    }

    return (
        <Stack direction={"row"} spacing={1} sx={{ justifyContent: "space-between", py: 1, backgroundColor: color }}>
            <Button onClick={() => updateSet(weight, reps, !set.warmup)} sx={{ maxWidth: 0, minWidth: 0 }}>
                {number === 0 ? <div>W</div> : number}
            </Button>

            <TextField
                variant="outlined" size="small"
                style={{ width: 100, minWidth: 80 }}
                id="outlined-number"
                type="number"
                defaultValue={weight}
                min={0}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{ style: { textAlign: 'center' }}} 
                onChange={(e) => updateSet(e.target.value, reps, set.warmup)}
            //margin="normal"

            />
            <TextField
                variant="outlined" size="small"
                style={{ width: 100, minWidth: 60}}
                id="outlined-number-2"
                type="number"
                defaultValue={reps}
                min={0}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ style: { textAlign: 'center' }}} 
                onChange={(e) => updateSet(weight, e.target.value, set.warmup)}
            //margin="normal"
            />

            <Button variant="outlined" color="warning" onClick={removeSet} sx={{ minWidth: 0}}>
                <CloseIcon />
            </Button>
            <Button variant="outlined" color="success" onClick={handleDoneClick} sx={{ minWidth: 0}}>
                <DoneIcon />
            </Button>
        </Stack>

    )
}

// react memo for preventing unneccessary re-renders (not enough tho, needs useCallback)
export default React.memo(Set) 
//export default React.memo(Set (prevProps, currentProps) => isDeepEqual(prevProps.someObject, currentProps.someObject))