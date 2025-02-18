import {makeAutoObservable} from "mobx";

export default class WishlistStore {
    constructor() {
        this._devices = [];
        makeAutoObservable(this);
    }

    setDevices(devices) {
        this._devices = devices;
    }

    removeDevice(deviceId) {
        this._devices = this._devices.filter(d => d.device.id !== deviceId);
    }

    get devices() {
        return this._devices;
    }

}