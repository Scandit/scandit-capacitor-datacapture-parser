import { ParserIssueAdditionalInfoKey } from './ParserIssueAdditionalInfoKey';
import { ParserIssueCode } from './ParserIssueCode';
export interface ParserIssueJSON {
    code: ParserIssueCode;
    message: string;
    additionalInfo: Record<ParserIssueAdditionalInfoKey, string>;
}
export interface PrivateParserIssue {
    fromJSON(json: ParserIssueJSON): ParserIssue;
}
export declare class ParserIssue {
    private _code;
    get code(): ParserIssueCode;
    private _message;
    get message(): string;
    private _additionalInfo;
    get additionalInfo(): Record<ParserIssueAdditionalInfoKey, string>;
    private static fromJSON;
}
