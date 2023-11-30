import { Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound';
import LoginUser from '../components/forms/user/LoginUser'



const PublicRoutes =() =>{
    return(
        <>
            <Routes>
                <Route path='/*' element={<NotFound/>}/>
                <Route path='/' element={<LoginUser/>} />
                
            </Routes>
        </>
    )
}

export default PublicRoutes;