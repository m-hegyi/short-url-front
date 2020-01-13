interface IFetchOptions {
    method: string;
    mode: string;
    headers: object;
    body?: string;
}

async function apiRequest(url: string, method: string, data = {}): Promise<any> {

    const options: IFetchOptions = {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": "asd"
        }
    };

    if (method !== "GET") {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options as RequestInit);

    return await response.json();
}

export default apiRequest;
