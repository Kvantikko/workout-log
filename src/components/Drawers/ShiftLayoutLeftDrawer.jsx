import { Drawer } from "@mui/material"
import { useSelector } from "react-redux"

/**
 * pushes layout to left when workout component is shown, since the actual workout drawer is outside of router
 */

const ShiftLayoutLeftDrawer = () => {

    const isAuthenticated = useSelector(state => state.user)? true : false
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    return isAuthenticated && isWorkoutActive && (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                zIndex: 0,
                width: { xs: 'none', md: 400, lg: 500 },
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                    width: { xs: 'none', md: 400, lg: 500 },
                    boxSizing: 'border-box',
                    bgcolor: 'transparent',
                    pointerEvents: 'none'
                },
            }}
        />
    )
}

export default ShiftLayoutLeftDrawer