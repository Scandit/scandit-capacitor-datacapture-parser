import { NativeCallerProvider, DefaultSerializeable, DataCaptureComponent, BaseProxy } from 'scandit-capacitor-datacapture-core/dist/dts/core';

declare const PARSER_PROXY_TYPE_NAMES: readonly ["ParserProxy"];
type ParserProxyType = (typeof PARSER_PROXY_TYPE_NAMES)[number];
interface ParserNativeCallerProvider extends NativeCallerProvider<ParserProxyType> {
}

declare function registerParserProxies(provider: ParserNativeCallerProvider): void;

declare enum ParserIssueAdditionalInfoKey {
    StartingCharacters = "startingCharacters",
    Version = "version",
    MinimalVersion = "minimalVersion",
    ElementName = "elementName",
    String = "string",
    Length = "length",
    Charset = "charset"
}

declare enum ParserIssueCode {
    None = "none",
    Unspecified = "unspecified",
    MandatoryEpdMissing = "mandatoryEpdMissing",
    InvalidDate = "invalidDate",
    StringTooShort = "stringTooShort",
    WrongStartingCharacters = "wrongStartingCharacters",
    InvalidSeparationBetweenElements = "invalidSeparationBetweenElements",
    UnsupportedVersion = "unsupportedVersion",
    IncompleteCode = "incompleteCode",
    EmptyElementContent = "emptyElementContent",
    InvalidElementLength = "invalidElementLength",
    TooLongElement = "tooLongElement",
    NonEmptyElementContent = "nonEmptyElementContent",
    InvalidCharsetInElement = "invalidCharsetInElement",
    TooManyAltPmtFields = "tooManyAltPmtFields",
    CannotContainSpaces = "cannotContainSpaces"
}

declare class ParserIssue {
    private _code;
    get code(): ParserIssueCode;
    private _message;
    get message(): string;
    private _additionalInfo;
    get additionalInfo(): Record<ParserIssueAdditionalInfoKey, string>;
    private static fromJSON;
}

declare class ParsedField {
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

declare class ParsedData {
    private _jsonString;
    get jsonString(): string;
    private _fields;
    get fields(): ParsedField[];
    private _fieldsByName;
    get fieldsByName(): {
        [key: string]: ParsedField;
    };
    private _fieldsWithIssues;
    get fieldsWithIssues(): ParsedField[];
    private static fromJSON;
}

declare enum ParserDataFormat {
    GS1AI = "gs1ai",
    HIBC = "hibc",
    SwissQR = "swissqr",
    VIN = "vin",
    IataBcbp = "iata_bcbp",
    Gs1DigitalLink = "gs1_digital_link",
    Epc = "epc"
}

declare class Parser extends DefaultSerializeable implements DataCaptureComponent {
    private type;
    private dataFormat;
    private options;
    private _id;
    get id(): string;
    private controller;
    static create(dataFormat: ParserDataFormat): Promise<Parser>;
    private constructor();
    setOptions(options: {
        [key: string]: any;
    }): Promise<void>;
    parseString(data: string): Promise<ParsedData>;
    parseRawData(data: string): Promise<ParsedData>;
    dispose(): void;
}

/**
 * Parser module - structured data parsing without image input
 * Generated from schema definition.
 *
 * Single entry point interface - all operations go through $executeParser.
 * The ParserController handles method-specific logic and calls this proxy.
 * The NativeProxy automatically handles the `$` prefix for native method calls.
 */
interface ParserProxy extends BaseProxy {
    /**
     * Single entry point for all Parser operations.
     * Routes to appropriate native command based on moduleName and methodName.
     *
     * @param params Object containing:
     *   - moduleName: The name of the module to execute against
     *   - methodName: The name of the method to execute
     *   - ...other parameters specific to the method
     *
     * @returns Promise resolving to the result (type depends on methodName)
     *
     * Note: This method is called with the `$` prefix ($executeParser) which is
     * automatically handled by NativeProxy to route to native implementation.
     */
    $executeParser(params: {
        moduleName: string;
        methodName: string;
        [key: string]: any;
    }): Promise<any>;
}

/**
 * Adapter class for Parser operations.
 * Provides typed methods that internally call $executeParser.
 * Generated from schema definition to ensure parameter and method name consistency.
 */
declare class ParserProxyAdapter {
    private proxy;
    constructor(proxy: ParserProxy);
    /**
     * Parses a string and returns structured data
     * @param parserId Unique identifier of the parser instance
     * @param data String data to parse
     */
    parseString({ parserId, data }: {
        parserId: string;
        data: string;
    }): Promise<string>;
    /**
     * Parses raw data and returns structured data
     * @param parserId Unique identifier of the parser instance
     * @param data Raw data to parse
     */
    parseRawData({ parserId, data }: {
        parserId: string;
        data: string;
    }): Promise<string>;
    /**
     * Creates or updates a native parser instance
     * @param parserJson Parser configuration as JSON string
     */
    createUpdateNativeInstance({ parserJson }: {
        parserJson: string;
    }): Promise<void>;
    /**
     * Disposes the parser instance and releases resources
     * @param parserId Unique identifier of the parser instance to dispose
     */
    disposeParser({ parserId }: {
        parserId: string;
    }): Promise<void>;
}

export { PARSER_PROXY_TYPE_NAMES, ParsedData, ParsedField, Parser, ParserDataFormat, ParserIssue, ParserIssueAdditionalInfoKey, ParserIssueCode, ParserProxyAdapter, registerParserProxies };
export type { ParserNativeCallerProvider, ParserProxy, ParserProxyType };
