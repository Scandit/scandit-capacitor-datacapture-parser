/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import Foundation
import Capacitor
import ScanditCapacitorDatacaptureCore
import ScanditFrameworksParser

struct ParserCommandArgument: CommandJSONArgument {
    let id: String
    let data: String
}

@objc(ScanditParserNative)
public class ScanditParserNative: CAPPlugin {
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
        guard let commandArgument = try? ParserCommandArgument.fromJSONObject(call.options!) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        parserModule.parse(string: commandArgument.data,
                           id: commandArgument.id,
                           result: CapacitorResult(call))
    }

    @objc(parseRawData:)
    func parseRawData(call: CAPPluginCall) {
        guard let commandArgument = try? ParserCommandArgument.fromJSONObject(call.options!) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        parserModule.parse(data: commandArgument.data,
                           id: commandArgument.id,
                           result: CapacitorResult(call))
    }

    @objc(createUpdateNativeInstance:)
    func createUpdateNativeInstance(call: CAPPluginCall) {
        guard let parserJson = call.getString("data") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        parserModule.createOrUpdateParser(parserJson: parserJson, result: CapacitorResult(call))
    }

    @objc(disposeParser:)
    func disposeParser(call: CAPPluginCall) {
        guard let parserId = call.getString("data") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        parserModule.disposeParser(parserId: parserId, result: CapacitorResult(call))
    }
}
