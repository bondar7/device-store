import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            {user.isAdmin && adminRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            {publicRoutes.map(({path, Component, exact}) =>
                <Route key={path} element={Component} path={path} exact={exact}/>)}
            `{/* Default route - redirects to shop */}`
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;