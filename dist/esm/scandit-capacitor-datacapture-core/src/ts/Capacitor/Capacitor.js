import { Plugins } from '@capacitor/core';
import { capacitorExec } from './CommonCapacitor';
import { defaultsFromJSON } from './Defaults';
export var CapacitorFunction;
(function (CapacitorFunction) {
    CapacitorFunction["GetDefaults"] = "getDefaults";
    CapacitorFunction["ContextFromJSON"] = "contextFromJSON";
    CapacitorFunction["DisposeContext"] = "disposeContext";
    CapacitorFunction["UpdateContextFromJSON"] = "updateContextFromJSON";
    CapacitorFunction["SubscribeContextListener"] = "subscribeContextListener";
    CapacitorFunction["SubscribeContextFrameListener"] = "subscribeContextFrameListener";
    CapacitorFunction["SetViewPositionAndSize"] = "setViewPositionAndSize";
    CapacitorFunction["ShowView"] = "showView";
    CapacitorFunction["HideView"] = "hideView";
    CapacitorFunction["ViewPointForFramePoint"] = "viewPointForFramePoint";
    CapacitorFunction["ViewQuadrilateralForFrameQuadrilateral"] = "viewQuadrilateralForFrameQuadrilateral";
    CapacitorFunction["SubscribeViewListener"] = "subscribeViewListener";
    CapacitorFunction["GetCurrentCameraState"] = "getCurrentCameraState";
    CapacitorFunction["GetIsTorchAvailable"] = "getIsTorchAvailable";
    CapacitorFunction["EmitFeedback"] = "emitFeedback";
    CapacitorFunction["SubscribeVolumeButtonObserver"] = "subscribeVolumeButtonObserver";
    CapacitorFunction["UnsubscribeVolumeButtonObserver"] = "unsubscribeVolumeButtonObserver";
})(CapacitorFunction || (CapacitorFunction = {}));
export const pluginName = 'ScanditCaptureCoreNative';
// tslint:disable-next-line:variable-name
export const Capacitor = {
    pluginName,
    defaults: {},
    exec: (success, error, functionName, args) => capacitorExec(success, error, pluginName, functionName, args),
};
export const getDefaults = new Promise((resolve, reject) => Plugins[Capacitor.pluginName][CapacitorFunction.GetDefaults]().then((defaultsJSON) => {
    const defaults = defaultsFromJSON(defaultsJSON);
    Capacitor.defaults = defaults;
    resolve(defaults);
}, reject));
//# sourceMappingURL=Capacitor.js.map