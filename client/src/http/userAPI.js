import {$authHost, $host}  from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password) => {
        const {data} = await $host.post("api/user/register", {email, password}, {withCredentials: true});
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
}

export const login = async (email, password) => {
        const {data} = await $host.post("api/user/login", {email, password}, {withCredentials: true});
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
}

