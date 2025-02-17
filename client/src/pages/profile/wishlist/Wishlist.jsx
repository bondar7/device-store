import React, {useContext, useEffect} from 'react';
import {Context} from "../../../index";
import {fetchWishlist} from "../../../http/wishlistAPI";
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import WishlistItem from "./WishlistItem";

const Wishlist = observer(() => {
    const {wishlist} = useContext(Context);

    useEffect(() => {
        fetchWishlist().then(data => {
            wishlist.setDevices(data.devices);
            console.log(wishlist.devices);
        }).catch(e => console.log(e));
    }, []);
    return (
        <Row className='d-flex mb-4'>
            {wishlist?.devices?.map(device =>
                <WishlistItem key={device.id} device={device.device}/>)}
        </Row>
    );
});

export default Wishlist;