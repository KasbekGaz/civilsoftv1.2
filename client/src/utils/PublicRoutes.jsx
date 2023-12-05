import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound';
import LoginUser from '../components/forms/user/LoginUser'
import RegisterUser from '../components/forms/user/RegisterUser';
import ObraList from '../components/forms/obra/ObraList';


const PublicRoutes =() =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<NotFound/>}/>
                    <Route path='/login' element={<LoginUser/>} />
                    <Route path='/register' element={<RegisterUser/>} />
                    <Route path='/obras' element={<ObraList/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PublicRoutes;