import { ParserIssue, ParserIssueJSON } from './ParserIssue';
export interface ParsedFieldJSON {
    name: string;
    parsed: any;
    rawString: string;
    warnings?: ParserIssueJSON[];
}
export interface PrivateParsedField {
    fromJSON(json: ParsedFieldJSON): ParsedField;
}
export declare class ParsedField {
    private _name;
    get name(): string;
    private _parsed;
    get parsed(): any;
    private _rawString;
    get rawString(): string;
    private _warnings;
    get warnings(): ParserIssue[];
    private static fromJSON;
}
