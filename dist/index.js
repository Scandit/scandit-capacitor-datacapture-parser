import { registerPlugin } from '@capacitor/core';
import { nameForSerialization, ignoreFromSerialization, DefaultSerializeable } from 'scandit-capacitor-datacapture-core/dist/core';
import { capacitorExec } from 'scandit-capacitor-datacapture-core';

class ParserIssue {
    get code() {
        return this._code;
    }
    get message() {
        return this._message;
    }
    get additionalInfo() {
        return this._additionalInfo;
    }
    static fromJSON(json) {
        const issue = new ParserIssue();
        issue._code = json.code;
        issue._message = json.message;
        issue._additionalInfo = json.additionalInfo;
        return issue;
    }
}

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
    get warnings() {
        return this._warnings;
    }
    static fromJSON(json) {
        var _a;
        const field = new ParsedField();
        field._name = json.name;
        field._parsed = json.parsed;
        field._rawString = json.rawString;
        field._issues = json.issues || [];
        field._warnings = ((_a = json.warnings) === null || _a === void 0 ? void 0 : _a.map(e => ParserIssue.fromJSON(e))) || [];
        return field;
    }
}

class ParsedData {
    get jsonString() {
        return this._jsonString;
    }
    get fields() {
        return this._fields;
    }
    get fieldsWithIssues() {
        return this._fieldsWithIssues;
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
        data._fieldsWithIssues = data._fields.filter(e => e.warnings.length > 0);
        return data;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// tslint:disable-next-line:variable-name
const Capacitor = {
    pluginName: 'ScanditParserNative',
    exec: (success, error, functionName, args) => capacitorExec(success, error, Capacitor.pluginName, functionName, args),
};
var PluginMethod;
(function (PluginMethod) {
    PluginMethod["ParseString"] = "parseString";
    PluginMethod["ParseRawData"] = "parseRawData";
    PluginMethod["CreateUpdateNativeInstance"] = "createUpdateNativeInstance";
    PluginMethod["DisposeParser"] = "disposeParser";
})(PluginMethod || (PluginMethod = {}));

class ParserProxy {
    static forParser(parser) {
        const proxy = new ParserProxy();
        proxy.parser = parser;
        return proxy;
    }
    parseString(data) {
        return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec((payload) => resolve(ParsedData.fromJSON(JSON.parse(payload.data))), reject, PluginMethod.ParseString, {
            id: this.parser.id,
            data,
        })));
    }
    parseRawData(data) {
        return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec((payload) => resolve(ParsedData.fromJSON(JSON.parse(payload.data))), reject, PluginMethod.ParseRawData, {
            id: this.parser.id,
            data,
        })));
    }
    createUpdateNativeInstance() {
        return new Promise((resolve, reject) => ParserProxy.capacitorExec(resolve, reject, PluginMethod.CreateUpdateNativeInstance, { data: JSON.stringify(this.parser.toJSON()) }));
    }
    disposeParser() {
        return new Promise((resolve, reject) => ParserProxy.capacitorExec(resolve, reject, PluginMethod.DisposeParser, { data: this.parser.id }));
    }
}
ParserProxy.capacitorExec = Capacitor.exec;

class Parser extends DefaultSerializeable {
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
        parser._context = context;
        return parser.proxy.createUpdateNativeInstance()
            .then(() => {
            parser.isInitialized = true;
            parser.waitingForInitialization.forEach(f => f());
            return parser;
        });
    }
    constructor() {
        super();
        this.type = 'parser';
        this.options = {};
        this._id = `${Date.now()}`;
        this.isInitialized = false;
        this.waitingForInitialization = [];
    }
    setOptions(options) {
        this.options = options;
        return this.proxy.createUpdateNativeInstance();
    }
    parseString(data) {
        return this.proxy.parseString(data);
    }
    parseRawData(data) {
        return this.proxy.parseRawData(data);
    }
    dispose() {
        this.proxy.disposeParser();
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
    /**
     * @deprecated ParserDataFormat.DLID
     * Use ID Capture instead.
     */
    ParserDataFormat["DLID"] = "dlid";
    /**
     * @deprecated ParserDataFormat.MRTD
     * Use ID Capture instead.
     */
    ParserDataFormat["MRTD"] = "mrtd";
    ParserDataFormat["SwissQR"] = "swissQr";
    ParserDataFormat["VIN"] = "vin";
    /**
     * @deprecated ParserDataFormat.UsUsid
     * Use ID Capture instead.
     */
    ParserDataFormat["UsUsid"] = "usUsid";
    ParserDataFormat["IataBcbp"] = "iataBcbp";
    ParserDataFormat["Gs1DigitalLink"] = "gs1DigitalLink";
})(ParserDataFormat || (ParserDataFormat = {}));

var ParserIssueCode;
(function (ParserIssueCode) {
    ParserIssueCode["None"] = "none";
    ParserIssueCode["Unspecified"] = "unspecified";
    ParserIssueCode["MandatoryEpdMissing"] = "mandatoryEpdMissing";
    ParserIssueCode["InvalidDate"] = "invalidDate";
    ParserIssueCode["StringTooShort"] = "stringTooShort";
    ParserIssueCode["WrongStartingCharacters"] = "wrongStartingCharacters";
    ParserIssueCode["InvalidSeparationBetweenElements"] = "invalidSeparationBetweenElements";
    ParserIssueCode["UnsupportedVersion"] = "unsupportedVersion";
    ParserIssueCode["IncompleteCode"] = "incompleteCode";
    ParserIssueCode["EmptyElementContent"] = "emptyElementContent";
    ParserIssueCode["InvalidElementLength"] = "invalidElementLength";
    ParserIssueCode["TooLongElement"] = "tooLongElement";
    ParserIssueCode["NonEmptyElementContent"] = "nonEmptyElementContent";
    ParserIssueCode["InvalidCharsetInElement"] = "invalidCharsetInElement";
    ParserIssueCode["TooManyAltPmtFields"] = "tooManyAltPmtFields";
    ParserIssueCode["CannotContainSpaces"] = "cannotContainSpaces";
})(ParserIssueCode || (ParserIssueCode = {}));

var ParserIssueAdditionalInfoKey;
(function (ParserIssueAdditionalInfoKey) {
    ParserIssueAdditionalInfoKey["StartingCharacters"] = "startingCharacters";
    ParserIssueAdditionalInfoKey["Version"] = "version";
    ParserIssueAdditionalInfoKey["MinimalVersion"] = "minimalVersion";
    ParserIssueAdditionalInfoKey["ElementName"] = "elementName";
    ParserIssueAdditionalInfoKey["String"] = "string";
    ParserIssueAdditionalInfoKey["Length"] = "length";
    ParserIssueAdditionalInfoKey["Charset"] = "charset";
})(ParserIssueAdditionalInfoKey || (ParserIssueAdditionalInfoKey = {}));

class ScanditParserPluginImplementation {
    // eslint-disable-next-line @typescript-eslint/require-await
    async initialize() {
        const api = {
            Parser,
            ParsedData,
            ParserDataFormat,
            ParsedField,
            ParserIssueCode,
            ParserIssueAdditionalInfoKey,
            ParserIssue
        };
        return api;
    }
}
registerPlugin('ScanditParserPlugin', {
    android: () => new ScanditParserPluginImplementation(),
    ios: () => new ScanditParserPluginImplementation(),
    web: () => new ScanditParserPluginImplementation(),
});
// tslint:disable-next-line:variable-name
const ScanditParserPlugin = new ScanditParserPluginImplementation();

export { ScanditParserPlugin, ScanditParserPluginImplementation };
