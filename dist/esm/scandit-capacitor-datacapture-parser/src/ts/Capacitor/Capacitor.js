import { capacitorExec } from '../../../../scandit-capacitor-datacapture-core/src/ts/Capacitor/CommonCapacitor';
// tslint:disable-next-line:variable-name
export const Capacitor = {
    pluginName: 'ScanditParserNative',
    exec: (success, error, functionName, args) => capacitorExec(success, error, Capacitor.pluginName, functionName, args),
};
// const getDefaults: Promise<void> = new Promise((resolve, reject) => {
//   Capacitor.exec(
//     resolve,
//     reject,
//     'getDefaults',
//     null);
// });
export var PluginMethod;
(function (PluginMethod) {
    PluginMethod["ParseString"] = "parseString";
    PluginMethod["ParseRawData"] = "parseRawData";
})(PluginMethod || (PluginMethod = {}));
//# sourceMappingURL=Capacitor.js.map