export { ParsedData, ParsedField, Parser, ParserDataFormat, ParserIssue, ParserIssueAdditionalInfoKey, ParserIssueCode } from './parser';

interface ScanditParserPluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}



declare class ScanditParserPluginImplementation implements ScanditParserPluginInterface {
    initialize(): Promise<any>;
}
declare const ScanditParserPlugin: ScanditParserPluginImplementation;

export { ScanditParserPlugin, ScanditParserPluginImplementation };
export type { ScanditParserPluginInterface };
