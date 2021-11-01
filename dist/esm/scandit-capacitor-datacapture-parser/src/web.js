import { WebPlugin } from '@capacitor/core';
import { ParsedField, } from './ts/ParsedField';
import { Parser, } from './ts/Parser';
import { ParsedData, } from './ts/ParsedData';
import { ParserDataFormat, } from './ts/ParserDataFormat';
export class ScanditParserPlugin extends WebPlugin {
    constructor() {
        super({
            name: 'ScanditParserPlugin',
            platforms: ['android', 'ios'],
        });
    }
    async initialize() {
        const api = {
            Parser,
            ParsedData,
            ParserDataFormat,
            ParsedField,
        };
        return new Promise(resolve => resolve(api));
    }
}
const scanditParser = new ScanditParserPlugin();
export { scanditParser };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(scanditParser);
//# sourceMappingURL=web.js.map