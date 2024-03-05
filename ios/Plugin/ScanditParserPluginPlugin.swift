/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import Foundation
import Capacitor
import ScanditCaptureCore
import ScanditCapacitorDatacaptureCore
import ScanditParser
import ScanditFrameworksCore

struct ParserCommandArgument: CommandJSONArgument {
    let id: String
    let data: String
}

extension Array where Element == Parser {
    func parser(withID parserID: String) -> Parser? {
        return self.first(where: { $0.componentId == parserID })
    }
}

@objc(ScanditParserNative)
public class ScanditParserNative: CAPPlugin, DeserializationLifeCycleObserver {
    private let implementation = ScanditParserPlugin()

    lazy var parserDeserializer: ParserDeserializer = {
        let parserDeserializer = ParserDeserializer()
        parserDeserializer.delegate = self
        return parserDeserializer
    }()

    public var components: [DataCaptureComponent] {
        return parsers
    }

    lazy var parsers = [Parser]()

    override public func load() {
        ScanditCapacitorCore.registerComponentDeserializer(parserDeserializer)
        DeserializationLifeCycleDispatcher.shared.attach(observer: self)
    }

    @objc
    func onReset() {
        DeserializationLifeCycleDispatcher.shared.detach(observer: self)
    }

    @objc(getDefaults:)
    func getDefaults(call: CAPPluginCall) {
        call.resolve([:])
    }

    public func parsersRemoved() {
        parsers.removeAll()
    }

    @objc(parseString:)
    func parseString(call: CAPPluginCall) {
        guard let commandArgument = try? ParserCommandArgument.fromJSONObject(call.options!) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        guard let parser = parsers.parser(withID: commandArgument.id) else {
            call.reject(CommandError.parserNotFound.toJSONString())
            return
        }

        do {
            let parsedData = try parser.parseString(commandArgument.data)
            call.resolve([
                "result": parsedData.jsonString
            ])
        } catch let error {
            call.reject(CommandError.couldNotParseString(reason: error.localizedDescription).toJSONString())
        }
    }

    @objc(parseRawData:)
    func parseRawData(call: CAPPluginCall) {
        guard let commandArgument = try? ParserCommandArgument.fromJSONObject(call.options!) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        guard let parser = parsers.parser(withID: commandArgument.id) else {
            call.reject(CommandError.parserNotFound.toJSONString())
            return
        }

        guard let data = Data(base64Encoded: commandArgument.data) else {
            call.reject(CommandError.couldNotParseRawData(reason: "Could not decode base64 data").toJSONString())
            return
        }

        do {
            let parsedData = try parser.parseRawData(data)
            call.resolve([
                "result": parsedData.jsonString
            ])
        } catch let error {
            call.reject(CommandError.couldNotParseRawData(reason: error.localizedDescription).toJSONString())
        }
    }
}
