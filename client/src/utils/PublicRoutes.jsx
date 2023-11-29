import { Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound';




const PublicRoutes =() =>{
    return(
        <>
            <Routes>
                <Route path='/*' element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default PublicRoutes;