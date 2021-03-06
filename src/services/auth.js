import axios from "axios";
import jwtDecode from "jwt-decode";
import { API } from "../const";

export async function loadUser() {
    if (localStorage.getItem('token')) {
        let res = await axios.post(API + 'user/getUser', { data: jwtDecode(localStorage.getItem('token')).user }).catch(err=>{
            localStorage.removeItem('token');
            window.location.reload();
        });
        console.log(res)
        if (res.status == 200) {
            return res.data
        }
        return false
    }

}