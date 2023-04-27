import { GuessType } from './server.js';

test('Guess file extension', () => {
    // Test if we can guess different file extensions
    expect(GuessType('file.txt')).toBe('text/txt');
    expect(GuessType('file.html')).toBe('text/html');
    expect(GuessType('file.ico')).toBe('image/ico');
    expect(GuessType('file.js')).toBe('text/javascript');
    expect(GuessType('file.json')).toBe('application/json');
    expect(GuessType('file.css')).toBe('text/css');
    expect(GuessType('file.png')).toBe('image/png');
    expect(GuessType('file.jpg')).toBe('image/jpeg');
    expect(GuessType('file.wav')).toBe('audio/wav');
    expect(GuessType('file.mp3')).toBe('audio/mpeg');
    expect(GuessType('file.svg')).toBe('image/svg+xml');
    expect(GuessType('file.pdf')).toBe('application/pdf');
    expect(GuessType('file.doc')).toBe('application/msword');
    expect(GuessType('file.docx')).toBe('application/msword');
    expect(GuessType('file.jpijdija')).toBe('text/plain');
    expect(GuessType('file')).toBe('text/plain');
    expect(GuessType('file.hTML')).toBe('text/html');
});