import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Body() {
    const user = useSelector((store) => store.user.user);

    const appRouter = createBrowserRouter(
        [
            {
                path: '/',
                element: user ? <Navigate to="/browse" /> : <Login />,
            },
            {
                path: '/browse',
                element : <Browse/>
            }
        ]
    )
    return (
        <>
            <div>
                <RouterProvider router={appRouter} />
            </div>
        </>
    
    )
}

export default Body
