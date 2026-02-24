import { DataCaptureComponent, DataCaptureContext, PrivateDataCaptureComponent } from 'scandit-datacapture-frameworks-core';
import { ParsedData } from './ParsedData';
import { ParserDataFormat } from './ParserDataFormat';
import { DefaultSerializeable } from 'scandit-datacapture-frameworks-core';
import { ParserProxy } from './Capacitor/ParserProxy';
export interface PrivateParser extends PrivateDataCaptureComponent {
    dataFormat: ParserDataFormat;
    options: {
        [key: string]: any;
    };
    proxy: ParserProxy;
    isInitialized: boolean;
    waitingForInitialization: [() => void];
    waitForInitialization: Promise<void>;
}
export declare class Parser extends DefaultSerializeable implements DataCaptureComponent {
    private type;
    private dataFormat;
    private options;
    private _id;
    get id(): string;
    private _context;
    private isInitialized;
    private waitingForInitialization;
    private _proxy;
    private get proxy();
    static forContextAndFormat(context: DataCaptureContext, dataFormat: ParserDataFormat): Promise<Parser>;
    private constructor();
    setOptions(options: {
        [key: string]: any;
    }): Promise<void>;
    parseString(data: string): Promise<ParsedData>;
    parseRawData(data: string): Promise<ParsedData>;
    dispose(): void;
    private waitForInitialization;
}
