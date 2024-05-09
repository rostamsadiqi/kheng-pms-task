// import { baseURL } from "./base_URL";
import axios from "axios";

const baseURL = "https://api-for-testing-gujp.onrender.com";
export const customAxios = axios.create({
	baseURL: baseURL,
});

customAxios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.set("Authorization", `Bearer ${token}`);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default customAxios;
