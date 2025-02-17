import {$makeAuthGet} from "../utils/makeAuthGet";
import {$makeAuthPost} from "../utils/makeAuthPost";
import {$makeAuthRemove} from "../utils/makeAuthDelete";

export const fetchWishlist = async () => {
    return await $makeAuthGet("api/wishlist");
}
export const addToWishlist = async (deviceId) => {
    return await $makeAuthPost("api/wishlist/add", {deviceId});
}
export const deleteFromWishlist = async (deviceId) => {
    return await $makeAuthRemove(`api/wishlist/delete/${deviceId}`);
}