import * as React from 'react';
import BasicModal from '../Modals/BasicModal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearTemplate, setTemplate, setTemplateName } from '../../redux/reducers/templateReducer';
import { Delete, Edit, Remove } from '@mui/icons-material'
import BasicMenu from './BasicMenu';
import EditWorkoutModal from '../Modals/EditWorkoutModal';
import { deleteTemplate } from '../../redux/reducers/templateLibraryReducer';

const TemplateMenu = ({ workout }) => {

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        dispatch(clearTemplate())
        setOpenDelete(false)
        setOpenEdit(false)
        setAnchorEl(null)
    }

    const handleDelete = () => {
        handleClose()
        navigate('/')
        dispatch(deleteTemplate(workout.id))
    }

    const copy = () => {
        dispatch(setTemplate(workout))
    }

    const handleEdit = () => {
        copy()
        setOpenEdit(true)
    }

    return (
        <>
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
                        onClick: () =>  setOpenDelete(true)
                    },
                ]}
            />
            <BasicModal
                open={openDelete}
                onClose={() => handleClose()}
                title="Delete template?"
                subTitle="Are you sure you want to delete this workout template? This action cannot be undone."
                confirmButtonText='Delete'
                cancelButtonText='Cancel'
                onSubmit={() => handleDelete()}
            />
            <EditWorkoutModal
                open={openEdit}
                onClose={handleClose}
                title="Edit template"
                disableWarning={true}
                workout={workout}
                editVipu={true}
                type="template"
            />
        </>
    );
}

export default TemplateMenu