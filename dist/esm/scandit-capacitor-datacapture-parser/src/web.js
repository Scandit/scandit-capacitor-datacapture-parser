import { registerPlugin } from '@capacitor/core';
import { ParsedData, } from './ts/ParsedData';
import { ParsedField, } from './ts/ParsedField';
import { Parser, } from './ts/Parser';
import { ParserDataFormat, } from './ts/ParserDataFormat';
export * from './definitions';
export class ScanditParserPluginImplementation {
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
registerPlugin('ScanditParserPlugin', {
    android: () => new ScanditParserPluginImplementation(),
    ios: () => new ScanditParserPluginImplementation(),
});
// tslint:disable-next-line:variable-name
export const ScanditParserPlugin = new ScanditParserPluginImplementation();
//# sourceMappingURL=web.js.map