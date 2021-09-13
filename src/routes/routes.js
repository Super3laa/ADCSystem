import Login from "../views/Login/Login"
import Home from "../views/Home/Home"
import NotFound from '../views/NotFound/NotFound'
import Permissions from '../views/DashBoard/Permissions';
export default function getRoutes(){
    return [
        {path:"/Login",component:Login},
        {path:"/Home",component:Home},
        {path:"/Home/:section",component:Home},
        {path:"/Dashboard/Permissions",component:Permissions},
        {path:"*",component:NotFound}
    ]
}