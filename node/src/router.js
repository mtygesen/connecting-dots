import { FileResponse, JSONResponse, ErrorResponse } from './server.js';
import LoadModel from './load_model.js';
import EvaluateModel from './evaluate_model.js';
import mnist from 'easy-mnist';

/**
 * Routes a request
 *
 * @param req Request object
 * @param res Response object
 * 
 * @returns void 
 */
export default async function RouteRequest(req, res) {
    console.log(`${req.method}: ${req.url}`);

    const baseURL = `http:\\${req.headers.host}/`; // See https://github.com/nodejs/node/issues/12682
    const url = new URL(req.url, baseURL);
    const queryPath = decodeURIComponent(url.pathname); // Convert uri encoded special letters (eg. æøå) to JS string

    const pathElements = queryPath.split('/');

    switch (req.method) {
        case 'GET':
            switch (pathElements[1]) {
                case '':
                    FileResponse(res, '/html/index.html');
                    break;
                case 'get-model':
                    try {
                        JSONResponse(res, await LoadModel(pathElements[2])); // Get model object
                    }
                    catch {
                        ErrorResponse(res, 404, 'Model not found');
                    }
                    break;
                case 'get-prediction':
                    // return prediction and the image data for a random number in the mnist dataset corresponding to the number in pathElements[3]
                    let number = mnist(pathElements[3]).get()
                    let object = {
                        array: number,
                        prediction: EvaluateModel(pathElements[2], number)
                    }
                    JSONResponse(res, object);
                    break;
                default:
                    FileResponse(res, req.url);
                    break;
            }
            break;
        case 'POST':
            switch (pathElements[1]) {
                case 'get-prediction':
                    try {
                        JSONResponse(res, await EvaluateModel(pathElements[2], res.body)); // Get prediction object
                    }
                    catch {
                        ErrorResponse(res, 404, 'Model not found')
                    }
                    break;
                default:
                    ErrorResponse(res, 404, 'Invalid URL');
                    break;
            }
        default:
            ErrorResponse(res, 405, 'Method not allowed');
            break;
    }

    return;
}