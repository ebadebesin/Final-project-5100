const BASE_URL = "http://localhost:8080/api";

export default class ApiClient {
    endpoint;
    url;

    constructor(endpoint = "") {
        this.endpoint = endpoint;
        this.url = BASE_URL + endpoint;
    }

    postFnw = async (data) => {
        const response = await fetch(this.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    };

    postFn = ({ path = "" }) => {
        return async (data) => {
            path = path || "";
            params = params || {};
            let paramsString = new URLSearchParams(params);
            if (paramsString.size > 0) {
                paramsString = "?" + paramsString;
            }
            let url = this.url + path + paramsString;
            const response = await fetch(this.url, {
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
        return async (data) => {
            console.log(" here ");
            console.log(data);
            path = path || "";
            params = params || {};
            let paramsString = new URLSearchParams(params);
            if (paramsString) {
                paramsString = "?" + paramsString;
            }
            let url = this.url + path + paramsString;
            const response = await fetch(url);
            return await response.json();
        };
    };
}
