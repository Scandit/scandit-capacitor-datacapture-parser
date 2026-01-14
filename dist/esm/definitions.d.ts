export type Optional<T> = T | null;
export interface ScanditParserPluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}
export { ParsedData } from './ts/ParsedData';
export { ParsedField } from './ts/ParsedField';
export { Parser } from './ts/Parser';
export { ParserDataFormat } from './ts/ParserDataFormat';
export { ParserIssueCode } from './ts/ParserIssueCode';
export { ParserIssueAdditionalInfoKey } from './ts/ParserIssueAdditionalInfoKey';
export { ParserIssue } from './ts/ParserIssue';
