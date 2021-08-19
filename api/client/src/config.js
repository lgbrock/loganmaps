import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'https://loganmaps.herokuapp.com/api/',
});
