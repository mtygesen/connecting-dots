import { FileResponse, JSONResponse, ErrorResponse, ExtractJSON, FindPicture } from './server.js';
import LoadModel from './load_model.js';
import EvaluateModel from './evaluate_model.js';

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
                    let image = FindPicture(pathElements[3])
                    let object = {
                        array: image,
                        prediction: EvaluateModel(pathElements[2], image)
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
                    const input = await ExtractJSON(req);
                    const obj = await EvaluateModel(pathElements[2], input);

                    try {
                        JSONResponse(res, obj); // Get prediction object
                    }
                    catch {
                        ErrorResponse(res, 404, 'Model not found');
                    }
                    break;
                default:
                    ErrorResponse(res, 404, 'Invalid URL');
                    break;
            }
            break;
        default:
            ErrorResponse(res, 405, 'Method not allowed');
            break;
    }

    return;
}