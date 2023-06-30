import { registerPlugin } from '@capacitor/core';
import { ParsedData, } from './ts/ParsedData';
import { ParsedField, } from './ts/ParsedField';
import { Parser, } from './ts/Parser';
import { ParserDataFormat, } from './ts/ParserDataFormat';
export * from './definitions';
export class ScanditParserPluginImplementation {
    // eslint-disable-next-line @typescript-eslint/require-await
    async initialize() {
        const api = {
            Parser,
            ParsedData,
            ParserDataFormat,
            ParsedField,
        };
        return api;
    }
}
registerPlugin('ScanditParserPlugin', {
    android: () => new ScanditParserPluginImplementation(),
    ios: () => new ScanditParserPluginImplementation(),
    web: () => new ScanditParserPluginImplementation(),
});
// tslint:disable-next-line:variable-name
export const ScanditParserPlugin = new ScanditParserPluginImplementation();
//# sourceMappingURL=web.js.map