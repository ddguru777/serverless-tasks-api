const ok = (body) => {
    return encode(200, body);
}

const badRequest = (body) => {
    return encode(400, body);
}

const serverError = (body) => {
    return encode(500, body);
}

const redirect = (url) => {
    return {
        headers: {
            Location: url
        },
        statusCode: 302,
        body: ''
    };
}

const unauthorized = (body) => {
    return encode(401, body || {});
}

const forbidden = (body) => {
    return encode(403, body || {});
}

const encode = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body)
    };
}

export {
    ok,
    badRequest,
    serverError,
    redirect,
    unauthorized,
    forbidden
}
