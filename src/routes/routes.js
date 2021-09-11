import Login from "../views/Login/Login"
import Home from "../views/Home/Home"
export default function getRoutes(){
    return [
        {path:"/Login",component:Login},
        {path:"/Home",component:Home},
        {path:"/Home/:section",component:Home}
    ]
}