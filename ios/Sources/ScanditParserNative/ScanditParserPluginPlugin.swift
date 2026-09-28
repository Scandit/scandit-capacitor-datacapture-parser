/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import Capacitor
import Foundation
import ScanditCapacitorDatacaptureCore
import ScanditFrameworksCore
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
        CAPPluginMethod(name: "executeParser", returnType: CAPPluginReturnPromise)
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

    @objc(executeParser:)
    func executeParser(_ call: CAPPluginCall) {
        let coreModuleName = String(describing: CoreModule.self)
        guard let coreModule = DefaultServiceLocator.shared.resolve(clazzName: coreModuleName) as? CoreModule else {
            call.reject("Unable to retrieve the CoreModule from the locator.")
            return
        }

        let result = CapacitorResult(call)
        let handled = coreModule.execute(
            CapacitorMethodCall(call),
            result: result,
            module: parserModule
        )

        if !handled {
            let methodName = call.getString("methodName") ?? "unknown"
            call.reject("Unknown Core method: \(methodName)")
        }
    }

    @objc(getDefaults:)
    func getDefaults(call: CAPPluginCall) {
        call.resolve([:])
    }
}
