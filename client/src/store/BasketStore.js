import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basket = {};
        this._total = 0;
        this._totalQuantity = 0;
        makeAutoObservable(this);
    }
    setBasket(basket) {
        this._basket = basket;
        this.calculateTotal();
        this.calculateTotalQuantity();
    }
    setQuantity(deviceId, newQuantity) {
        const device = this._basket?.devices?.find(d => d.device.id === deviceId);
        if (device) {
            device.quantity = newQuantity;
            this.calculateTotal();
            this.calculateTotalQuantity();
        }
    }
    deleteDevice(deviceId) {
       this._basket.devices = this._basket.devices.filter(item => item.id !== deviceId);
    }

    get basket() {
        return this._basket;
    }
    get total() {
        return this._total;
    }
    get totalQuantity() {
        return this._totalQuantity;
    }

    calculateTotal() {
        this._total = this._basket?.devices?.reduce((sum, item) => sum + item.device.price * item.quantity, 0);
    }
    calculateTotalQuantity() {
        this._totalQuantity = this._basket?.devices?.reduce((sum, item) => sum + item.quantity, 0);
    }
}