import { NativeCallerProvider, DefaultSerializeable, DataCaptureComponent, BaseProxy, MethodLogMetadata } from 'scandit-capacitor-datacapture-core/dist/dts/core';

declare const PARSER_PROXY_TYPE_NAMES: readonly ["ParserProxy"];
type ParserProxyType = (typeof PARSER_PROXY_TYPE_NAMES)[number];
interface ParserNativeCallerProvider extends NativeCallerProvider<ParserProxyType> {
}

declare function registerParserProxies(provider: ParserNativeCallerProvider): void;

/**
 * Keys used to retrieve additional info regarding an issue.
 *
 * @since 6.26.0
 */
declare enum ParserIssueAdditionalInfoKey {
    /** @since 6.26.0 */
    StartingCharacters = "startingCharacters",
    /** @since 6.26.0 */
    Version = "version",
    /** @since 6.26.0 */
    MinimalVersion = "minimalVersion",
    /** @since 6.26.0 */
    ElementName = "elementName",
    /** @since 6.26.0 */
    String = "string",
    /** @since 6.26.0 */
    Length = "length",
    /** @since 6.26.0 */
    Charset = "charset"
}

/**
 * Error code identifying the cause of the parser issue.
 *
 * @since 6.26.0
 */
declare enum ParserIssueCode {
    /**
     * No issue found
     *
     * @since 6.26.0
     */
    None = "none",
    /**
     * Unspecified issue found
     *
     * @since 6.26.0
     */
    Unspecified = "unspecified",
    /**
     * Mandatory EPD missing
     *
     * @since 6.26.0
     */
    MandatoryEpdMissing = "mandatoryEpdMissing",
    /**
     * Invalid date
     *
     * @since 6.26.0
     */
    InvalidDate = "invalidDate",
    /**
     * String too short
     *
     * @since 6.26.0
     */
    StringTooShort = "stringTooShort",
    /**
     * Wrong starting characters
     *
     * @since 6.26.0
     */
    WrongStartingCharacters = "wrongStartingCharacters",
    /**
     * Invalid separation between elements
     *
     * @since 6.26.0
     */
    InvalidSeparationBetweenElements = "invalidSeparationBetweenElements",
    /**
     * Unsupported version
     *
     * @since 6.26.0
     */
    UnsupportedVersion = "unsupportedVersion",
    /**
     * Incomplete code
     *
     * @since 6.26.0
     */
    IncompleteCode = "incompleteCode",
    /**
     * Empty element content
     *
     * @since 6.26.0
     */
    EmptyElementContent = "emptyElementContent",
    /**
     * Invalid element length
     *
     * @since 6.26.0
     */
    InvalidElementLength = "invalidElementLength",
    /**
     * Element is too long
     *
     * @since 6.26.0
     */
    TooLongElement = "tooLongElement",
    /**
     * Content found in an element that should be empty
     *
     * @since 6.26.0
     */
    NonEmptyElementContent = "nonEmptyElementContent",
    /**
     * Invalid characterset in an element
     *
     * @since 6.26.0
     */
    InvalidCharsetInElement = "invalidCharsetInElement",
    /**
     * Too many alt PMT fields
     *
     * @since 6.26.0
     */
    TooManyAltPmtFields = "tooManyAltPmtFields",
    /**
     * The content cannot contain spaces
     *
     * @since 6.26.0
     */
    CannotContainSpaces = "cannotContainSpaces"
}

/** @since 6.26.0 */
declare class ParserIssue {
    private _code;
    /**
     * Error code identifying the cause of the issue.
     *
     * @since 6.26.0
     */
    get code(): ParserIssueCode;
    private _message;
    /**
     * English description of the error
     *
     * @since 6.26.0
     */
    get message(): string;
    private _additionalInfo;
    /**
     * Dictionary that provides additional info regarding the error.
     *
     * @since 6.26.0
     */
    get additionalInfo(): Record<ParserIssueAdditionalInfoKey, string>;
    private static fromJSON;
}

