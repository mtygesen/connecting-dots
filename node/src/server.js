import http from 'http';
import fs from "fs";
import path  from "path";
import process from "process";

import RouteRequest from "./router.js";
import GuessType from "./guess_type.js";

/**
 * Secures the path to prevent directory traversal attacks
 * 
 * @param userPath Path to secure
 * @param publicFolder Public folder
 * @returns Secured path or undefined if null byte found
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
 * @param res Response object 
 * @param fileName The name of the file to send
 * 
 * @returns void
 */
function FileResponse(res, fileName) {
    const securePath = SecurePath(fileName);

    console.log(`Reading: ${securePath}`);

    fs.readFile(securePath, (err, data) => {
        if (err) {
            console.error(err);
            ErrorResponse(res, 404, String(err));
        }
        else {
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
 * @param res Response object 
 * @param obj Object to send
 * 
 * @returns void
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
 * @param res Response object
 * @param code Error code
 * @param reason Reason for error
 * 
 * @returns void
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
 * @param req Request object 
 * @param res Response object
 * 
 * @returns promise that resolves when the request is handled
 */
async function RequestHandler(req, res) {
    try {
        await RouteRequest(req, res);
    }
    catch(err) {
        console.log(`Internal Error: ${err}`);
        ErrorResponse(res, 500, 'Internal Error');
    }

    return;
}

/**
 * Start the server
 * 
 * @param port Port to listen on 
 * @param hostname Hostname of the server
 * 
 * @returns void
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
 * @param contentType of the request
 * 
 * @returns true if the content type is JSON
 */
function IsJsonEncoded(contentType){
    let cType = contentType.split(";")[0];
    cType = contentType.trim();

    return (cType === "application/json"); 
}

/**
 * Collects the body of a POST request
 * 
 * @param req object
 *  
 * @returns promise that resolves to the body of the request
 */
function CollectPostBody(req) {
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
    }

    return new Promise(CollectPostBodyExecutor);
}

/**
 * Extracts JSON from a request
 * 
 * @param request object 
 * 
 * @returns promise that resolves to a JSON object
 */
async function ExtractJSON(req) {
    if (IsJsonEncoded(req.headers['content-type'])) {
        const body = await CollectPostBody(req);

        return JSON.parse(body);
    }
    
    return Promise.reject(new Error('Validation error')); //create a rejected promise
}

const server = http.createServer(RequestHandler);

const port = 3040;
const hostname = 'localhost';

StartServer(port, hostname);

export { SecurePath, FileResponse, JSONResponse,  ErrorResponse, ExtractJSON };