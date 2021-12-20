import Login from "../views/Login/Login"
import Home from "../views/Home/Home"
import NotFound from '../views/NotFound/NotFound'
import Permissions from '../views/DashBoard/Permissions';
import EntityPage from "../views/EntityPage/EntityPage";
import Student from '../views/Student/Student';
export default function getRoutes(){
    return [
        {path:"/Login",component:Login},
        {path:"/Home",component:Home},
        {path:"/:entity",component:EntityPage},
        {path:"/Dashboard/Permissions",component:Permissions},
        {path:"/students/:id",component:Student},
        {path:"*",component:NotFound},

    ]
}