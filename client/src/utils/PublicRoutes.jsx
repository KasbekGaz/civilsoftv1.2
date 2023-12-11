import { BrowserRouter as Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound';
import Login from '../pages/Login'
import Register from '../pages/Register'
import Logout from '../pages/Logout';

const PublicRoutes =() =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<NotFound/>}/>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/logout' element={<Logout/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PublicRoutes;