import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import store from './redux/store'
import { Provider } from 'react-redux'
import App from './App'
import './Main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>

)