import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Box, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import BasicModal from '../Modals/BasicModal';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import templateService from '../../services/templates'

import { useNavigate } from 'react-router-dom';
import { addExercisesToTemplate, addSetsToTemplate, clearTemplate, setTemplate, setTemplateName } from '../../redux/reducers/templateReducer';

import { removeFromHistory } from '../../redux/reducers/historyReducer';
import { removeTemplate } from '../../redux/reducers/templateLibraryReducer';
import BasicMenu from './BasicMenu';
import CreateEditWorkoutModal from '../Modals/CreateEditWorkoutModal';

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

    const deleteTemplate = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        try {
            const response = await templateService.remove(workout?.id)
            dispatch(removeTemplate(workout?.id))
            handleClose()
            toast.success("Template deleted!");
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const copy = () => {
        //console.log("COPY");

        dispatch(setTemplate(workout))

        /* dispatch(setTemplateName(workout.title))
        dispatch(addExercisesToTemplate(workout.workoutExercises))
        let setsWithExerciseId = []
        //let sets = []
        workout.workoutExercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                const setWithExerciseId = { ...set, exerciseId: exercise.id }
                setsWithExerciseId.push(setWithExerciseId)
                //sets.push(set)
            })
        })
        dispatch(addSetsToTemplate(setsWithExerciseId)) */
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
                openDelete={() => setOpenDelete(true)}
                openEdit={() => handleEdit()}
                object={workout}
            />
            <BasicModal
                open={openDelete}
                onClose={() => handleClose()}
                title="Delete template?"
                subTitle="Are you sure you want to delete this workout template? This action cannot be undone."
                confirmButtonText='Delete'
                cancelButtonText='Cancel'
                onSubmit={() => deleteTemplate()}
            />
            <CreateEditWorkoutModal
                open={openEdit}
                onClose={handleClose}
                title="Edit template"
                disableWarning={true}
                workout={workout}
                editVipu={true}
            />
        </>
    );
}

export default TemplateMenu