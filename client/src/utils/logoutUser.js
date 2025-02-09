import {logout} from "../http/userAPI";
import {globalUserStore} from "../index";

export default function logoutUser(showModal) {
    //clear user store, so that user is logged out
    logout()
        .then(data => {
                console.log(data);
                globalUserStore.setIsAuth(false);
                globalUserStore.setIsAdmin(false);
                globalUserStore.setUser({});
                globalUserStore.setIsAccessError(showModal);
            }
        )
        .catch(e => {
            console.log(e);
        })
}