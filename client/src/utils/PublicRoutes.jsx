import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound';
import LoginUser from '../components/forms/user/LoginUser'



const PublicRoutes =() =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<NotFound/>}/>
                    <Route path='/' element={<LoginUser/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PublicRoutes;