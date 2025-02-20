import React, {useContext, useEffect, useState} from 'react';
import {fetchCitiesByCountry, fetchCountries} from "../../http/location/LocationAPI";
import locationIcon from "../../assets/location.png"
import {Card, Dropdown, Form, Image} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const LocationCard = observer(() => {
    const {checkout} = useContext(Context);
    useEffect(() => {
        fetchCountries().then(data => {
            const countryList = data.map((item) => item.country);
            checkout.setCountries(countryList);
            console.log(countryList)
        }).catch(e => console.log(e));
    }, []);
    const onCountrySelect = (e) => {
        const country = e.target.innerText;
        checkout.setCountry(country);
        fetchCitiesByCountry(country).then(data => checkout.setCities(data)).catch(e => console.log(e));
    }
    const onCitySelect = (e) => {
        checkout.setCity(e.target.innerText);
    }
    return (
        <Card>
            <Card.Body>
                <div className="d-flex gap-4 align-items-center">
                    <Image width={24} height={24} src={locationIcon}/>
                    <div className="d-flex align-items-center gap-3">
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                {checkout.country}
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{maxHeight: 200, overflowY: 'auto'}}>
                                {checkout.countries.map(country => <Dropdown.Item onClick={onCountrySelect} key={country}>{country}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        {checkout.country !== "Country" && <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                {checkout.city}
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{maxHeight: 200, overflowY: 'auto'}}>
                                {checkout.cities.map(city => <Dropdown.Item onClick={onCitySelect} key={city}>{city}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>}
                    </div>
                    <div>
                        <Form.Control
                            value={checkout.street}
                            onChange={(e) => checkout.setStreet(e.target.value)}
                            placeholder={(checkout.country === "Country" || checkout.city === "City") ? "Select country and city" : "Street"}
                            readOnly={checkout.country === "Country" || checkout.city === "City"}
                        />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
});

export default LocationCard;