/** @since 6.10.0 */
declare class ParsedField {
    private _name;
    /**
     * The name of the field.
     *
     * @since 6.10.0
     */
    get name(): string;
    private _parsed;
    /**
     * The parsed data contained in this field. Depending on the field type, this returns a `INumber`, `IDictionary` or [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) instance. Consult the field documentation for information on the type for the fields you are interested in.
     *
     * @since 6.10.0
     */
    get parsed(): any;
    private _rawString;
    /**
     * The raw string that represents this field in the input string/data.
     *
     * @since 6.10.0
     */
    get rawString(): string;
    private _warnings;
    /**
     * Warnings associated with this field
     *
     * @since 6.26.0
     */
    get warnings(): ParserIssue[];
    private static fromJSON;
}

/**
 * Holds the result of a successfully parsed data string or raw data. Instances of this class are returned by {@link Parser.parseString} and {@link Parser.parseRawData} methods. The parsed data is divided into *fields*, each identified by a name.
 *
 * The data contained in this result object can be accessed in one of the following ways:
 *
 * - Through an array of parser fields (see {@link ParsedData.fields}).
 * - Through a dictionary that maps field names to the field (see {@link ParsedData.fieldsByName}).
 * - Directly as a JSON string (see {@link ParsedData.jsonString}).
 *
 * @since 6.10.0
 */
declare class ParsedData {
    private _jsonString;
    /**
     * The result object as a serialized JSON string.
     *
     * @since 6.10.0
     */
    get jsonString(): string;
    private _fields;
    /**
     * The order of the fields matches the order in the original data string. The fields are data format specific. Consult the data format documentation for information on available fields.
     *
     * @since 6.10.0
     */
    get fields(): ParsedField[];
    private _fieldsByName;
    /**
     * Provides by-name lookup of the fields. The field names are data format specific. Consult the data format documentation for information on available fields.
     *
     * @since 6.10.0
     */
    get fieldsByName(): {
        [key: string]: ParsedField;
    };
    private _fieldsWithIssues;
    /**
     * Like {@link ParsedData.fields}, but only returns fields with issues
     *
     * @since 6.26.0
     */
    get fieldsWithIssues(): ParsedField[];
    private static fromJSON;
}

/**
 * Data formats supported by the {@link Parser}.
 *
 * @since 6.10.0
 */
declare enum ParserDataFormat {
    /**
     * GS1 Application Identifier (AI) data format for parsing GS1 General Specifications standard data, see [http://www.gs1.org/](http://www.gs1.org/)
     *
     * @since 6.10.0
     */
    GS1AI = "gs1ai",
    /**
     * Health Industry Bar Code (HIBC) data format for healthcare industry applications, see [https://www.hibcc.org/](https://www.hibcc.org/)
     *
     * @since 6.10.0
     */
    HIBC = "hibc",
    /**
     * Swiss QR-bill data format for Swiss payment processing and banking applications
     *
     * @since 6.10.0
     */
    SwissQR = "swissqr",
    /**
     * Vehicle Identification Number (VIN) data format, see [https://www.iso.org/standard/52200.html](https://www.iso.org/standard/52200.html) and [https://www.iso.org/standard/45844.html](https://www.iso.org/standard/45844.html)
     *
     * @since 6.10.0
     */
    VIN = "vin",
    /**
     * IATA Bar Coded Boarding Pass (BCBP) data format for airline boarding passes, see [https://www.iata.org/](https://www.iata.org/)
     *
     * @since 6.26.0
     */
    IataBcbp = "iata_bcbp",
    /**
     * GS1 Digital Link data format for web-based product identification, see [https://ref.gs1.org/standards/digital-link/uri-syntax/](https://ref.gs1.org/standards/digital-link/uri-syntax/)
     *
     * @since 6.26.0
     */
    Gs1DigitalLink = "gs1_digital_link",
    /**
     * Electronic Product Code (EPC) data format, see [https://www.gs1.org/standards/epc-rfid](https://www.gs1.org/standards/epc-rfid)
     *
     * Currently only the RFID Tag EPC Memory Bank Contents (hexadecimal, SGTIN-96 format) is supported.
     *
     * @since 8.2.0
     */
    Epc = "epc",
    /**
     * French 2D-Doc (ANTS) data format, see [https://ants.gouv.fr/nos-missions/les-solutions-numeriques/2d-doc](https://ants.gouv.fr/nos-missions/les-solutions-numeriques/2d-doc)
     *
     * The 2D-Doc header and data zone are parsed into structured fields and the signature is decoded; cryptographic signature verification against the ANTS trust list is not performed.
     *
     * @since 8.7.0
     */
    French2dDoc = "french2ddoc"
}

