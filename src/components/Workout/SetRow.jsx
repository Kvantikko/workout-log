import React from "react"
import { useState } from "react"
import { Button, Stack, Typography } from "@mui/material"
import { useDispatch } from "react-redux"

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { editSet, deleteSet } from "../../redux/reducers/setReducer"
import SetTextField from "../Inputs/SetTextfield"
import BasicModal from "../Modals/BasicModal"
import { deleteSetFromTemplate, editSetFromTemplate } from "../../redux/reducers/templateReducer";

const SetRow = ({ set, number, index, type }) => {
    console.log("-------------------- A set ROW is rendering ----------------------------- ", set)

    const [color, setColor] = useState(set.done ? "rgba(25, 255, 255, 0.12)" : "")
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const dispatch = useDispatch()

    const handleRemoveClick = () => {

        if (set.done) {
            setOpenDeleteModal(true)
            return
        }
        removeSet()
    }

    const removeSet = () => {
        console.log("delete set func, type: ", type);
        switch (type) {
            case "active":
                dispatch(deleteSet(set.id))
                break
            case "template":
                console.log("removeSet() ", set);
                dispatch(deleteSetFromTemplate(set.id))
                break
            default:
                throw new Error('Component Workout must have a type prop specified!')
        }
    }

    const handleDone = () => {
        if (color === "") {
            setColor("rgba(25, 255, 255, 0.12)")
            const changedSet = { ...set, done: true }
            switch (type) {
                case "active":
                    dispatch(editSet({ setId: set.id, changedSet: changedSet }))
                    break
                case "template":
                    dispatch(editSetFromTemplate({ setId: set.id, changedSet: changedSet }))
                    break
                default:
                    throw new Error('Component Workout must have a type prop specified!')
            }
        } else {
            setColor("")
            const changedSet = { ...set, done: false }
            switch (type) {
                case "active":
                    dispatch(editSet({ setId: set.id, changedSet: changedSet }))
                    break
                case "template":
                    dispatch(editSetFromTemplate({ setId: set.id, changedSet: changedSet }))
                    break
                default:
                    throw new Error('Component Workout must have a type prop specified!')
            }
        }
    }

    const handleSetClick = () => {
        const changedSet = { ...set, warmup: !set.warmup }
        switch (type) {
            case "active":
                dispatch(editSet({ setId: set.id, changedSet: changedSet }))
                break
            case "template":
                dispatch(editSetFromTemplate({ setId: set.id, changedSet: changedSet }))
                break
            default:
                throw new Error('Component Workout must have a type prop specified!')
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
                onClick={handleSetClick}
                sx={{ maxWidth: 0.2, minWidth: 0.1 }}
                disabled={set.done ? true : false}
            >
                {number === 0 ? <Typography color={set.done ? theme => theme.palette.text.disabled : '#ffa726'}>W</Typography> : number}
            </Button>

            <SetTextField id={"weight"} set={set} minWidth={80} step={2.5} type={type} />
            <SetTextField id={"reps"} set={set} minWidth={40} step={1} type={type} />

            <Button
                variant='text'
                color="warning"
                onClick={handleRemoveClick}
                sx={{ minWidth: 0.1 }}
            >
                <CloseIcon />
            </Button>
            {/* Prevents modal from rendering before it is opened     */}
            {openDeleteModal &&
                <BasicModal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete set?"
                    subTitle="The set is marked as done. Are you sure you want to delete it?"
                    confirmButtonText={'Delete'}
                    cancelButtonText={'Cancel'}
                    onSubmit={() => removeSet()}
                />
            }
            {type === "active" &&
                <Button
                    variant={color === '' ? "outlined" : 'contained'}
                    color="success"
                    onClick={handleDone}
                    sx={{ maxWidth: 0.15, minWidth: 0 }}
                //sx={{ minWidth: 0 }}
                >
                    <DoneIcon />
                </Button>
            }
        </Stack>

    )
}

// react memo for preventing unneccessary re-renders (not enough tho, needs useCallback)
export default React.memo(SetRow)
//export default React.memo(Set (prevProps, currentProps) => isDeepEqual(prevProps.someObject, currentProps.someObject))