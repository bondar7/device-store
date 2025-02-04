import {$authHost, $host} from "./index";

export const checkAuth = async () => {
    const response = await $authHost.post("api/user/auth");
    return response.status === 200;
}

export const refreshToken = async () => {
    const response = await $host.get("api/user/refresh", {withCredentials: true})
    localStorage.setItem("token", response.data.token);
    return response.data.token;
}