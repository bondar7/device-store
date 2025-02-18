import {$makeAuthPost} from "../utils/makeAuthPost";
import {$makeAuthGet} from "../utils/makeAuthGet";
import {$makeAuthRemove} from "../utils/makeAuthDelete";

export const fetchBasket = async () => {
    return await $makeAuthGet("api/basket");
}

export const addToBasket = async (deviceId) => {
    return await $makeAuthPost("api/basket/add",{deviceId});
}

export const deleteFromBasket = async (deviceId) => {
    return await $makeAuthRemove(`api/basket/delete/${deviceId}`);
}

export const updateItemQuantity = async (quantity, deviceId) => {
    return await $makeAuthPost("api/basket/updateQuantity", {deviceId, quantity});
}