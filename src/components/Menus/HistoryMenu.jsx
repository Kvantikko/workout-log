import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { deleteWorkout } from '../../redux/reducers/workoutReducer'
import { clearWorkout } from '../../redux/reducers/workoutReducer'
import { setTemplate } from '../../redux/reducers/templateReducer'

import { Box } from '@mui/material'
import { Delete, Edit, Remove } from '@mui/icons-material'

import EditWorkoutModal from '../Modals/EditWorkoutModal'
import BasicModal from '../Modals/BasicModal'
import BasicMenu from './BasicMenu'

const HistoryMenu = ({ workout }) => {
    console.log("Redndering HistoryMenu ", workout);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)


    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        dispatch(clearWorkout())
        setOpenDelete(false)
        setOpenEdit(false)
        setAnchorEl(null)
    }

    const handleDelete = () => {
        navigate('/history')
        handleClose()
        dispatch(deleteWorkout(workout.id))
    }

    const copy = () => {
        dispatch(setTemplate(workout))
    }

    const handleEdit = () => {
        copy()
        setOpenEdit(true)
    }

    return (
        <Box display="flex">
            {/* <IconButton
                id="basic-menu-button"
              
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenuClick}
            >
                <MoreVertIcon sx={{ padding: 0 }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <ListItemButton onClick={() => setOpenEdit(true)}>
                    <Stack direction="row" spacing={1}>
                        <EditIcon color='info' />
                        <div>Edit</div>
                    </Stack>
                </ListItemButton>
                <ListItemButton onClick={() => setOpenDelete(true)}>
                    <Stack direction={'row'} spacing={1}>
                        <DeleteForeverIcon color='error' />
                        <div>Delete</div>
                    </Stack>
                </ListItemButton>
            </Menu> */}
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleOpen={handleOpen}
                handleClose={() => handleClose()}
                //openDelete={() => setOpenDelete(true)}
                //openEdit={() => setOpenEdit(true)}
                //object={exercise}
                buttons={[
                    {
                        text: "Edit",
                        icon: <Edit color="info" />,
                        onClick: () => handleEdit()
                    },
                    {
                        text: "Delete",
                        icon: <Delete color="error" />,
                        onClick: () => setOpenDelete(true)
                    },
                ]}
            />
            <BasicModal
                open={openDelete}
                onClose={() => handleClose()}
                title="Delete workout?"
                subTitle="Are you sure you want to delete this workout from history? This action cannot be undone."
                confirmButtonText='Delete'
                cancelButtonText='Cancel'
                onSubmit={() => handleDelete()}
            />
            {openEdit &&
                <EditWorkoutModal
                    open={openEdit}
                    onClose={handleClose}
                    title="Edit workout"
                    disableWarning={true}
                    workout={workout}
                    editVipu={true}
                    type="history"
                />
            }
        </Box>
    )
}

export default HistoryMenu