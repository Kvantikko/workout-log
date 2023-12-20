import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import store from './redux/store'
import { Provider, useSelector } from 'react-redux'
import App from './App'
import './Main.css'
import { Box, SwipeableDrawer, Toolbar, ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import ActiveWorkout from './components/Workout/Workout'
import SwipeableEdgeDrawer from './components/Drawers/SwipeableEdgeDrawer'

import ExpandablePermanentDrawer from './components/Drawers/ExpandablePermanentDrawer'


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    zIndex: {
        //appBar: 0,
        modal: 1501,
        drawer: 1500
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

                <ExpandablePermanentDrawer />
                <SwipeableEdgeDrawer />
            </div>
       
       
            <Router>
                <App />
            </Router>

        </ThemeProvider>
    </Provider >

)