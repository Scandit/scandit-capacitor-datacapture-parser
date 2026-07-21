import { ParserNativeCallerProvider, ParserProxyType } from 'scandit-datacapture-frameworks-parser';
import { NativeCaller } from 'scandit-datacapture-frameworks-core';
export declare class CordovaParserNativeCallerProvider implements ParserNativeCallerProvider {
    getNativeCaller(_proxyType: ParserProxyType): NativeCaller;
}
