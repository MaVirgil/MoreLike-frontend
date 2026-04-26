export async function apiRequest(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    let response;

    try {
        response = await fetch(url, options);
    } catch (error) {
        throw new Error(`Something went wrong, please try again later`);
    }

    //specific error messages
    if (response.status === 204) { // No Content
        return null;
    }

    if (response.status === 429) {
        throw new Error('Too many requests, please wait a while and try again later');
    }

    if (!response.ok) {
        throw new Error('Something went wrong, please try again later');
    }

    return response.json();
}