import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PublicRoutes from '../../utils/PublicRoutes'
import Logout from '../../pages/Logout';
import ObraList from '../../components/forms/obra/ObraList';



function Home(){
    return(
        <div>
            <div className='content'>
                <PublicRoutes />
                <Logout />
                <ObraList />
            </div>
        </div>
    );
}

export default Home;