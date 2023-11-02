import { useState } from "react"
import { TextField, Button, Stack } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import { editSet } from "../../redux/reducers/setReducer"

const Set = ({ exerciseId, setId, number, setWeight, setReps, deleteSet, warmup, exerciseSets }) => {
    const [weight, _setWeight] = useState(setWeight)
    const [reps, _setReps] = useState(setReps)
    const [color, setColor] = useState("white")
    

    const dispatch = useDispatch()
   
    const updateSet = (setId, weight, reps, warmup) => {
        console.log('editing set... ', setId, weight, reps, warmup);

        const foundSet = exerciseSets.filter((set) => set.id === setId)[0]
        console.log('found set: ', foundSet);

        const changedSet = { ...foundSet, weight: parseInt(weight), reps: parseInt(reps), warmup }
        console.log('new set: ', changedSet);

        let newSets = exerciseSets.filter((s) => s.id !== setId)
        let x = newSets.concat(changedSet)
        x.sort((a, b) => a.id - b.id);

        //x.sort((a, b) => a.createdAt - b.createdAt);

        console.log('setting these sets in memory: ', x);

        //setSets(x)


        _setWeight(weight)
        _setReps(reps)

        console.log("ennen dispatch: ", exerciseId, " ", setId, " ", weight, " ", reps, warmup)

        dispatch(editSet({ setId, changedSet }))
    }

    const handleDoneClick = () => {
        if (color === "white") {
            setColor("#40ff9f")
        } else {
            setColor("white")
        }
    }

    return (
        <Stack direction={"row"} spacing={1} sx={{ justifyContent: "space-between", backgroundColor: color }}>
            <Button onClick={() => updateSet(setId, weight, reps, !warmup)} sx={{ maxWidth: 0, minWidth: 0 }}>
                {number === 0 ? <div>W</div> : number}
            </Button>

            <TextField
                variant="outlined" size="small"
                style={{ width: 70, maxHeight: 0.5 }}
                id="outlined-number"
                type="number"
                defaultValue={weight}
                min={0}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{ style: { textAlign: 'center' }}} 
                onChange={(e) => updateSet(setId, e.target.value, reps, warmup)}
            //margin="normal"

            />
            <TextField
                variant="outlined" size="small"
                style={{ width: 70 }}
                id="outlined-number-2"
                type="number"
                defaultValue={reps}
                min={0}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ style: { textAlign: 'center' }}} 
                onChange={(e) => updateSet(setId, weight, e.target.value, warmup)}
            //margin="normal"
            />

            <Button variant="outlined" onClick={deleteSet} sx={{ minWidth: 0}}>
                <DeleteIcon />
            </Button>
            <Button variant="contained" onClick={handleDoneClick} sx={{ minWidth: 0}}>
                <DoneIcon />
            </Button>
        </Stack>

    )
}

export default Set