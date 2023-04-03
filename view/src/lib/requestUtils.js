import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const requestOptions = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': '*',
    },
};

export const get = async (uri) => {
    try {
        return await axios.get(
            BASE_URL + uri,
            requestOptions
        );
    } catch (err) {
        console.error(err);
    }
};

export const getWithHeaders = async (uri, headers) => {
    try {
        return await axios({
            url: BASE_URL + uri,
            method: 'get',
            headers: headers
        });
    } catch (err) {
        console.error(err);
    }
};

export const post = async (uri, body, headers) => {
    if (headers) {
        return postWithHeaders(uri, body, headers);
    }
    else {
        return postWithoutHeaders(uri, body);
    }
};

const postWithoutHeaders = async (uri, body) => {
    try {
        return await axios({
            url: BASE_URL + uri,
            method: 'post',
            data: body
        });
    } catch (err) {
        console.error(err);
    }
}

const postWithHeaders = async (uri, body, headers) => {
    try {
        return await axios({
            url: BASE_URL + uri,
            method: 'post',
            data: body,
            headers: headers
        });
    } catch (err) {
        console.error(err);
    }
}

export const patch = async (uri, body, headers) => {
    if (headers) {
        return patchWithHeaders(uri, body, headers);
    }
    else {
        return patchWithoutHeaders(uri, body);
    }
};

const patchWithoutHeaders = async (uri, body) => {
    try {
        return await axios({
            url: BASE_URL + uri,
            method: 'patch',
            data: body
        });
    } catch (err) {
        console.error(err);
    }
}

const patchWithHeaders = async (uri, body, headers) => {
    try {
        return await axios({
            url: BASE_URL + uri,
            method: 'patch',
            data: body,
            headers: headers
        });
    } catch (err) {
        console.error(err);
    }
}




