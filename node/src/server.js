import http from 'http';
import fs from "fs";
import path  from "path";
import process from "process";

import { RouteRequest } from "./router.js";

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
            res.setHeader('Content-Type', GuessType(fileName));
            res.write(data);
            res.end('\n');
        }
    });

    return;
}

/**
 * Guesses the type of a file based on its extension
 * 
 * @param fileName The name of the file to guess the type of
 * @returns The type of the file
 */
function GuessType(fileName) {
    const fileExtension = fileName.split('.')[1].toLowerCase();

    const ext2Mime = {
        'txt': 'text/txt',
        'html': 'text/html',
        'ico': 'image/ico', // CHECK x-icon vs image/vnd.microsoft.icon
        'js': 'text/javascript',
        'json': 'application/json', 
        'css': 'text/css',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'wav': 'audio/wav',
        'mp3': 'audio/mpeg',
        'svg': 'image/svg+xml',
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/msword'
    };
    
    return (ext2Mime[fileExtension] || 'text/plain'); // default is text/plain
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
    res.setHeader('Content-Type', 'text/txt');
    res.write(`Error ${code}: ${reason}`);
    res.end("\n");

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
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(obj));
    res.end('\n');

    return;
}
  
/**
 * Handles a request
 * 
 * @param req Request object 
 * @param res Response object
 * 
 * @returns void
 */
function RequestHandler(req, res) {
    try {
        RouteRequest(req, res);
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

const server = http.createServer(RequestHandler);

const port = 3000;
const hostname = 'localhost';
StartServer(port, hostname);

export { StartServer, FileResponse, JSONResponse, ErrorResponse };