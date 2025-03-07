import {$authHost, $host}  from "./index";
import {jwtDecode} from "jwt-decode";
import {$makeAuthPut} from "../utils/makeAuthPut";

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

export const logout = async () => {
        const {data} = await $host.post("api/user/logout", {}, {withCredentials: true});
        localStorage.removeItem('token');
        return data;
}

export const update = async (username, email, password) => {
        const data = await $makeAuthPut("api/user/update", {username, email, password});
        return data;
}
