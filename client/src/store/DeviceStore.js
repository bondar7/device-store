import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._searchQuery = "";
        this._selectedType = null;
        this._selectedBrand = null;
        this._selectedMinPrice = 0;
        this._selectedMaxPrice = 100000;
        this._selectedPage = 1;
        this._totalCount = 0;
        this._limit = 9;
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices = devices;
    }
    setSearchQuery(query) {
        this._searchQuery = query;
    }
    setSelectedType(type) {
        this._selectedType = type;
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand;
    }
    setSelectedMinPrice(price) {
        this._selectedMinPrice = price;
    }
    setSelectedMaxPrice(price) {
        this._selectedMaxPrice = price;
    }
    setSelectedPage(page) {
        this._selectedPage = page;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }
    setLimit(limit) {
        this._limit = limit;
    }
    get searchQuery() {
        return this._searchQuery;
    }
    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get devices() {
        return this._devices;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get selectedMinPrice() {
        return this._selectedMinPrice;
    }
    get selectedMaxPrice() {
        return this._selectedMaxPrice;
    }
    get selectedPage() {
        return this._selectedPage;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }

}