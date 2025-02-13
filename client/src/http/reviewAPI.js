import {$authHost, $host} from "./index";
import {$makeAuthRemove} from "../utils/makeAuthDelete";
import {$makeAuthPost} from "../utils/makeAuthPost";

export const fetchReviews = async (deviceId, page, limit) => {
    const {data} = await $host.get('api/review', {params: {
            deviceId, page, limit
        }});
    return data;
}

export const deleteReview = async (reviewId) => {
    return await $makeAuthRemove(`api/review/${reviewId}`);
}

export const createReview = async (newReview) => {
    return await $makeAuthPost('api/review', newReview);
}

export const updateReview = async (reviewId, title, description, rating) => {
    const {data} = await $authHost.put(`api/review/${reviewId}`, {title, description, rating});
    return data;
}