import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../../../assets/star.png';
import filledGreenCart from '../../../assets/filled_green_cart.png';
import filledHeart from '../../../assets/filled_heart.png';
import greenCart from '../../../assets/green_cart.png';
import heart from '../../../assets/heart.png';
import deleteIcon from '../../../assets/delete.png';
import {useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE} from "../../../utils/consts";
import {addToBasket, deleteFromBasket} from "../../../http/basketAPI";
import {addToWishlist, deleteFromWishlist} from "../../../http/wishlistAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {deleteDeviceById} from "../../../http/deviceAPI";

const DeviceItem = observer(({device}) => {
    const navigate = useNavigate();
    const {wishlist, basket, user, store} = useContext(Context);
    const [clickedCart, setClickedCart] = useState(false);
    const [clickedHeart, setClickedHeart] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
        if (!newValue) await deleteFromWishlist(device.id);
    }
    const handleDelete = async (e) => {
        e.stopPropagation();
        if (isDeleting) return; // Prevent multiple clicks

        setIsDeleting(true); // Disable further clicks
        try {
            await deleteDeviceById(device.id);
            store.setDevices([...store.devices.filter(d => d.id !== device.id)]); // update store
        } catch (error) {
            console.error("Failed to delete device:", error);
        } finally {
            setIsDeleting(false); // Re-enable button after request
        }
    };
    useEffect(() => {
        const isInWishlist = wishlist.devices.some(d => d.device.id === device.id);
        setClickedHeart(isInWishlist);
    }, [wishlist.devices, device.id]);
    useEffect(() => {
        const isInBasket = basket?.basket?.devices?.some(d => d.device.id === device.id);
        setClickedCart(isInBasket);
    }, [basket.basket.devices]);
    return (
            <Col md={4}  lg={3} className='mt-3 d-flex justify-content-center' onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}>
                <Card style={{width: "75%", minWidth: 150, display: 'flex', cursor: 'pointer'}} border='light'>
                    <div className="d-flex w-100 justify-content-center">
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
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='text-black-50'>{device.brandName ? device.brandName : 'Loading...'}</div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>{device.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                    </div>
                    <div>{device.name}</div>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="start" style={{color: "green"}}>${device.price / 100}</div>
                        {user.isAuth && <div className="d-flex gap-2">
                            {user.isAdmin &&
                                <Image  width={20}
                                        height={20}
                                        style={{ cursor: isDeleting ? "not-allowed" : "pointer", opacity: isDeleting ? 0.5 : 1 }}
                                        src={deleteIcon}
                                        onClick={handleDelete}
                                />
                            }
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
                        </div>}
                    </div>
                </Card>
            </Col>
    );
});

export default DeviceItem;