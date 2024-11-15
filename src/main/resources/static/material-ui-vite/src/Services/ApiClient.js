const BASE_URL = "http://localhost:8080/api";

export default class ApiClient {
    endpoint;
    url;

    constructor(endpoint = "") {
        this.endpoint = endpoint;
        this.url = BASE_URL + endpoint;
    }

    getFn = async () => {
        const response = await fetch(this.url);
        return await response.json();
    };

    postFn = async (data) => {
        myHeaders.append("Content-Type", "application/json");
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
}
