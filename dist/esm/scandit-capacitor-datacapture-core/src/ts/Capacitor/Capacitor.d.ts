import { Defaults } from './Defaults';
export declare enum CapacitorFunction {
    GetDefaults = "getDefaults",
    ContextFromJSON = "contextFromJSON",
    DisposeContext = "disposeContext",
    UpdateContextFromJSON = "updateContextFromJSON",
    SubscribeContextListener = "subscribeContextListener",
    SubscribeContextFrameListener = "subscribeContextFrameListener",
    SetViewPositionAndSize = "setViewPositionAndSize",
    ShowView = "showView",
    HideView = "hideView",
    ViewPointForFramePoint = "viewPointForFramePoint",
    ViewQuadrilateralForFrameQuadrilateral = "viewQuadrilateralForFrameQuadrilateral",
    SubscribeViewListener = "subscribeViewListener",
    GetCurrentCameraState = "getCurrentCameraState",
    GetIsTorchAvailable = "getIsTorchAvailable",
    GetLastFrame = "getLastFrame",
    GetLastFrameOrNull = "getLastFrameOrNull",
    EmitFeedback = "emitFeedback",
    SubscribeVolumeButtonObserver = "subscribeVolumeButtonObserver",
    UnsubscribeVolumeButtonObserver = "unsubscribeVolumeButtonObserver"
}
export interface CapacitorWindow extends Window {
    Scandit: any;
    Capacitor: any;
}
export declare const pluginName = "ScanditCaptureCoreNative";
export declare const Capacitor: {
    pluginName: string;
    defaults: Defaults;
    exec: (success: Optional<Function>, error: Optional<Function>, functionName: string, args: Optional<[any]>) => void;
};
export declare const getDefaults: () => Promise<Defaults>;
