/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import Capacitor
import Foundation
import ScanditCapacitorDatacaptureCore
import ScanditFrameworksParser

struct ParserCommandArgument: CommandJSONArgument {
    let id: String
    let data: String
}

@objc(ScanditParserNative)
public class ScanditParserNative: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ScanditParserNative"
    public let jsName = "ScanditParserNative"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "parseString", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "parseRawData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createUpdateNativeInstance", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disposeParser", returnType: CAPPluginReturnPromise),
    ]
    var parserModule: ParserModule!

    override public func load() {
        parserModule = ParserModule()
        parserModule.didStart()
    }

    @objc
    func onReset() {
        parserModule.didStop()
    }

    @objc(getDefaults:)
    func getDefaults(call: CAPPluginCall) {
        call.resolve([:])
    }

    @objc(parseString:)
    func parseString(call: CAPPluginCall) {
        guard let parserId = call.getString("parserId") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        guard let data = call.getString("data") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        parserModule.parse(
            string: data,
            id: parserId,
            result: CapacitorResult(call)
        )
    }

    @objc(parseRawData:)
    func parseRawData(call: CAPPluginCall) {
        guard let parserId = call.getString("parserId") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        guard let data = call.getString("data") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        parserModule.parse(
            data: data,
            id: parserId,
            result: CapacitorResult(call)
        )
    }

    @objc(createUpdateNativeInstance:)
    func createUpdateNativeInstance(call: CAPPluginCall) {
        guard let parserJson = call.getString("parserJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        parserModule.createOrUpdateParser(parserJson: parserJson, result: CapacitorResult(call))
    }

    @objc(disposeParser:)
    func disposeParser(call: CAPPluginCall) {
        guard let parserId = call.getString("parserId") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        parserModule.disposeParser(parserId: parserId, result: CapacitorResult(call))
    }
}
