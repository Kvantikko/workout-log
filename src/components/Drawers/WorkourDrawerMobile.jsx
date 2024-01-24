import { Box, Slide, Drawer } from '@mui/material'

import Workout from '../Workout/Workout'
import WorkoutToolbar from '../Toolbars/WorkoutToolbar'
import HideAppBar from '../AppBar/HideAppBar'

export default function WorkoutDrawerMobile({ toggleDrawer, open }) {

    console.log('------------- Rendering MOBILE Drawer -----------');

    return (
        <Slide direction="up" in={true} >
            <div>
                <Drawer
                    anchor={"bottom"}
                    variant="temporary"
                    open={open}
                    onClose={toggleDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: {
                            height: 'calc(100% - 0px)',
                            backgroundColor: "black",
                        }
                    }}
                >
                    <HideAppBar open={open} >
                        <WorkoutToolbar handleDrawerOpen={toggleDrawer} />
                    </HideAppBar>
                    <Box paddingTop={10}>
                        <Workout type={'active'} />
                    </Box>
                </Drawer >
            </div>
        </Slide>
    )
}
