import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { editExercise, deleteExercise } from '../../redux/reducers/exerciseLibraryReducer'

import { Delete, Edit, Remove } from '@mui/icons-material'
import ExerciseForm from '../Forms/ExerciseForm'
import FormModal from '../Modals/FormModal'
import BasicMenu from './BasicMenu'
import BasicModal from '../Modals/BasicModal'
import { resetExercisePath } from '../../redux/reducers/navReducer'

const ExerciseMenu = ({ exercise, showDateRange }) => {

    //console.log(exercise);


    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setOpenDelete(false)
        setOpenEdit(false)
        setAnchorEl(null)
    }

    const handleEdit = (exerciseName, targetMuscle) => {
        handleClose()
        dispatch(editExercise(exercise.id, exerciseName, targetMuscle))
    }

    const handleDelete = () => {
        handleClose()
        dispatch(deleteExercise(exercise.id, navigate))
    }

    return (
        <div>
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
                        onClick: () => setOpenEdit(true)
                    },
                    {
                        text: "Delete",
                        icon: <Delete color="error" />,
                        onClick: () =>  setOpenDelete(true)
                    },
                ]}
            />
            {openEdit &&
                <FormModal
                    open={openEdit}
                    onClose={() => handleClose()}
                    title="Edit exercise"
                >
                    <ExerciseForm
                        onSubmit={handleEdit}
                        onCancel={() => handleClose()}
                        exercise={exercise}
                    />
                </FormModal>
            }
            {openDelete &&
                <BasicModal
                    open={openDelete}
                    onClose={() => handleClose()}
                    title="Delete exercise?"
                    subTitle="Are you sure you want to remove this exercise from the database?"
                    confirmButtonText='Delete'
                    confirmButtonColor="error"
                    cancelButtonText='Cancel'
                    onSubmit={() => handleDelete()}
                />
            }
        </div>
    );
}

export default ExerciseMenu