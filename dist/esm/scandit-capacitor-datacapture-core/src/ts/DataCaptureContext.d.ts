import { FrameSource } from './Camera+Related';
import { DataCaptureContextProxy } from './Capacitor/DataCaptureContextProxy';
import { DataCaptureContextListener } from './DataCaptureContext+Related';
import { DefaultSerializeable, Serializeable } from './Serializeable';
export interface PrivateDataCaptureMode {
    _context: Optional<DataCaptureContext>;
}
export interface DataCaptureMode extends Serializeable {
    isEnabled: boolean;
    readonly context: Optional<DataCaptureContext>;
}
export interface PrivateDataCaptureComponent {
    _context: DataCaptureContext;
}
export interface DataCaptureComponent {
    readonly id: string;
}
export interface PrivateDataCaptureContext {
    proxy: DataCaptureContextProxy;
    modes: [DataCaptureMode];
    components: [DataCaptureComponent];
    initialize: () => void;
    update: () => Promise<void>;
    addComponent: (component: DataCaptureComponent) => Promise<void>;
}
export interface DataCaptureContextCreationOptions {
    deviceName?: Optional<string>;
}
export declare class DataCaptureContextSettings extends DefaultSerializeable {
    constructor();
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
}
export declare class DataCaptureContext extends DefaultSerializeable {
    private licenseKey;
    private deviceName;
    private framework;
    private frameworkVersion;
    private settings;
    private _frameSource;
    private view;
    private modes;
    private components;
    private proxy;
    private listeners;
    get frameSource(): Optional<FrameSource>;
    static get deviceID(): Optional<string>;
    static forLicenseKey(licenseKey: string): DataCaptureContext;
    static forLicenseKeyWithSettings(licenseKey: string, settings: DataCaptureContextSettings | null): DataCaptureContext;
    static forLicenseKeyWithOptions(licenseKey: string, options: Optional<DataCaptureContextCreationOptions>): DataCaptureContext;
    private constructor();
    setFrameSource(frameSource: Optional<FrameSource>): Promise<void>;
    addListener(listener: DataCaptureContextListener): void;
    removeListener(listener: DataCaptureContextListener): void;
    addMode(mode: DataCaptureMode): void;
    removeMode(mode: DataCaptureMode): void;
    removeAllModes(): void;
    dispose(): void;
    applySettings(settings: DataCaptureContextSettings): Promise<void>;
    private initialize;
    private update;
    private addComponent;
}
