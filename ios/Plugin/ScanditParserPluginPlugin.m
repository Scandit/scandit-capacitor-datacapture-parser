/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(ScanditParserNative, "ScanditParserNative",
           CAP_PLUGIN_METHOD(parseString, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(parseRawData, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createUpdateNativeInstance, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disposeParser, CAPPluginReturnPromise);)
