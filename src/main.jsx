import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom"
import store from './redux/store'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import App from './App'
import './Main.css'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    zIndex: {
        modal: 1501,
        drawer: 1500
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <BrowserRouter>
                        <CssBaseline />
                        <App />
                    </BrowserRouter>
                </LocalizationProvider>
            </ThemeProvider>
        </Provider >
    </StrictMode>

)