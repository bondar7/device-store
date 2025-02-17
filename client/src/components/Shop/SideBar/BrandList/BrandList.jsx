import React, {useContext, useState} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import BrandItem from "./BrandItem";

const BrandList = observer(() =>  {
    const {store} = useContext(Context);
    return (
        <div className="w-100 mt-3" style={{borderTop: "1px solid lightgray"}}>
            <div className="p-2 m-2">
                <div className="mb-2">Brand <span className="text-muted">{store?.brands?.length}</span></div>
                <div style={{maxHeight: 200, overflowY: "auto"}}>
                    {store?.brands?.map(brand =>
                        <BrandItem brand={brand}/>
                    )}
                </div>
            </div>
        </div>
    );
});

export default BrandList;