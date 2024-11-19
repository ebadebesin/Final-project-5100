const BASE_URL = "http://localhost:8080/api";
const DEV_URL = "/data";
import { useParams } from "react-router-dom";

export default class ApiClient {
    endpoint;
    url;
    isDev;
    constructor(endpoint = "") {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.isDev = urlParams.get("isDev") ? true : false;

        this.endpoint = endpoint;
        let prefix = BASE_URL;
        this.isDev && (prefix = DEV_URL);

        this.url = prefix + endpoint;
    }

    buidUrl = (path, params) => {
        path = path || "";
        params = params || {};

        let url = this.url + path;
        this.isDev && (url += ".json");

        let paramsString = new URLSearchParams(params);
        if (paramsString.size != 0) {
            url += "?" + paramsString;
        }

        return url;
    };

    postFn = ({ path = "", params = {} }) => {
        return async (data) => {
            const url = this.buidUrl(path, params);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        };
    };

    queryFn = ({ path = "", params = {} }) => {
        return async () => {
            const url = this.buidUrl(path, params);
            const response = await fetch(url);
            return await response.json();
        };
    };
}
