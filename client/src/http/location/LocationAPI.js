import axios from "axios";

const $host = axios.create({baseURL: "https://countriesnow.space/api/v0.1"})

export const fetchCountries = async () => {
    const {data} = await $host.get("/countries");
    return data.data;
}

export const fetchCitiesByCountry = async (country) => {
    const {data} = await $host.post("/countries/cities", {country: country.toLowerCase()});
    return data.data;
}