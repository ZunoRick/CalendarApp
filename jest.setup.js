// En caso de necesitar la implementación del FetchAPI
// import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { TextDecoder, TextEncoder } from 'util';

require('dotenv').config({
    path: '.env.test'
})

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ ...process.env })
}))

