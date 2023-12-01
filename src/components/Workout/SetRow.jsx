import React from "react"
import { useState } from "react"
import { Button, Stack, Typography } from "@mui/material"
import { useDispatch } from "react-redux"

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { editSet, deleteSet } from "../../redux/reducers/setReducer"
import DeleteSetModal from "../Modals/DeleteSetModal";
import SetTextField from "./SetTextfield";

const SetRow = ({ set, number, index }) => {
    console.log("-------------------- A set ROW is rendering ----------------------------- ", index)

    const [color, setColor] = useState(set.done ? "rgba(25, 255, 255, 0.12)" : "")
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const dispatch = useDispatch()

    const handleRemove = () => {
        if (set.done) {
            setOpenDeleteModal(true)
            return
        }
        dispatch(deleteSet(set.id))
    }

    const handleDone = () => {
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

            <SetTextField id={"weight"} set={set} minWidth={80} step={2.5} />
            <SetTextField id={"reps"} set={set} minWidth={40} step={1} />

            <Button
                variant='text'
                color="warning"
                onClick={handleRemove}
                sx={{ minWidth: 0.1 }}
            >
                <CloseIcon />
            </Button>
            {/* Prevents modal from rendering before it is opened     */}
            {openDeleteModal &&
                <DeleteSetModal
                    open={openDeleteModal}
                    onClose={setOpenDeleteModal}
                    confirmFunction={removeSet}
                />
            }
            <Button
                variant={color === '' ? "outlined" : 'contained'}
                color="success"
                onClick={handleDone}
                sx={{ maxWidth: 0.15, minWidth: 0 }}
            //sx={{ minWidth: 0 }}
            >
                <DoneIcon />
            </Button>
        </Stack>

    )
}

// react memo for preventing unneccessary re-renders (not enough tho, needs useCallback)
export default React.memo(SetRow)
//export default React.memo(Set (prevProps, currentProps) => isDeepEqual(prevProps.someObject, currentProps.someObject))