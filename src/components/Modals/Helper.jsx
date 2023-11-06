import CreateExerciseModal from './CreateExerciseModal'
import EditExerciseModal from './EditExerciseModal'
import DeleteExerciseModal from './DeleteExerciseModal'
import CancelWorkoutModal from './CancelWorkoutModal'
import SaveWorkoutModal from './SaveWorkoutModal'

export const renderModalChildren = (modalType, handleClose, exercise) => {
    switch (modalType) {
        case "deleteExercise":
            return <DeleteExerciseModal handleClose={handleClose} exercise={exercise} />
        case "editExercise":
            return <EditExerciseModal handleClose={handleClose} exercise={exercise} />
        case "createExercise":
            return <CreateExerciseModal handleClose={handleClose} />
        case "cancelWorkout":
            return <CancelWorkoutModal handleClose={handleClose} />
        case "saveWorkout":
            return <SaveWorkoutModal handleClose={handleClose} />
        default:
            return <div>nothing</div>
    }
}

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

