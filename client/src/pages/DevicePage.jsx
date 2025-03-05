import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchDeviceById } from "../http/deviceAPI";
import { addToBasket } from "../http/basketAPI";
import { Context } from "../index";
import { fetchReviews } from "../http/reviewAPI";
import ReviewList from "../components/Review/ReviewList";
import ReviewForm from "../components/Review/ReviewForm";
import { observer } from "mobx-react-lite";
import { useObserver } from "../http/useObserver";
import MyStarFill from "../components/MyStarFill";

const DevicePage = observer(() => {
    const { id } = useParams();
    const [device, setDevice] = useState({ info: [] });
    const { user } = useContext(Context);
    const { review } = useContext(Context);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

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
        });
    }, [page, limit]);

    const onAdd = () => {
        addToBasket(device.id)
            .then(data => console.log(data))
            .catch(e => console.log(e));
    };

    return (
        <Container className='mt-3'>
            <Row className="d-flex justify-content-center">
                <Col xs={11} sm={6} md={5} lg={5} className="d-flex justify-content-center mb-3 align-items-center">
                    <Image
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            maxHeight: 500,
                            maxWidth: '100%',
                        }}
                        src={process.env.REACT_APP_API_URL + device.img}
                    />
                </Col>

                <Col xs={11} sm={6} md={5} lg={5} className="d-flex justify-content-center mb-3">
                    <Card
                        className='d-flex flex-column justify-content-between align-items-center p-4 shadow-sm'
                        style={{
                            width: '100%',
                            height: 'auto',
                            fontSize: isSmallScreen ? 18 : 32,
                            borderRadius: '10px',
                            border: '1px solid #ddd',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <div className="text-center">
                            <h3 className="fw-medium fs-1">{device.name}</h3>
                            <div className="mb-2">
                                <MyStarFill rating={device.rating} />
                            </div>
                            <ul className="list-unstyled text-start p-2">
                                {device.info.filter(info => ['Display', 'Storage', 'RAM', 'CPU', 'Battery'].includes(info.title)).map(info => (
                                    <li key={info.id} className="mb-1 fs-4"><span className="fw-semibold">{info.title}:</span> {info.description}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="d-flex align-items-center flex-column mt-3">
                            <h2 className="fw-semibold text-success" style={{ fontSize: isSmallScreen ? '18px' : '32px' }}>
                                ${device.price / 100}
                            </h2>
                            <Button className="fs-4" onClick={onAdd} variant='dark'>Add to cart</Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card className="p-4 shadow-sm mt-4" style={{ borderRadius: '10px' }}>
                <Row className='d-flex flex-column'>
                    {device.info.map((info, index) => (
                        <Row key={info.id} className="py-2 px-3 m-0" style={{ background: index % 2 === 0 ? '#f8f9fa' : 'white', borderRadius: '5px' }}>
                            <span className="fw-semibold">{info.title}:</span> {info.description}
                        </Row>
                    ))}
                </Row>
            </Card>

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
