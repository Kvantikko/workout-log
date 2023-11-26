import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StraightenIcon from '@mui/icons-material/Straighten';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';



import Fab from '@mui/material/Fab';

import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const TemporaryDrawer = ( {setPage} ) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });



    const list = (anchor) => (
        <Box
           /*  sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
                marginLeft: "auto"
            }} */
            //role="presentation"
           // onClick={toggleDrawer(anchor, false)}
           // onKeyDown={toggleDrawer(anchor, false)}
        
        >
            <Divider />
            <List>
                {['Workout', 'History', 'Exercises','Measurements', 'Profile'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={ReactRouterLink} to={`/${text.toLowerCase()}`} >
                            <ListItemIcon>
                                {index === 0 && <AddIcon />}
                                {index === 1 && <HistoryIcon />}
                                {index === 2 && <FitnessCenterIcon />}
                                {index === 3 && <StraightenIcon />}
                                {index === 4 && <PersonIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* <ListItemButton component={ReactRouterLink} to='profile'>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Profile' />
            </ListItemButton> */}
        </Box>
    );


    return (
      <div>
          <React.Fragment key={'left'}>
            <Drawer
              //anchor={'left'}
              //elevation={0}
              open
              //open={state[anchor]}
              //onClose={toggleDrawer(anchor, false)}
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
                zIndex: 0
              }}
            >
              {list('left')}
            </Drawer>
          </React.Fragment>
    
      </div>
    )
}

export default TemporaryDrawer