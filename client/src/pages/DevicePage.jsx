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
import {StarFill} from "react-bootstrap-icons";
import MyStarFill from "../components/MyStarFill";

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
    const infoString = device.info
        .map(info => `${info.title}: ${info.description}`)
        .join(' / ');

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
            <Row className="d-flex justify-content-center">
                {/* Image Column */}
                <Col xs={8} sm={6} md={5} lg={5} className="d-flex justify-content-center mb-3">
                    <Image
                        style={{
                            width: '100%', // Ensure it fills its container
                            height: 'auto',
                            objectFit: 'contain',
                            maxHeight: 500,
                            maxWidth: '100%',
                        }}
                        src={process.env.REACT_APP_API_URL + device.img}
                    />
                </Col>

                {/* Card Column */}
                <Col xs={8} sm={6} md={5} lg={5} className="d-flex justify-content-center mb-3">
                    <Card
                        className='d-flex flex-column justify-content-between align-items-center p-4'
                        style={{
                            width: '100%', // Ensure Card takes full width of its container
                            height: 'auto', // Allow height to adjust based on content
                            fontSize: 32,
                            border: '2px solid light-grey'
                        }}
                    >
                        <div className="d-flex flex-column align-items-center">
                            <div>{device.name}</div>
                            <div className="mb-2">
                                <MyStarFill rating={device.rating}/>
                            </div>
                            <div className="fs-5">{infoString}</div>
                        </div>

                        <div className="d-flex align-items-center flex-column">
                        <h2 className="f-3" style={{color: 'green'}}>${device.price / 100}</h2>
                            <Button className="fs-4" onClick={onAdd} variant='outline-dark'>Add to cart</Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <h2 className='mt-3'>Description: </h2>
            <Row className='d-flex flex-column m-3'>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent' }}>
                        {info.title}: {info.description}
                    </Row>)}
            </Row>

            <Container>
                {(!review.exists && user.isAuth) && <ReviewForm deviceId={id} userId={user.user.id} />}
                <ReviewList />
                {isLoading && <div className='w-100 d-flex justify-content-center align-items-center'>
                    <Spinner animation={'grow'} />
                </div>}
                <div ref={lastElement} style={{ height: 20, display: 'block' }}></div>
            </Container>
        </Container>

    );
});

export default DevicePage;