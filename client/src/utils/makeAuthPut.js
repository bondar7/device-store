import {refreshToken} from "../http/authAPI";
import {$authHost} from "../http";
import logoutUser from "./logoutUser";

export const $makeAuthPut = async (URL, obj, isRetry = false) => {
    if (!obj) return;
    try {
        const { data } = await $authHost.put(URL, obj);
        return data;
    } catch (e) {
        const msg = e?.response?.data?.message || e.message;
        const status = e?.response?.status;
        if (msg.toLowerCase().includes("expired") && !isRetry) {
            try {
                await refreshToken(); //request new access token
                console.log("Refresh token succeeded");
                return await $makeAuthPut(URL, obj, isRetry);
            } catch (e) {
                console.error("Refresh token failed:", e.response);
                logoutUser(true);
            }
        } else if (status === 401) { //unauthorized - token has not been provided or is invalid
            console.log("Auth failed: ", msg);
            logoutUser(true);
        } else {
            throw e;
        }
    }
}