import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {addToBasket, deleteFromBasket} from "../../http/basketAPI";
import {addToWishlist, deleteFromWishlist} from "../../http/wishlistAPI";
import {Card, Col, Image} from "react-bootstrap";
import {DEVICE_ROUTE} from "../../utils/consts";
import star from "../../assets/star.png";
import filledHeart from "../../assets/filled_heart.png";
import heart from "../../assets/heart.png";
import filledGreenCart from "../../assets/filled_green_cart.png";
import greenCart from "../../assets/green_cart.png";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const WishlistItem = observer(({device}) => {
    const {wishlist, basket} = useContext(Context);
    const navigate = useNavigate();
    const [clickedCart, setClickedCart] = useState(false);
    const [clickedHeart, setClickedHeart] = useState(true);
    const handleCartChange = async (e) => {
        e.stopPropagation();
        const newValue = !clickedCart;
        setClickedCart(newValue);
        if (newValue) await addToBasket(device.id);
        if (!newValue) await deleteFromBasket(device.id);
    }
    const handleHeartChange = async (e) => {
        e.stopPropagation();
        const newValue = !clickedHeart;
        setClickedHeart(newValue);
        if (newValue) await addToWishlist(device.id);
        if (!newValue) {
            await deleteFromWishlist(device.id);
            wishlist.removeDevice(device.id);
        }
    }
    useEffect(() => {
        const isInBasket = basket?.basket?.devices?.some(d => d.device.id === device.id);
        setClickedCart(isInBasket);
    }, [basket.basket.devices]);
    return (
        <Col md={2} className='mt-3 d-flex justify-content-center' onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}>
            <Card style={{width: 150, cursor: 'pointer'}} border='light'>
                <Image
                    src={process.env.REACT_APP_API_URL + device.img}
                    style={{
                        maxWidth: 150,
                        maxHeight: 150,
                        width: "auto",
                        height: "auto",
                        objectFit: "contain"
                    }}
                />
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='text-black-50'>{device.brandName ? device.brandName : 'Loading...'}</div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
                <div className="d-flex justify-content-between">
                    <div className="start" style={{color: "green"}}>${device.price / 100}</div>
                    <div className="d-flex gap-2">
                        <Image width={22}
                               height={22}
                               style={{cursor: "pointer"}}
                               src={clickedHeart ? filledHeart : heart}
                               onClick={handleHeartChange}
                        />
                        <Image width={22}
                               height={22}
                               style={{cursor: "pointer"}}
                               src={clickedCart ? filledGreenCart : greenCart}
                               onClick={handleCartChange}
                        />
                    </div>
                </div>
            </Card>
        </Col>
    );
});

export default WishlistItem;