import CreateExerciseModal from './CreateExerciseModal'
import EditExerciseModal from './EditExerciseModal'
import DeleteExerciseModal from './DeleteExerciseModal'
import CancelWorkoutModal from './CancelWorkoutModal'
import SaveWorkoutModal from './SaveWorkoutModal'
import PickDateModal from './PickDateModal'
import ConfirmCopyModal from './ConfirmCopyModal'

export const renderModalChildren = (modalType, handleClose, exercise, copyFunction) => {
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
        case "pickDateModal":
            return <PickDateModal handleClose={handleClose} />
        case "confirmCopyModal":
            return <ConfirmCopyModal handleClose={handleClose} copyFunction={copyFunction}/>
        default:
            return <div>nothing</div>
    }
}

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

