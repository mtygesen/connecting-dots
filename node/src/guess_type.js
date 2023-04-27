/**
 * Guesses the type of a file based on its extension
 * 
 * @param fileName of the file to guess the type of
 * 
 * @returns type of the file
 */
export default function GuessType(fileName) {
    const fileNameArr = fileName.split('.');

    if (fileNameArr.length < 2) return 'text/plain';

    const fileExtension = fileNameArr[1].toLowerCase();

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