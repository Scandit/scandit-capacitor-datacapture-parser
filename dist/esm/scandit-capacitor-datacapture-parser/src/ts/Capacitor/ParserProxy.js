import { ParsedData } from '../ParsedData';
import { Capacitor, PluginMethod } from './Capacitor';
export class ParserProxy {
    static forParser(parser) {
        const proxy = new ParserProxy();
        proxy.parser = parser;
        return proxy;
    }
    parseString(data) {
        return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec((parsedData) => resolve(ParsedData.fromJSON(JSON.parse(parsedData.result))), reject, PluginMethod.ParseString, {
            id: this.parser.id,
            data,
        })));
    }
    parseRawData(data) {
        return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec((parsedData) => resolve(ParsedData.fromJSON(JSON.parse(parsedData.result))), reject, PluginMethod.ParseRawData, {
            id: this.parser.id,
            data,
        })));
    }
}
ParserProxy.capacitorExec = Capacitor.exec;
//# sourceMappingURL=ParserProxy.js.map