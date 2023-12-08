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


const CreateTemplateModal = ({ open, onClose }) => {

    const isExercises = useSelector(state => state.template.exercises).length !== 0
    const [openWarningModal, setOpenWarningModal] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const dispatch = useDispatch()

    const handleSave = () => {
        onClose()
        dispatch(clearTemplate())
    }

    const handleClose = () => {
        if (isExercises) {
            setOpenWarningModal(true)
        } else {
            onClose()
        }
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
                    title={"Create workout template"}
                    confirmButtonText={"Save"}
                    content={
                        <Box sx={{ overflow: 'auto', height: '70vh', /* width: '60vw' */ }} >
                            <Workout type={'template'} />
                        </Box>
                    }
                >


                </BasicModal>
            }
            <BasicModal
                open={openWarningModal}
                onClose={setOpenWarningModal}
                title={"Discard template?"}
                subTitle={"Are you sure you want to discard the template without saving it?"}
                confirmButtonText={"Discard"}
                onSubmit={handleSave}
            />
        </>


    )
}

export default CreateTemplateModal