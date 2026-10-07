import { nameForSerialization, DefaultSerializeable, ignoreFromSerialization, BaseController, registerProxies } from 'scandit-capacitor-datacapture-core/dist/core';
import { registerPlugin } from '@capacitor/core';
import { CapacitorNativeCaller, capacitorExec } from 'scandit-capacitor-datacapture-core';

const PARSER_PROXY_TYPE_NAMES = [
    'ParserProxy',
];

function registerParserProxies(provider) {
    registerProxies(PARSER_PROXY_TYPE_NAMES, provider);
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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
    get warnings() {
        return this._warnings;
    }
    static fromJSON(json) {
        var _a;
        const field = new ParsedField();
        field._name = json.name;
        field._parsed = json.parsed;
        field._rawString = json.rawString;
        field._warnings = ((_a = json.warnings) === null || _a === void 0 ? void 0 : _a.map(e => ParserIssue['fromJSON'](e))) || [];
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
    get fieldsByName() {
        return this._fieldsByName;
    }
    get fieldsWithIssues() {
        return this._fieldsWithIssues;
    }
    static fromJSON(json) {
        const data = new ParsedData();
        data._jsonString = JSON.stringify(json);
        data._fields = json.map(ParsedField['fromJSON']);
        data._fieldsByName = data._fields.reduce((fieldsByName, field) => {
            fieldsByName[field.name] = field;
            return fieldsByName;
        }, {});
        data._fieldsWithIssues = data._fields.filter(e => e.warnings.length > 0);
        return data;
    }
}

class ParserController extends BaseController {
    constructor(parser) {
        super('ParserProxy');
        this.parser = parser;
    }
    parseString(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._proxy.$parseString({ parserId: this.parser.id, data: data });
            const jsonData = JSON.parse(result.data);
            return ParsedData['fromJSON'](jsonData);
        });
    }
    parseRawData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._proxy.$parseRawData({ parserId: this.parser.id, data: data });
            const jsonData = JSON.parse(result.data);
            return ParsedData['fromJSON'](jsonData);
        });
    }
    createUpdateNativeInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._proxy.$createUpdateNativeInstance({ parserJson: JSON.stringify(this.parser.toJSON()) });
        });
    }
    disposeParser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._proxy.$disposeParser({ parserId: this.parser.id });
        });
    }
}

class Parser extends DefaultSerializeable {
    get id() {
        return this._id;
    }
    static create(dataFormat) {
        const parser = new Parser();
        parser.dataFormat = dataFormat;
        const promise = parser.controller.createUpdateNativeInstance().then(() => (Promise.resolve(parser)));
        return promise;
    }
    constructor() {
        super();
        this.type = 'parser';
        this.options = {};
        this._id = `${Date.now()}`;
        this.controller = new ParserController(this);
    }
    setOptions(options) {
        this.options = options;
        return this.controller.createUpdateNativeInstance();
    }
    parseString(data) {
        return this.controller.parseString(data);
    }
    parseRawData(data) {
        return this.controller.parseRawData(data);
    }
    dispose() {
        void this.controller.disposeParser();
    }
}
__decorate([
    nameForSerialization('id')
], Parser.prototype, "_id", void 0);
__decorate([
    ignoreFromSerialization
], Parser.prototype, "controller", void 0);

var ParserDataFormat;
(function (ParserDataFormat) {
    ParserDataFormat["GS1AI"] = "gs1ai";
    ParserDataFormat["HIBC"] = "hibc";
    ParserDataFormat["SwissQR"] = "swissqr";
    ParserDataFormat["VIN"] = "vin";
    ParserDataFormat["IataBcbp"] = "iata_bcbp";
    ParserDataFormat["Gs1DigitalLink"] = "gs1_digital_link";
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

var ParserExports = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ParsedData: ParsedData,
    ParsedField: ParsedField,
    Parser: Parser,
    get ParserDataFormat () { return ParserDataFormat; },
    ParserIssue: ParserIssue,
    get ParserIssueAdditionalInfoKey () { return ParserIssueAdditionalInfoKey; },
    get ParserIssueCode () { return ParserIssueCode; }
});

// tslint:disable-next-line:variable-name
const Capacitor = {
    pluginName: 'ScanditParserNative',
    exec: (success, error, functionName, args) => capacitorExec(success, error, Capacitor.pluginName, functionName, args),
};

class CordovaParserNativeCallerProvider {
    getNativeCaller(_proxyType) {
        return new CapacitorNativeCaller(Capacitor.pluginName);
    }
}

function initParserProxies() {
    registerParserProxies(new CordovaParserNativeCallerProvider());
}

class ScanditParserPluginImplementation {
    // eslint-disable-next-line @typescript-eslint/require-await
    async initialize() {
        initParserProxies();
        const api = Object.assign({}, ParserExports);
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

export { ParsedData, ParsedField, Parser, ParserDataFormat, ParserIssue, ParserIssueAdditionalInfoKey, ParserIssueCode, ScanditParserPlugin, ScanditParserPluginImplementation };
