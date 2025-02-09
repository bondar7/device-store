import {$authHost} from "../http";
import {refreshToken} from "../http/authAPI";
import logoutUser from "./logoutUser";

export const $makeAuthGet = async (URL, isRetry = false) => {
    if (!URL) return;
    try {
        const { data } = await $authHost.get(URL);
        return data;
    } catch (e) {
        const msg = e?.response?.data?.message || e.message;
        const status = e?.response?.status;
        if (msg.toLowerCase().includes("expired") && !isRetry) {
            try {
                await refreshToken(); //request new access token
                console.log("Refresh token succeeded");
                return await $makeAuthGet(URL, true);
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