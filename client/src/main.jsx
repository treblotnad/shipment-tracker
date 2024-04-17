import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard.jsx'
import Account from './pages/Account.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1 className='display-2'>Wrong page!</h1>,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/dashboard',
                element: <Dashboard />
            }, {
                path: '/account',
                element: <Account />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
