var capacitorScanditParserPlugin = (function (exports, core) {
    'use strict';

    class ParsedField {
        get name() {
            return this._name;
        }
        get parsed() {
            return this._parsed;
        }
        get rawString() {
            return this._rawString;
        }
        get issues() {
            return this._issues;
        }
        static fromJSON(json) {
            const field = new ParsedField();
            field._name = json.name;
            field._parsed = json.parsed;
            field._rawString = json.rawString;
            field._issues = json.issues || [];
            return field;
        }
    }

    // tslint:disable-next-line:ban-types
    function ignoreFromSerialization(target, propertyName) {
        target.ignoredProperties = target.ignoredProperties || [];
        target.ignoredProperties.push(propertyName);
    }
    // tslint:disable-next-line:ban-types
    function nameForSerialization(customName) {
        return (target, propertyName) => {
            target.customPropertyNames = target.customPropertyNames || {};
            target.customPropertyNames[propertyName] = customName;
        };
    }
    class DefaultSerializeable {
        toJSON() {
            const properties = Object.keys(this);
            // use @ignoreFromSerialization to ignore properties
            const ignoredProperties = this.ignoredProperties || [];
            // use @ignoreFromSerializationIfNull to ignore properties if they're null
            const ignoredIfNullProperties = this.ignoredIfNullProperties || [];
            // use @nameForSerialization('customName') to rename properties in the JSON output
            const customPropertyNames = this.customPropertyNames || {};
            // use @serializationDefault({}) to use a different value in the JSON output if they're null
            const customPropertyDefaults = this.customPropertyDefaults || {};
            return properties.reduce((json, property) => {
                if (ignoredProperties.includes(property)) {
                    return json;
                }
                let value = this[property];
                if (value === undefined) {
                    return json;
                }
                // Ignore if it's null and should be ignored.
                // This is basically responsible for not including optional properties in the JSON if they're null,
                // as that's not always deserialized to mean the same as not present.
                if (value === null && ignoredIfNullProperties.includes(property)) {
                    return json;
                }
                if (value === null && customPropertyDefaults[property] !== undefined) {
                    value = customPropertyDefaults[property];
                }
                // Serialize if serializeable
                if (value != null && value.toJSON) {
                    value = value.toJSON();
                }
                // Serialize the array if the elements are serializeable
                if (Array.isArray(value)) {
                    value = value.map(e => e.toJSON ? e.toJSON() : e);
                }
                const propertyName = customPropertyNames[property] || property;
                json[propertyName] = value;
                return json;
            }, {});
        }
    }

    class ParsedData {
        get jsonString() {
            return this._jsonString;
        }
        get fields() {
            return this._fields;
        }
        get fieldsByName() {
            return this._fieldsByName;
        }
        static fromJSON(json) {
            const data = new ParsedData();
            data._jsonString = JSON.stringify(json);
            data._fields = json.map(ParsedField.fromJSON);
            data._fieldsByName = data._fields.reduce((fieldsByName, field) => {
                fieldsByName[field.name] = field;
                return fieldsByName;
            }, {});
            return data;
        }
    }

    class CapacitorError {
        constructor(code, message) {
            this.code = code;
            this.message = message;
        }
        static fromJSON(json) {
            if (json && json.code && json.message) {
                return new CapacitorError(json.code, json.message);
            }
            else {
                return null;
            }
        }
    }
    const capacitorExec = (successCallback, errorCallback, pluginName, functionName, args) => {
        if (window.Scandit && window.Scandit.DEBUG) {
            // tslint:disable-next-line:no-console
            console.log(`Called native function: ${functionName}`, args, { success: successCallback, error: errorCallback });
        }
        const extendedSuccessCallback = (message) => {
            const shouldCallback = message && message.shouldNotifyWhenFinished;
            const finishCallbackID = shouldCallback ? message.finishCallbackID : null;
            const started = Date.now();
            let callbackResult;
            if (successCallback) {
                callbackResult = successCallback(message);
            }
            if (shouldCallback) {
                const maxCallbackDuration = 50;
                const callbackDuration = Date.now() - started;
                if (callbackDuration > maxCallbackDuration) {
                    // tslint:disable-next-line:no-console
                    console.log(`[SCANDIT WARNING] Took ${callbackDuration}ms to execute callback that's blocking native execution. You should keep this duration short, for more information, take a look at the documentation.`);
                }
                core.Plugins[pluginName].finishCallback([{
                        finishCallbackID,
                        result: callbackResult,
                    }]);
            }
        };
        const extendedErrorCallback = (error) => {
            if (errorCallback) {
                const capacitorError = CapacitorError.fromJSON(error);
                if (capacitorError !== null) {
                    error = capacitorError;
                }
                errorCallback(error);
            }
        };
        core.Plugins[pluginName][functionName](args).then(extendedSuccessCallback, extendedErrorCallback);
    };

    // tslint:disable-next-line:variable-name
    const Capacitor = {
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
    var PluginMethod;
    (function (PluginMethod) {
        PluginMethod["ParseString"] = "parseString";
        PluginMethod["ParseRawData"] = "parseRawData";
    })(PluginMethod || (PluginMethod = {}));

    class ParserProxy {
        static forParser(parser) {
            const proxy = new ParserProxy();
            proxy.parser = parser;
            return proxy;
        }
        parseString(data) {
            return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec((parsedData) => resolve(ParsedData.fromJSON(parsedData.result)), reject, PluginMethod.ParseString, {
                id: this.parser.id,
                data,
            })));
        }
        parseRawData(data) {
            return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec((parsedData) => resolve(ParsedData.fromJSON(parsedData.result)), reject, PluginMethod.ParseRawData, {
                id: this.parser.id,
                data,
            })));
        }
    }
    ParserProxy.capacitorExec = Capacitor.exec;

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class Parser extends DefaultSerializeable {
        constructor() {
            super();
            this.type = 'parser';
            this.options = {};
            this._id = `${Date.now()}`;
            this.isInitialized = false;
            this.waitingForInitialization = [];
        }
        get id() {
            return this._id;
        }
        get proxy() {
            if (!this._proxy) {
                this._proxy = ParserProxy.forParser(this);
            }
            return this._proxy;
        }
        static forContextAndFormat(context, dataFormat) {
            const parser = new Parser();
            parser.dataFormat = dataFormat;
            return context.addComponent(parser)
                .then(() => {
                parser.isInitialized = true;
                parser.waitingForInitialization.forEach(f => f());
                return parser;
            });
        }
        setOptions(options) {
            this.options = options;
            return this._context.update();
        }
        parseString(data) {
            return this.proxy.parseString(data);
        }
        parseRawData(data) {
            return this.proxy.parseRawData(data);
        }
        waitForInitialization() {
            if (this.isInitialized) {
                return Promise.resolve();
            }
            else {
                return new Promise(resolve => this.waitingForInitialization.push(resolve));
            }
        }
    }
    __decorate([
        nameForSerialization('id')
    ], Parser.prototype, "_id", void 0);
    __decorate([
        ignoreFromSerialization
    ], Parser.prototype, "_context", void 0);
    __decorate([
        ignoreFromSerialization
    ], Parser.prototype, "isInitialized", void 0);
    __decorate([
        ignoreFromSerialization
    ], Parser.prototype, "waitingForInitialization", void 0);
    __decorate([
        ignoreFromSerialization
    ], Parser.prototype, "_proxy", void 0);

    var ParserDataFormat;
    (function (ParserDataFormat) {
        ParserDataFormat["GS1AI"] = "gs1ai";
        ParserDataFormat["HIBC"] = "hibc";
        ParserDataFormat["DLID"] = "dlid";
        ParserDataFormat["MRTD"] = "mrtd";
        ParserDataFormat["SwissQR"] = "swissQr";
        ParserDataFormat["VIN"] = "vin";
        ParserDataFormat["UsUsid"] = "usUsid";
    })(ParserDataFormat || (ParserDataFormat = {}));

    class ScanditParserPlugin extends core.WebPlugin {
        constructor() {
            super({
                name: 'ScanditParserPlugin',
                platforms: ['android', 'ios'],
            });
        }
        async initialize() {
            const api = {
                Parser,
                ParsedData,
                ParserDataFormat,
                ParsedField,
            };
            return new Promise(resolve => resolve(api));
        }
    }
    const scanditParser = new ScanditParserPlugin();
    core.registerWebPlugin(scanditParser);

    exports.ScanditParserPlugin = ScanditParserPlugin;
    exports.scanditParser = scanditParser;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, require('@capacitor/core')));
//# sourceMappingURL=plugin.js.map
