import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { editExercise, deleteExercise } from '../../redux/reducers/exerciseLibraryReducer'

import ExerciseForm from '../Forms/ExerciseForm'
import FormModal from '../Modals/FormModal'
import BasicMenu from './BasicMenu'
import BasicModal from '../Modals/BasicModal'

const ExerciseMenu = ({ exercise, showDateRange }) => {


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
        navigate('/exercises')
        handleClose()
        dispatch(deleteExercise(exercise.id))
    }

    return (
        <div>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleOpen={handleOpen}
                handleClose={() => handleClose()}
                openDelete={() => setOpenDelete(true)}
                openEdit={() => setOpenEdit(true)}
                object={exercise}
            />
            {openEdit &&
                <FormModal
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    title="Edit exercise"
                >
                    <ExerciseForm
                        onSubmit={handleEdit}
                        onCancel={() => setOpenEdit(false)}
                        exercise={exercise}
                    />
                </FormModal>
            }
            {openDelete &&
                <BasicModal
                    open={openDelete}
                    onClose={() => handleClose()}
                    title="Delete exercise?"
                    subTitle="Are you sure you want to remove this exercise and its history from the database?
                    This action cannot be undone"
                    confirmButtonText='Delete'
                    cancelButtonText='Cancel'
                    onSubmit={() => handleDelete()}
                />
            }
        </div>
    );
}

export default ExerciseMenu