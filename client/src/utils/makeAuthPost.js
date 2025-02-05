import {refreshToken} from "../http/authAPI";
import {$authHost} from "../http";

export const $makeAuthPost = async (URL, obj, ) => {
    if (obj) {
        try {
            const {data} = await $authHost.post(URL, obj);
            return data;
        } catch (e) {
            const msg = e.response?.data?.message || e.message;
            if (msg.includes("expired")) {
                try {
                    const newToken = await refreshToken(); //request new access token
                    console.log("Refresh token succeed");
                    return await $makeAuthPost(URL, obj);
                } catch (e) {
                    console.error("Refresh token failed:", e.response);
                }
            } else if (msg.includes("invalid")) {
                console.error("Auth failed:", msg);
            } else {
                throw e;
            }
        }
    }
}