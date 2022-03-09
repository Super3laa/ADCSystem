import Login from "../views/Login/Login"
import Home from "../views/Home/Home"
import NotFound from '../views/NotFound/NotFound'
import Permissions from '../views/DashBoard/Permissions';
import EntityPage from "../views/EntityPage/EntityPage";
import Student from '../views/Student/Student';
import jwtDecode from 'jwt-decode';
import Course from "../views/Course/Course";
import Doctor from "../views/Doctor/Doctor";
import Officer from "../views/Officer/Officer";
import TAssistant from "../views/TAssistant/TAssistant";
export default function getRoutes(){
    try {
        if(localStorage.getItem('token')){
            let user = jwtDecode(localStorage.getItem('token')).user;
            switch (user.permissions){
                case 'superadmin':
                    console.log('supradmin routes')
                    return superadmin
                case 'admin':
                    console.log('adminroutes')
                    return admin
            }
        }else {
            console.log('passer')
            return passByRoutes
    
        }
    } catch (error) {
        
    }
    
}

const passByRoutes = [
    {path:"/Login",component:Login},
    {path:"*",component:NotFound},
]
const superadmin = [
    {path:"/Home",component:Home},
    {path:"/coursesDetails",component:Home},
    {path:"/:entity",component:EntityPage},
    {path:"/Dashboard/Permissions",component:Permissions},
    {path:"/students/:id",component:Student},
    {path:"/courses/:type/",component:EntityPage},
    {path:"/courses/detailed/:id",component:Course},
    {path:"/doctors/:id",component:Doctor},
    {path:"/officers/:id",component:Officer},
    {path:"/tassistants/:id",component:TAssistant},
    {path:"*",component:NotFound},
]
const admin = [
    {path:"/Home",component:Home},
    {path:"/:entity",component:EntityPage},
    {path:"/Dashboard/Permissions",component:Permissions},
    {path:"/students/:id",component:Student},
    {path:"/courses/:id",component:Course},
    {path:"/doctors/:id",component:Doctor},
    {path:"/officers/:id",component:Officer},
    {path:"/tassistants/:id",component:TAssistant},

    {path:"*",component:NotFound},
]