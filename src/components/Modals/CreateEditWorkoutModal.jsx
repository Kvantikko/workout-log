import { useState } from "react"
import FullScreenMobileModal from "./FullScreenMobileModal"
import { AppBar, Button, Box, Stack, Toolbar, IconButton, Typography } from "@mui/material"
import Workout from "../Workout/Workout"
import WorkoutToolbar from "../Workout/WorkoutToolbar"
import { Close } from "@mui/icons-material"

import { useMediaQuery } from '@mui/material'
import BasicModal from "./BasicModal"

import { useDispatch, useSelector } from "react-redux"
import { clearTemplate } from "../../redux/reducers/templateReducer"
import SaveWorkoutModal from "./SaveWorkoutModal"
import { toast } from "react-toastify"


const CreateEditWorkoutModal = ({ open, onClose, workout, title, disableWarning, editVipu }) => {

    const isExercises = useSelector(state => state.template.exercises).length !== 0
    const [openWarningModal, setOpenWarningModal] = useState(false)
    const [openSaveModal, setOpenSaveModal] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const dispatch = useDispatch()

    const handleSave = () => {
        if (!isExercises) {
            toast.warning("Add atleast one exercise before saving!")
        } else {
            setOpenSaveModal(true)
        }


    }

    const handleClose = () => {
        if (isExercises && !disableWarning) {
            setOpenWarningModal(true)
        } else {
            onClose(false)
        }
    }

    const handle = () => {
        onClose(false)
        setOpenSaveModal(false)
        setOpenWarningModal(false)
        dispatch(clearTemplate())
        console.log("handle end ",)
    }

    const handleCancelFinish = () => {
        //onClose(false)
        setOpenSaveModal(false)
        //setOpenWarningModal(false)

    }

    return (
        <>
            {isSmallScreen &&
                <FullScreenMobileModal
                    open={open}
                    onClose={handleClose}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Stack direction={'row'} justifyItems={'center'} gap={2} >
                            <IconButton onClick={() => onClose(false)}>
                                <Close />
                            </IconButton>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Typography variant="h6">Create template</Typography>
                            </Box>
                        </Stack>

                        <Button variant="text">Save</Button>

                    </Toolbar>
                    <Box sx={{ overflowY: 'auto', height: '100%' }}>
                        <Workout type={"template"} />
                    </Box>

                </FullScreenMobileModal>
            }
            {!isSmallScreen &&
                <BasicModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSave}
                    title={title}
                    confirmButtonText={"Save"}
                >
                    <Box sx={{ overflow: 'auto', height: '70vh', /* width: '60vw' */ }} >
                        <Workout type={'template'} />
                    </Box>
                </BasicModal>
            }
            {openWarningModal &&
                <BasicModal
                    open={openWarningModal}
                    onClose={() => setOpenWarningModal(false)}
                    title={"Discard template?"}
                    subTitle={"Are you sure you want to discard the template without saving it?"}
                    confirmButtonText={"Discard"}
                    onSubmit={() => handle()}
                />
            }
            {openSaveModal &&
                <SaveWorkoutModal
                    open={openSaveModal}
                    onClose={() => handleCancelFinish()}
                    onSubmit={() => handle()}
                    type={"template"}
                    editVipu={editVipu}
                    workout={workout}
                />
            }
        </>


    )
}

export default CreateEditWorkoutModal