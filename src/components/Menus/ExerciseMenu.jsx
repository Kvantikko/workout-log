import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Box, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useDispatch } from 'react-redux';
import ExerciseForm from '../Forms/ExerciseForm';
import { toast } from 'react-toastify';

import exerciseService from '../../services/exercises'
import { removeExercise } from '../../redux/reducers/exerciseLibraryReducer';
import FormModal from '../Modals/FormModal';
import { useNavigate } from 'react-router-dom';
import BasicMenu from './BasicMenu';
import BasicModal from '../Modals/BasicModal';
import { updateExercise } from '../../redux/reducers/exerciseLibraryReducer';

const ExerciseMenu = ({ exercise, showDateRange }) => {


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
        setOpenDelete(false)
        setOpenEdit(false)
        setAnchorEl(null)
    }

    const editExercise = async (exerciseName, targetMuscle) => {
        try {
            const updatedExercise = await exerciseService.update(exercise.id, exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
            console.log('servu palautti: ', updatedExercise, ' dispatchataan storeen')
            dispatch(updateExercise(updatedExercise))
            toast.success('Exercsise edited!')
            handleClose()
        } catch (err) {
            toast.error(err.response)
        }

    }

    const deleteExercise = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        try {
            const response = await exerciseService.remove(exercise?.id)
            dispatch(removeExercise(exercise.id))
            handleClose()
            toast.success("Exercise deleted succesfully!");
            navigate('/exercises')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
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
                    <ExerciseForm onSubmit={editExercise} onCancel={() => setOpenEdit(false)} exercise={exercise} />
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
                    onSubmit={() => deleteExercise()}
                />
            }
        </div>
    );
}

export default ExerciseMenu