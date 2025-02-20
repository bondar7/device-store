import { makeAutoObservable } from "mobx";

export default class CheckoutStore {
    constructor() {
        this._countries = [];
        this._cities = [];
        this._country = "Country";
        this._city = "City";
        this._street = "";
        this._selectedStore = null;
        this._delivery = "";
        this._deliveryFee = 0;
        this._courier = {
            street: "",
            house: "",
            apartment: "",
            toLift: null,
            floor: "",
            isLift: null
        };
        this._paymentMethod = null;
        this._cardDetails = {
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            focus: "",
        };
        makeAutoObservable(this);
    }

    setCountry(country) {
        this._country = country;
    }

    get country() {
        return this._country;
    }

    setCountries(countries) {
        this._countries = countries;
    }

    get countries() {
        return this._countries;
    }

    setCities(cities) {
        this._cities = cities;
    }

    get cities() {
        return this._cities;
    }

    setCity(city) {
        this._city = city;
    }

    get city() {
        return this._city;
    }

    setStreet(street) {
        this._street = street;
    }

    get street() {
        return this._street;
    }

    setSelectedStore(store) {
        this._selectedStore = store;
    }

    get selectedStore() {
        return this._selectedStore;
    }

    setDelivery(delivery) {
        this._delivery = delivery;
    }

    get delivery() {
        return this._delivery;
    }

    setDeliveryFee(deliveryFee) {
        this._deliveryFee = deliveryFee;
    }

    get deliveryFee() {
        return this._deliveryFee;
    }

    setHouse(house) {
        this._courier.house = house;
    }

    get house() {
        return this._courier.house;
    }

    setCourierStreet(street) {
        this._courier.street = street;
    }
    get courierStreet() {
        return this._courier.street;
    }

    setApartment(apartment) {
        this._courier.apartment = apartment;
    }
    get apartment() {
       return  this._courier.apartment;
    }

    setFloor(floor) {
        this._courier.floor = floor;
    }
    get floor() {
        return  this._courier.floor;
    }

    setToLift(bool) {
        this._courier.toLift = bool;
    }
    get toLift() {
        return this._courier.toLift;
    }

    setIsLift(bool) {
        this._courier.isLift = bool;
    }
    get isLift() {
        return this._courier.isLift;
    }


    setCourier(courier) {
        this._courier = courier;
    }

    get courier() {
        return this._courier;
    }

    setPaymentMethod(method) {
        this._paymentMethod = method
    }

    get paymentMethod() {
        return this._paymentMethod;
    }

    setCardDetails(cardDetails) {
        this._cardDetails = cardDetails;
    }

    get cardDetails() {
        return this._cardDetails;
    }
}