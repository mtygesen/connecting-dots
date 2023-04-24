import { FileResponse, HTMLResponse, JSONResponse, ErrorResponse } from "./server.js";
import { LoadModel } from "./load_model.js";
import { EvaluateModel } from "./evaluate_model.js";

/**
 * Routes a request
 *
 * @param req Request object
 * @param res Response object
 * 
 * @returns void 
 */
async function RouteRequest(req, res) {
    console.log(`${req.method}: ${req.url}`);
  
    const baseURL = `http:\\${req.headers.host}/`; // See https://github.com/nodejs/node/issues/12682
    const url = new URL(req.url,baseURL);
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
                        JSONResponse(res, await LoadModel(pathElements[2]));
                    }
                    catch {
                        ErrorResponse(res, 404, 'Model not found');
                    }
            
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
                        const model = await EvaluateModel(pathElements[2], res.body)
                        JSONResponse(res, model);
                    }
                    catch {
                        ErrorResponse(res, 404, 'model not found')
                    }
                    break;
                default:
                    ErrorResponse(res, 405, 'Wrong URL');
                    break;
            }
        default:
            ErrorResponse(res, 405, 'Method not allowed');
            break;
    }

    return;
} 

export { RouteRequest };