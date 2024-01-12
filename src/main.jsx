import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import store from './redux/store'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import App from './App'
import SwipeableEdgeDrawer from './components/Drawers/SwipeableEdgeDrawer'
import ExpandablePermanentDrawer from './components/Drawers/ExpandablePermanentDrawer'
import './Main.css'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    zIndex: {
        //appBar: 0,
        modal: 1501,
        drawer: 1500
    },

    /* typography: {
        fontFamily: 'Raleway, Arial',
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'Raleway';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
      }, */
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                {/*    <div id='outsideRouter' className="scrollTesttt" >
                      <ExpandablePermanentDrawer />
                    <SwipeableEdgeDrawer className="scrollTesttt" />
                </div>

                <Router>
                    <App />
                </Router> */}
                <App />
            </LocalizationProvider>
        </ThemeProvider>
    </Provider >

)