import {$authHost, $host} from "./index";
import {$makeAuthPost} from "../utils/makeAuthPost";

export const fetchTypes = async () => {
    const {data} = await $host.get("api/type");
    return data;
}

export const fetchBrands = async () => {
    const {data} = await $host.get("api/brand");
    return data;
}

export const fetchDevices = async (searchQuery, brands, typeId, minPrice, maxPrice, limit, page) => {
    const {data} = await $host.get("api/device", {params: {
        searchQuery, brands, typeId, minPrice, maxPrice, limit, page
        }});
    return data;
}

export const fetchDeviceById = async (id) => {
    const {data} = await $host.get(`api/device/${id}`);
    return data;
}

export const deleteDeviceById = async (id) => {
    const {data} = await $authHost()
}

export const createType = async (type) => {
    const {data} = await $makeAuthPost("api/type", {name: type});
    return data;
}

export const createBrand = async (brand) => {
    const {data} = await $makeAuthPost("api/brand", {name: brand});
    return data;
}

export const createDevice = async (device) => {
    const {data} = await $makeAuthPost("api/device", device);
    return data;
}