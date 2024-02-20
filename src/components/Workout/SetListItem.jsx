import { useState, memo } from "react"

import { useDispatch, useSelector } from "react-redux"
import { deleteSetFromTemplate, editSetFromTemplate } from "../../redux/reducers/templateReducer";
import { deleteSetFromWorkout, editSetFromWorkout } from "../../redux/reducers/workoutReducer";

import { Button, Stack, Typography } from "@mui/material"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import SetTextField from "../Inputs/SetTextfield"
import BasicModal from "../Modals/BasicModal"
import { toast } from "react-toastify";
import NewBasicModal from "../Modals/NewBasicModal";


const SetListItem = ({ setId, type, isOneSetLeft }) => {

    //console.log("-------------------- A set ROW is rendering ----------------------------- ",)

    /**
     * CONFIRMED: setId prop makes all sets render on addtiton!!!!1111111111
     */

    //const setId = 965

    // why was this done...?
    const dummy = {
        done: false,
        id: 0,
        exerciseId: 0,
        createdAt: null,
        warmup: false,
        weight: 0,
        reps: 0
    }
    let set = dummy
    switch (type) {
        case "active":
            set = useSelector(state => state.workout.sets.byId[setId])
            break
        case "template":
            //set = useSelector(state => state.template.sets.byId[setId])
            set = useSelector(state => state.template.sets.byId[setId])
            break
        default:
            throw new Error('Component must have a type prop specified!')
    }

    const [color, setColor] = useState(set.done ? "rgba(25, 255, 255, 0.12)" : "")
    //const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const dispatch = useDispatch()

    const handleRemoveClick = () => {
        if (isOneSetLeft) {
            toast.warning("An exercise must have at least one set!")
            return
        }
        if (set.done) {
            setOpenDeleteModal(true)
            return
        }
        removeSet()
    }

    const removeSet = () => {
        type === "active" ?
            dispatch(deleteSetFromWorkout(set)) :
            dispatch(deleteSetFromTemplate(set))
    }

    const handleDone = () => {
        let changedSet
        if (color === "") {
            setColor("rgba(25, 255, 255, 0.12)")
            changedSet = { ...set, done: true }

        } else {
            setColor("")
            changedSet = { ...set, done: false }
        }
        type === "active" ?
            dispatch(editSetFromWorkout({ setId: set.id, changedSet: changedSet })) :
            dispatch(editSetFromTemplate({ setId: set.id, changedSet: changedSet }))
    }

    const handleSetClick = () => {
        const changedSet = { ...set, warmup: !set.warmup }
        type === "active" ?
            dispatch(editSetFromWorkout({ setId: set.id, changedSet: changedSet })) :
            dispatch(editSetFromTemplate({ setId: set.id, changedSet: changedSet }))
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
                {set.setNo === 0 ?
                    <Typography color={set.done ? theme => theme.palette.text.disabled : '#ffa726'}>W</Typography> :
                    set.setNo
                }
            </Button>

            <SetTextField id={"weight"} set={set} minWidth={80} step={2.5} type={type} />
            <SetTextField id={"reps"} set={set} minWidth={40} step={1} type={type} />

            <NewBasicModal
                openButton={
                    <Button
                        variant='text'
                        color="error"
                        //onClick={handleRemoveClick}
                        sx={{ minWidth: 0.1 }}
                    >
                        <RemoveIcon />
                    </Button>
                }
                beforeOpen={handleRemoveClick}
                //onClose={() => setOpenDeleteModal(false)}
                title="Delete set?"
                subTitle="The set is marked as done. Are you sure you want to delete it?"
                confirmButtonText={'Delete'}
                cancelButtonText={'Cancel'}
                onSubmit={() => removeSet()}
            />

            {/*  {openDeleteModal &&
                <BasicModal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete set?"
                    subTitle="The set is marked as done. Are you sure you want to delete it?"
                    confirmButtonText={'Delete'}
                    cancelButtonText={'Cancel'}
                    onSubmit={() => removeSet()}
                />
            } */}

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

export default memo(SetListItem)