/** @since 6.10.0 */
interface Parser$1 {
    type: 'parser';
    /**
     * Implemented from {@link DataCaptureComponent}. See {@link DataCaptureComponent.id}.
     *
     * @since 6.10.0
     */
    id?: string;
    dataFormat: 'gs1ai' | 'hibc' | 'dlid' | 'mrtd' | 'swissqr' | 'vin' | 'us_usid' | 'iata_bcbp' | 'gs1_digital_link' | 'epc' | 'french2ddoc';
    options?: unknown;
}

/** @since 6.10.0 */
declare class Parser extends DefaultSerializeable implements DataCaptureComponent {
    private type;
    private dataFormat;
    private options;
    private _id;
    /**
     * Implemented from {@link DataCaptureComponent}. See {@link DataCaptureComponent.id}.
     *
     * @since 6.10.0
     */
    get id(): string;
    private controller;
    /**
     * Constructs a new Parser instance with the provided dataFormat.
     *
     * @since 7.6.0
     */
    static create(dataFormat: ParserDataFormat): Promise<Parser>;
    private constructor();
    /**
     * Sets the provided options on the parser.
     *
     * Available options depend on the data format type of the parser and are documented for each of the supported data formats.
     *
     * In case the options are invalid, an exception is raised. More detailed information on why creation failed is contained in the exception error message.
     *
     * @since 6.10.0
     */
    setOptions(options: {
        [key: string]: any;
    }): Promise<void>;
    /**
     * Parses the data string and returns the contained field in the result object. Typical inputs to this method is the data contained in a barcode (see {@link Barcode.data})
     *
     * In case the data string could not be parsed, an exception is raised. More detailed information on why creation failed is contained in the exception error message.
     *
     * @since 6.10.0
     */
    parseString(data: string): Promise<ParsedData>;
    /**
     * Parses the raw data and returns the contained field in the result object. Typical inputs to this method is the raw data of a barcode (see {@link Barcode.rawData}).
     *
     * In case the data string could not be parsed, an exception is raised. More detailed information on why creation failed is contained in the exception error message.
     *
     * @since 6.10.0
     */
    parseRawData(data: string): Promise<ParsedData>;
    /**
     * Disposes the parser.
     *
     * @since 6.22.0
     */
    dispose(): void;
    toJSON(): Parser$1;
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

/**
 * Per-method `LogRecord` level and category overrides for the ParserProxy
 * bridge surface. Consumed by the centralized `ScanditLogger` interceptor:
 * per-frame / per-scan callbacks log at `Trace` under their category label, so
 * they only show once the level is raised to `Trace`.
 *
 * Auto-registered as a side effect of importing this module via the
 * generated `index.ts` barrel — no customer wiring required.
 */
declare const PARSER_PROXY_LOG_METADATA: Record<string, MethodLogMetadata>;

export { PARSER_PROXY_LOG_METADATA, PARSER_PROXY_TYPE_NAMES, ParsedData, ParsedField, Parser, ParserDataFormat, ParserIssue, ParserIssueAdditionalInfoKey, ParserIssueCode, ParserProxyAdapter, registerParserProxies };
export type { ParserNativeCallerProvider, ParserProxy, ParserProxyType };
