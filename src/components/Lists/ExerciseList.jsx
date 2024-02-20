import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { saveExercise } from '../../redux/reducers/exerciseLibraryReducer'

import { Stack, Button, List, Typography } from '@mui/material'

import FormModal from '../Modals/FormModal'
import ExerciseForm from '../Forms/ExerciseForm'
import ExerciseListItem from "../ListItems/ExerciseListItem"
import Defer from '../Defer/Defer'

const ExerciseList = ({ handleClick, showChecked, handleCreateClick }) => {

    //console.log("Rendering ExerciseList ")

    const exercises = useSelector(state => state.exerciseLibrary.search.filteredExercises)
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const searchString = useSelector(state => state.exerciseLibrary.search.searchString)

    const dispatch = useDispatch()

    const handleSave = (exerciseName, targetMuscle) => {
        setOpenCreateModal(false)
        dispatch(saveExercise(exerciseName, targetMuscle))
    }

    return (
        <List spacing={0} >
            {exercises?.length === 0 &&
                <Stack spacing={2} paddingTop={6}>
                    <Typography variant='h6' textAlign={'center'}>{`No matches found for "${searchString}" `}</Typography>
                    <Button onClick={() => handleCreateClick ? handleCreateClick() : setOpenCreateModal(true)}>
                        Create exercise
                    </Button>
                </Stack>
            }

            <Defer chunkSize={15}>
                {exercises?.map((exercise, index) =>
                    <ExerciseListItem
                        key={exercise.id}
                        exercise={exercise}
                        showChecked={showChecked}
                        handleClick={handleClick}
                    />
                )}
            </Defer>

            {openCreateModal &&
                <FormModal
                    open={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    title="Create exercise"
                >
                    <ExerciseForm
                        onSubmit={handleSave}
                        onCancel={() => setOpenCreateModal(false)}
                        exercise={{ name: searchString }}
                    />
                </FormModal>
            }
        </List>
    )
}

export default ExerciseList