import { useDispatch, useSelector } from 'react-redux'
import {
    pauseRestWatch,
    pauseWorkoutWatch,
    resetRestWatch,
    resetWorkoutWatch,
    startRestWatch,
    startWorkoutWatch
} from '../../redux/reducers/stopWatchReducer'

import { Box, Stack } from '@mui/material'

import Timer from './Timer'
import ClockControlButtons from '../Buttons/ClockControlButton'

function StopWatch({ showButtons, size, isRestTimer }) {

    const isActive = isRestTimer ?
        useSelector(state => state.stopWatch.restWatch.isActive) :
        useSelector(state => state.stopWatch.workoutWatch.isActive)

    const dispatch = useDispatch();

    const handleStart = () => {
        isRestTimer ? dispatch(startRestWatch()) : dispatch(startWorkoutWatch())
    }

    const handlePause = () => {
        isRestTimer ? dispatch(pauseRestWatch()) : dispatch(pauseWorkoutWatch())
    }

    const handleReset = () => {
        isRestTimer ? dispatch(resetRestWatch()) : dispatch(resetWorkoutWatch())
    }

    return (
        <Stack direction={'row'}>
            <Box sx={{ margin: 'auto' }}>
                <Timer isRestTimer={isRestTimer} size={size} />
            </Box>
            {showButtons &&
                <ClockControlButtons
                    sx={{ justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}
                    isActive={isActive}
                    handleStart={handleStart}
                    handlePause={handlePause}
                    handleReset={handleReset}
                />
            }
        </Stack>
    )
}

export default StopWatch
