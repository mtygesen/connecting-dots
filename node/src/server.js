import http from 'http';
import fs from 'fs';
import path from 'path';
import process from 'process';
import mnist from 'easy-mnist';

import RouteRequest from './router.js';
import GuessType from './guess_type.js';

/**
 * Secures the path to prevent directory traversal attacks
 *
 * @param {string} userPath Path to secure
 * @param {string} publicFolder Public folder
 * @return {string} Secured path or undefined if null byte found
 */
function SecurePath(userPath) {
    if (userPath.indexOf('\0') !== -1) return undefined; // Return undefined if null byte found

    const publicFolder = '../public'; // Public folder
    const rootPath = process.cwd(); // Root path

    userPath = path.normalize(userPath).replace(/^(\.\.(\/|\\|$))+/, ''); // Remove double backslashes and dots
    userPath = publicFolder + userPath; // Concatenate with public folder

    return path.join(rootPath, path.normalize(userPath)); // Return path
}

/**
 * Sends a file to the client
 *
 * @param {object} res Response object
 * @param {string} fileName The name of the file to send
 *
 * @return {void} void
 */
function FileResponse(res, fileName) {
    const securePath = SecurePath(fileName);

    console.log(`Reading: ${securePath}`);

    fs.readFile(securePath, (err, data) => {
        if (err) {
            console.error(err);
            ErrorResponse(res, 404, String(err));
        } else {
            res.statusCode = 200;
            res.setHeader('content-type', GuessType(fileName));
            res.write(data);
            res.end('\n');
        }
    });

    return;
}

/**
 * Responds with a JSON object
 *
 * @param {object} res Response object
 * @param {object} obj Object to send
 *
 * @return {void} void
 */
function JSONResponse(res, obj) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(obj));
    res.end('\n');

    return;
}

/**
 * Responds with an error message
 *
 * @param {object} res Response object
 * @param {number} code Error code
 * @param {string} reason Reason for error
 *
 * @return {void} void
 */
function ErrorResponse(res, code, reason) {
    res.statusCode = code;
    res.setHeader('content-type', 'text/txt');
    res.write(`Error ${code}: ${reason}`);
    res.end('\n');

    return;
}

/**
 * Handles a request
 *
 * @param {object} req Request object
 * @param {object} res Response object
 *
 * @return {promise} promise that resolves when the request is handled
 */
async function RequestHandler(req, res) {
    try {
        await RouteRequest(req, res);
    } catch (err) {
        console.log(`Internal Error: ${err}`);
        ErrorResponse(res, 500, 'Internal Error');
    }

    return;
}

/**
 * Start the server
 *
 * @param {number} port Port to listen on
 * @param {string} hostname Hostname of the server
 *
 * @return {void} void
 */
function StartServer(port, hostname) {
    server.listen(port, hostname, () => {
        console.log(`Server running at http:\\${hostname}:${port}/`);
    });

    return;
}

/**
 * Checks if the content type is JSON
 *
 * @param {string} contentType of the request
 *
 * @return {boolean} true if the content type is JSON
 */
function IsJsonEncoded(contentType) {
    let cType = contentType.split(';')[0];
    cType = contentType.trim();

    return (cType === 'application/json');
}

/**
 * Collects the body of a POST request
 *
 * @param {object} req object
 *
 * @return {promise} promise that resolves to the body of the request
 */
function CollectPostBody(req) {
    /**
     * Executor for the CollectPostBody promise
     *
     * @param {*} resolve
     * @param {*} reject
     *
     * @return {void} void
     */
    function CollectPostBodyExecutor(resolve, reject) {
        let bodyData = [];
        let length = 0;
        req.on('data', (chunk) => {
            bodyData.push(chunk);
            length += chunk.length;

            if (length > 10000000) { // 10 MB limit!
                req.connection.destroy();
                reject(new Error('Too much data'));
            }
        }).on('end', () => {
            bodyData = Buffer.concat(bodyData).toString(); // By default, Buffers use UTF8
            resolve(bodyData);
        });

        return;
    }

    return new Promise(CollectPostBodyExecutor);
}

/**
 * Extracts JSON from a request
 *
 * @param {object} req object
 *
 * @return {promise} promise that resolves to a JSON object
 */
async function ExtractJSON(req) {
    if (IsJsonEncoded(req.headers['content-type'])) {
        const body = await CollectPostBody(req);

        return JSON.parse(body);
    }

    return Promise.reject(new Error('Validation error')); // create a rejected promise
}

/**
 * Finds a random picture from the dataset corresponding to the input integer
 *
 * @param {number} number an integer between 0 and 9
 *
 * @return {array} an array of 784 integers corresponding to the pixels in a random picture corresponding the the input integer
 */
function FindPicture(number) {
    const dataset = mnist.makeData(0, 10000).testdata;
    let i = 0;

    do {
        i = Math.floor(Math.random() * 10000);
    }
    while (dataset[i].label[number] !== 1);

    return dataset[i].image;
}

const server = http.createServer(RequestHandler);

const port = 3040;
const hostname = 'localhost';

StartServer(port, hostname);

export { SecurePath, FileResponse, JSONResponse, ErrorResponse, ExtractJSON, FindPicture };
