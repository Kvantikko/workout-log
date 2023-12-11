import CreateExerciseModal from './CreateExerciseModal'
import EditExerciseModal from './EditExerciseModal'


import PickDateModal from './PickDateModal'
import ConfirmCopyModal from './CopyWorkoutModal'
import EditUserModal from './EditUserModal'

import AddExerciseToWorkoutModal from './AddExerciseToWorkoutModal'

import { useMediaQuery } from '@mui/material'

export const renderModalChildren = (modalType, confirmFunction, confirmButton, object) => {
    //console.log("RENDERMODALCHILD FUNC PROPS: ", modalType, handleClose, confirmFunction, confirmButton, color);
    switch (modalType) {
        case "editUserModal":
            return <EditUserModal confirmFunction={confirmFunction} confirmButton={confirmButton} />

        case "editExercise":
            return <EditExerciseModal confirmFunction={confirmFunction} confirmButton={confirmButton} exercise={object} />
        case "createExercise":
            return <CreateExerciseModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
 
    /*     case "saveWorkout":
            return <SaveWorkoutModal confirmFunction={confirmFunction} confirmButton={confirmButton} /> */
        case "pickDateModal":
            return <PickDateModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "confirmCopyModal":
            return <ConfirmCopyModal confirmFunction={confirmFunction} confirmButton={confirmButton} />
        case "addExerciseToWorkout":
            return <AddExerciseToWorkoutModal confirmFunction={confirmFunction} confirmButton={confirmButton} exercises={object} />
        default:
            return <div>Not yet implemented</div>
    }
}

export const renderModalText = (modalType) => {

    switch (modalType) {

  
       
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
    height: '100wh',
    maxHeight: '100%',
    maxWidth: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
};

export const addExerciseToWorkoutStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw' },
    height: { xs: '100vh', sm: '90%' },
    //maxHeight: '100%',
   // maxWidth: 550,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
};

