import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE, CHECKOUT_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./components/Shop/Shop";
import DevicePage from "./pages/DevicePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/profile/ProfilePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: <Basket/>,
        exact: true
    },
    {
        path: PROFILE_ROUTE,
        Component: <ProfilePage/>,
        exact: true
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>,
        exact: true
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>,
        exact: true
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: <DevicePage/>,
        exact: true
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login/>,
        exact: true
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Register/>,
        exact: true
    }
]