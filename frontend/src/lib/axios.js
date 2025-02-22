import axios from "axios";

export const axiosInstance = axios.create({
    baseUrl : "https://refactored-space-funicular-xjr6j99x7vg2697g-5001.app.github.dev/api",
    withCredentials : true,
});