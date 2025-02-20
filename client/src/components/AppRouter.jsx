import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {CHECKOUT_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CheckoutPage from "../pages/checkout/CheckoutPage";

const AppRouter = observer(() => {
    const {user, basket} = useContext(Context);
    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            {user.isAdmin && adminRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            {publicRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            {basket?.basket?.devices?.length >= 1 && <Route path={CHECKOUT_ROUTE} element={<CheckoutPage/>} exact/>}
            `{/* Default route - redirects to shop */}`
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;