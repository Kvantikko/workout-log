import * as React from 'react'
import { Link as ReactRouterLink, useLocation, useMatch, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSelector } from 'react-redux'
import LeftNavigationBar from './LeftNavigationBar'
import BottomNavBar from './BottomNavBar'

export default function NavBar() {

    const navLocations = useSelector(state => state.nav)
    const isAuthenticated = useSelector(state => state.user) ? true : false
    const isSmallScreen = useMediaQuery('(max-width:900px)');

    const matchExercise = useMatch('/exercises/:id')
    const matchHistory = useMatch('/history/:id')
    const matchMeasure = useMatch('/measure/:id')

    const pageIndex = () => {
        switch (location.pathname) {
            case "/workout":
                return 0
            case "/history":
                return 1
            case `/history/${matchHistory?.params.id}`:
                return 1
            case "/exercises":
                return 2
            case `/exercises/${matchExercise?.params.id}`:
                return 2
            case "/measure":
                return 3
            case `/measure/${matchMeasure?.params.id}`:
                return 3
            case "/profile":
                return 4
            default:
                return 0
        }
    }

    return (
        <>
            {isSmallScreen ?
                <BottomNavBar
                    pageIndex={pageIndex}
                    isAuthenticated={isAuthenticated}
                    navLocations={navLocations}
                />
                :
                <LeftNavigationBar
                    pageIndex={pageIndex}
                    isAuthenticated={isAuthenticated}
                    navLocations={navLocations}
                />
            }
        </>
    )
}