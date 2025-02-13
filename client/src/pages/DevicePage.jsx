import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import star from '../assets/big_star.png';
import {useParams} from "react-router-dom";
import {fetchDeviceById} from "../http/deviceAPI";
import {addToBasket} from "../http/basketAPI";
import {Context} from "../index";
import {fetchReviews} from "../http/reviewAPI";
import ReviewList from "../components/Review/ReviewList";
import ReviewForm from "../components/Review/ReviewForm";
import {observer} from "mobx-react-lite";
import {useObserver} from "../http/useObserver";

const DevicePage = observer(() => {
    const {id} = useParams();
    const [device, setDevice] = useState({info: []});
    const {user} = useContext(Context);
    const {review} = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const lastElement = useRef();

    useObserver(lastElement, page < totalPages, isLoading, () => setPage(page + 1));

    useEffect(() => {
        review.setReviews([]);
        fetchDeviceById(id).then(data => {
            setDevice(data);
        });
    }, [id]);
    useEffect(() => {
        setIsLoading(true);
        fetchReviews(id, page, limit).then(data => {
            review.setReviews([...review.reviews, ...data.rows]);
            setTotalPages(data.count / limit);
            review.checkExists(user.user.id);
            setIsLoading(false);
        })
    }, [page, limit]);

    const onAdd = () => {
        addToBasket(device.id)
            .then(data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e);
            })
    }
    return (

        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center justify-content-center'>
                        <h2 className='text-center'>{device.name}</h2>
                        <div className='d-flex align-items-center justify-content-center'
                             style={{background: `url(${star}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 54}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column justify-content-around align-items-center'
                        style={{width: 300, height: 300, fontSize: 32, border: '2px solid light-grey'}}
                    >
                        <h3>From {device.price}</h3>
                        <Button onClick={onAdd} variant='outline-dark'>Add to cart</Button>
                    </Card>
                </Col>
            </Row>
            <h2 className='mt-3'>Description: </h2>
            <Row className='d-flex flex-column m-3'>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent"}}>
                        {info.title}: {info.description}
                    </Row>)}
            </Row>

            <Container>
                {(!review.exists && user.isAuth) && <ReviewForm deviceId={id} userId={user.user.id}/>}
                <ReviewList/>
                {isLoading && <div className='w-100 d-flex justify-content-center align-items-center'>
                    <Spinner animation={'grow'}/>
                </div>}
                <div ref={lastElement} style={{height: 20, display: "block"}}></div>
            </Container>
        </Container>
    );
});

export default DevicePage;