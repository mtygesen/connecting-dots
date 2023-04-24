import { FileResponse, HTMLResponse, JSONResponse, ErrorResponse } from "./server.js";

function RouteRequest(req,res) {
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
                    // For later
                    break;
                case 'get-prediction':
                    // For later
                    break;
                default:
                    FileResponse(res, req.url);
                    break;
            }
            break;
        default:
            ErrorResponse(res, 405, 'Method not allowed');
            break;
    }

    return;
} 

export { RouteRequest };