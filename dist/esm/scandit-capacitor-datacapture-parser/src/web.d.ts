import { WebPlugin } from '@capacitor/core';
import { ScanditParserPluginInterface } from './definitions';
export declare class ScanditParserPlugin extends WebPlugin implements ScanditParserPluginInterface {
    constructor();
    initialize(): Promise<any>;
}
declare const scanditParser: ScanditParserPlugin;
export { scanditParser };
