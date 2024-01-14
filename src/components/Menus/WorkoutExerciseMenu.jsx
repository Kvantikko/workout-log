import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { editExercise, deleteExercise } from '../../redux/reducers/exerciseLibraryReducer'

import { Edit, Remove } from '@mui/icons-material'
import ExerciseForm from '../Forms/ExerciseForm'
import FormModal from '../Modals/FormModal'
import BasicMenu from './BasicMenu'
import BasicModal from '../Modals/BasicModal'

const WorkoutExerciseMenu = ({ exercise, handleDelete }) => {

    console.log("EXErCISE MAENU ", exercise);


    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)

    const dispatch = useDispatch()

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
        dispatch(editExercise(exercise.exerciseId, exerciseName, targetMuscle))
    }

    const handleDeleteClick = () => {
        handleClose()
        handleDelete()
        //dispatch(deleteExercise(exercise.id))
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
                        text: "Remove",
                        icon: <Remove color="error" />,
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
                    title="Remove exercise?"
                    subTitle="Remove exercise and its sets from the workout? This action cannot be undone."
                    confirmButtonText={'Remove'}
                    cancelButtonText={'Cancel'}
                    confirmButtonColor="error"
                    onSubmit={() => handleDeleteClick()}
                />
            }
        </div>
    );
}

export default WorkoutExerciseMenu