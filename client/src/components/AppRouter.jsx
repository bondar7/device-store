import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user)
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            {publicRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            `{/* Default route - redirects to shop */}`
            `<Route path="*" element={<Navigate to={SHOP_ROUTE} />} />`
        </Routes>
    );
};

export default AppRouter;