import * as React from 'react';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { expand, unExpand } from '../../redux/reducers/drawerReducer'

import useMediaQuery from '@mui/material/useMediaQuery'

import WorkoutDrawerDesktop from './WorkoutDrawerDesktop'
import WorkoutDrawerMobile from './WorkourDrawerMobile'

export default function WorkoutDrawer() {

    const open = useSelector(state => state.drawer)
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const isSmallScreen = useMediaQuery('(max-width:900px)')

    const dispatch = useDispatch()

    const toggleDrawer = () => {
        if (open) {
            window.history.back()
        } else {
            dispatch(expand())
        }
    }

    // if browser back button is pressed -> closes the drawer
    useEffect(() => {
        console.log("DRAWER EFFECT");
        if (window.location.href.includes("#workout") && open) {
            window.onpopstate = (event) => {
                dispatch(unExpand())
            }
        } else {
            window.onpopstate = null
        }
        return (() => { window.onpopstate = null })

    }, [open])

    return (
        <>
            {isSmallScreen ?
                <WorkoutDrawerMobile
                    className="WorkoutMobile"
                    toggleDrawer={toggleDrawer}
                    open={open}
                />
                :
                <WorkoutDrawerDesktop
                    className="WorkoutDesktop"
                    toggleDrawer={toggleDrawer}
                    open={open}
                    isWorkoutActive={isWorkoutActive}
                />
            }
        </>

    )
}
