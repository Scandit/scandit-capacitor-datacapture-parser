import { ParsedField, ParsedFieldJSON } from './ParsedField';
type ParsedDataJSON = [ParsedFieldJSON];
export interface PrivateParsedData {
    fromJSON(json: ParsedDataJSON): ParsedData;
}
export declare class ParsedData {
    private _jsonString;
    get jsonString(): string;
    private _fields;
    get fields(): ParsedField[];
    private _fieldsByName;
    get fieldsByName(): {
        [key: string]: ParsedField;
    };
    private static fromJSON;
}
export {};
