import { memo } from "react"
import { Stack, Button, TextField, Divider, Box, Typography } from '@mui/material'
import { ListItem, ListItemButton, List, ListItemAvatar, IconButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setExercisesPath } from '../../redux/reducers/navReducer'
import ExerciseListButton from '../Buttons/ExerciseListButton'
import Defer from '../Defer/Defer'
import { useState } from 'react'
import FormModal from '../Modals/FormModal'
import ExerciseForm from '../Forms/ExerciseForm'
import { saveExercise } from '../../redux/reducers/exerciseLibraryReducer'



import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import ExerciseListItem from "../ListItems/ExerciseListItem"


const ExerciseList = ({ exercises, handleListClick, showChecked, checkedExercises }) => {

    const [openCreateModal, setOpenCreateModal] = useState(false)

    const dispatch = useDispatch()

    const handleSave = (exerciseName, targetMuscle) => {
        setOpenCreateModal(false)
        dispatch(saveExercise(exerciseName, targetMuscle))
    }

    return (

        <List
            spacing={0}
            sx={{
                //marginTop: 2,
                // paddingX: { xs: 0, sm: 2, md: 4 },
                //overflow: "hidden",
                //textOverflow: 'ellipsis',
                // width: 1,
            }}
        >
            {exercises.length === 0 &&
                <Stack spacing={2} paddingTop={6}>
                    <Typography variant='h6' textAlign={'center'}>No matches found</Typography>
                    <Button onClick={() => setOpenCreateModal(true)}>Create exercise</Button>
                </Stack>
            }

            {exercises.map((exercise, index) =>
                <Defer key={exercise.id} chunkSize={10}>
                    <ExerciseListItem
                        key={exercise.id}
                        exercise={exercise}
                        showChecked={showChecked}
                    />
                </Defer>
            )}

            {openCreateModal &&
                <FormModal
                    open={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    title="Create exercise"
                >
                    <ExerciseForm onSubmit={handleSave} onCancel={() => setOpenCreateModal(false)} />
                </FormModal>
            }
        </List>
    )
}

export default memo(ExerciseList)