import { ParsedData } from '../ParsedData';
declare type Parser = any;
export declare class ParserProxy {
    private static capacitorExec;
    private parser;
    static forParser(parser: Parser): ParserProxy;
    parseString(data: string): Promise<ParsedData>;
    parseRawData(data: string): Promise<ParsedData>;
}
export {};
