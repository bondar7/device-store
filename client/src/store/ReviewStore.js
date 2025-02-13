import {makeAutoObservable} from "mobx";

export default class ReviewStore {
    constructor() {
        this._reviews = [];
        this._exists = false;
        makeAutoObservable(this);
    }

    setReviews(reviews) {
        this._reviews = reviews;
    }
    setExists(value) {
        this._exists = value;
    }

    get reviews() {
        return this._reviews;
    }
    get exists() {
        return this._exists;
    }

    checkExists(userId) {
        return this.setExists(!!this._reviews?.find(review => review.userId === userId));
    }
}