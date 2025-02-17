import React, {useContext, useEffect} from 'react';
import { useState } from "react";
import "./priceRangeSelector.css";
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import {fetchDevices} from "../../http/deviceAPI";

function PriceRangeSelector() {
    const {store} = useContext(Context);
    const initialMinPrice = store.selectedMinPrice;
    const initialMaxPrice = store.selectedMaxPrice;

    const [sliderMinValue] = useState(initialMinPrice);
    const [sliderMaxValue] = useState(initialMaxPrice);

    const [minInput, setMinInput] = useState(initialMinPrice);
    const [maxInput, setMaxInput] = useState(initialMaxPrice);

    const [isDragging, setIsDragging] = useState(false);

    const minGap = 5;

    const slideMin = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= sliderMinValue && store.selectedMaxPrice - value >= minGap) {
            store.setSelectedMinPrice(value);
            setMinInput(value);
        }
    };

    const slideMax = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value <= sliderMaxValue && value - store.selectedMinPrice >= minGap) {
            store.setSelectedMaxPrice(value);
            setMaxInput(value);
        }
    };

    const setSliderTrack = () => {
        const range = document.querySelector(".slider-track");

        if (range) {
            const minPercent =
                ((store.selectedMinPrice - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
            const maxPercent =
                ((store.selectedMaxPrice - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

            range.style.left = `${minPercent}%`;
            range.style.right = `${100 - maxPercent}%`;
        }
    };

    const handleMinInput = (e) => {
        const value =
            e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
        if (value >= sliderMinValue && value < store.selectedMaxPrice - minGap) {
            setMinInput(value);
            store.setSelectedMinPrice(value);
        }
    };

    const handleMaxInput = (e) => {
        const value =
            e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
        if (value <= sliderMaxValue && value > store.selectedMinPrice + minGap) {
            setMaxInput(value);
            store.setSelectedMaxPrice(value);
        }
    };

    const handleInputKeyDown = (e, type) => {
        if (e.key === "Enter") {
            const value = parseInt(e.target.value, 10);
            if (
                type === "min" &&
                value >= sliderMinValue &&
                value < store.selectedMaxPrice - minGap
            ) {
                store.setSelectedMinPrice(value);
            } else if (
                type === "max" &&
                value <= sliderMaxValue &&
                value > store.selectedMinPrice + minGap
            ) {
                store.setSelectedMaxPrice(value);
            }
        }
    };

    useEffect(() => {
        setSliderTrack();
    }, [store.selectedMinPrice, store.selectedMaxPrice]);

    const startDrag = () => {
        setIsDragging(true);
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    const onSort = () => {
        fetchDevices(
            store.searchQuery,
            store?.selectedBrand?.id,
            store?.selectedType?.id,
            store.selectedMinPrice * 100,
            store.selectedMaxPrice * 100,
            store.limit,
            store.selectedPage
        )
            .then(data => {
                store.setDevices(data.rows);
                store.setTotalCount(data.count);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="d-flex" style={{maxWidth: 310}}>
            <div className="double-slider-box">
                <div className="input-box">
                    <div className="min-box">
                        <input
                            type="number"
                            value={minInput}
                            onChange={handleMinInput}
                            onKeyDown={(e) => handleInputKeyDown(e, "min")}
                            className="min-input"
                            min={sliderMinValue}
                            max={store.selectedMaxPrice - minGap}
                        />
                    </div>
                    <div className='d-flex align-items-center justify-content-center fw-bold'>-</div>
                    <div className="max-box">
                        <input
                            type="number"
                            value={maxInput}
                            onChange={handleMaxInput}
                            onKeyDown={(e) => handleInputKeyDown(e, "max")}
                            className="max-input"
                            min={store.selectedMinPrice  + minGap}
                            max={sliderMaxValue}
                        />
                    </div>
                </div>
                <div className="range-slider">
                    <div className="slider-track"></div>
                    <input
                        type="range"
                        min={sliderMinValue}
                        max={sliderMaxValue}
                        value={store.selectedMinPrice }
                        onChange={slideMin}
                        onMouseDown={startDrag}
                        onMouseUp={stopDrag}
                        onTouchStart={startDrag}
                        onTouchEnd={stopDrag}
                        className="min-val"
                    />
                    <input
                        type="range"
                        min={sliderMinValue}
                        max={sliderMaxValue}
                        value={store.selectedMaxPrice }
                        onChange={slideMax}
                        onMouseDown={startDrag}
                        onMouseUp={stopDrag}
                        onTouchStart={startDrag}
                        onTouchEnd={stopDrag}
                        className="max-val"
                    />
                    {isDragging && <div className="min-tooltip">{store.selectedMinPrice }</div>}
                    {isDragging && <div className="max-tooltip">{store.selectedMaxPrice }</div>}
                </div>
            </div>
            <Button style={{maxHeight: 40, marginTop: 22.5, marginRight: 20}} variant={"outline-dark"} onClick={onSort}>OK</Button>
        </div>
    );
}

export default PriceRangeSelector;
