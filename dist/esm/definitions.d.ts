export type Optional<T> = T | null;
export interface ScanditParserPluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}
