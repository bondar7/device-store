import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BasketList from "../components/Basket/BasketList";
import BasketSummary from "../components/Basket/BasketSummary";
import {getBasket} from "../http/basketAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Basket = observer(() => {
    const {basket} = useContext(Context);

    // State to track if it's a column layout
    const [isColumnLayout, setIsColumnLayout] = useState(false);

    useEffect(() => {
        const updateLayout = () => {
            // Update layout state based on window width
            setIsColumnLayout(window.innerWidth <= 767);
        };

        // Check layout on initial render and window resize
        updateLayout();
        window.addEventListener('resize', updateLayout);

        return () => {
            window.removeEventListener('resize', updateLayout);
        };
    }, []);

    useEffect(() => {
        getBasket()
            .then(data => {
                basket.setBasket(data);
                console.log(basket.basket);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ background: "#dad9de", minHeight: `calc(100vh - ${53.2}px)`, minWidth: "100vw", padding: "10% 5%"}}
        >
            <Container style={{maxWidth: 1100}}>
                <Row>
                    <BasketList isColumnLayout={isColumnLayout}/>
                    <BasketSummary isColumnLayout={isColumnLayout}/>
                </Row>
            </Container>
        </Container>
    );
});

export default Basket;