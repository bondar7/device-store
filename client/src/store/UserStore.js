import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._isAdmin = false;
        this._user = {};
        this._isAccessError = false;
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setIsAdmin(isAdmin) {
        this._isAdmin = isAdmin;
    }

    setIsAccessError(isError) {
        this._isAccessError = isError;
    }

    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    get isAccessError() {
        return this._isAccessError;
    }
}