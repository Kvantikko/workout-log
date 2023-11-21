import CreateExerciseModal from './CreateExerciseModal'
import EditExerciseModal from './EditExerciseModal'
import DeleteExerciseModal from './DeleteExerciseModal'
import CancelWorkoutModal from './CancelWorkoutModal'
import SaveWorkoutModal from './SaveWorkoutModal'
import PickDateModal from './PickDateModal'
import ConfirmCopyModal from './ConfirmCopyModal'
import DeleteUserModal from './DeleteUserModal'
import EditUserModal from './EditUserModal'
import LogoutModal from './LogoutModal'
import DeleteWorkoutModal from './DeleteWorkoutModal'

export const renderModalChildren = (modalType, confirmFunction, confirmButton, object) => {
    //console.log("RENDERMODALCHILD FUNC PROPS: ", modalType, handleClose, confirmFunction, confirmButton, color);
    switch (modalType) {
        case "editUserModal":
            return <EditUserModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "deleteExercise":
            return <DeleteExerciseModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "editExercise":
            return <EditExerciseModal confirmFunction={confirmFunction} confirmButton={confirmButton} exercise={object} />
        case "createExercise":
            return <CreateExerciseModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "cancelWorkout":
            return <CancelWorkoutModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "saveWorkout":
            return <SaveWorkoutModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "pickDateModal":
            return <PickDateModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "confirmCopyModal":
            return <ConfirmCopyModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        default:
            return <div>Not yet implemented</div>
    }
}

export const renderModalText = (modalType) => {

    switch (modalType) {
        case "logoutModal":
            return <LogoutModal />
        case "deleteUserModal":
            return <DeleteUserModal />
        case "deleteWorkoutModal":
            return <DeleteWorkoutModal />
        case "deleteExercise":
            return <DeleteExerciseModal />
        case "editExercise":
            return <EditExerciseModal />
        case "createExercise":
            return <CreateExerciseModal />
        case "cancelWorkout":
            return <CancelWorkoutModal />
        case "saveWorkout":
            return <SaveWorkoutModal />
        case "pickDateModal":
            return <PickDateModal />
        case "confirmCopyModal":
            return <ConfirmCopyModal />
        default:
            return <div>Not yet implemented</div>
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
    //display: 'flex',
    //flexDirection: 'column'
};

