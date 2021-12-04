import Login from "../views/Login/Login"
import Home from "../views/Home/Home"
import NotFound from '../views/NotFound/NotFound'
import Permissions from '../views/DashBoard/Permissions';
import EntityPage from "../views/EntityPage/EntityPage";
export default function getRoutes(){
    return [
        {path:"/Login",component:Login},
        {path:"/Home",component:Home},
        {path:"/Reports/:entity",component:EntityPage},
        {path:"/Dashboard/Permissions",component:Permissions},
        {path:"*",component:NotFound}
    ]
}