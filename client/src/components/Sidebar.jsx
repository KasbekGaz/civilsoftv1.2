


const Sidebar = () =>{

    return(

    <nav className="bg-blue-900 h-screen w-64 p-4 flex flex-col">
        <a href="/obras" className="text-white mb-4">
            <h3 className="text-xl font-bold flex items-center">
                <i className="mr-2"></i>
                CivilSoft App
            </h3>
        </a>
        <div className=" p-4 rounded-md">
            <div className="mb-4">
                <h6 
                className="text-gray-200 
                text-sm
                font-semibold
                ">Usuario Autenticado</h6>
                <span className="text-gray-200 text-xs"> Rol de usuario</span>
            </div>
        </div>
    </nav>

    );

}

export default Sidebar;