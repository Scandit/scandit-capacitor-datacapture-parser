import type { ScanditParserPluginInterface } from './definitions';
export * from './definitions';
export declare class ScanditParserPluginImplementation implements ScanditParserPluginInterface {
    initialize(): Promise<any>;
}
export declare const ScanditParserPlugin: ScanditParserPluginImplementation;
