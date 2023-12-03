import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import store from './redux/store'
import { Provider, useSelector } from 'react-redux'
import App from './App'
import './Main.css'
import { Box, SwipeableDrawer, ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import ActiveWorkout from './components/Workout/ActiveWorkout'
import SwipeableEdgeDrawer from './components/Drawers/SwipeableEdgeDrawer'
import PermanentDrawerRight from './components/Drawers/PermanentDrawerRight'


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    zIndex: {
        //appBar: 0,
        //modal: 1250,
        //drawer: 0
    },
    /*   components: {
          MuiCssBaseline: {
              styleOverrides: `
              h1, h2, h3, h4, h5, h6, p {
                margin: 2;
              }
            `
          }
      } */

});



ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div id='outsideRouter'>

                {/*USE A PORTAL HERE......*/}

             {/*    <PermanentDrawerRight />
                <SwipeableEdgeDrawer /> */}
            </div>
            <Router>
                <App style={{ overflow: 'hidden '}} />
            </Router>

        </ThemeProvider>
    </Provider >

)