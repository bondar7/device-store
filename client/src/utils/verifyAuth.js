import {checkAuth, refreshToken} from "../http/authAPI";
import {jwtDecode} from "jwt-decode";

export const verifyAuth = async (user, setIsLoading) => {
        setIsLoading(true);
        try {
            const isAuth = await checkAuth();
            updateUserStore(user, isAuth, localStorage.getItem('token'));
        } catch (e) {
            const msg = e.response?.data?.message || e.message;
            if (msg.includes("expired")) {
                try {
                    const newToken = await refreshToken(); //request new access token
                    updateUserStore(user, true, newToken)
                    console.log("Refresh token succeed");
                } catch (e) {
                    console.error("Refresh token failed:", e.response);
                }
            } else {
                console.error("Auth check failed:", msg);
            }
        } finally {
            setIsLoading(false);
        }
}

function updateUserStore(user, isAuth, token) {
    if (!token) return;
    user.setUser(jwtDecode(token));
    user.setIsAuth(isAuth);
    if(user.user?.roles?.includes('ADMIN')) user.setIsAdmin(true);
}