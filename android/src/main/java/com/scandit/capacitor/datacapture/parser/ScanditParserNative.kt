/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.parser

import android.util.Log
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.scandit.capacitor.datacapture.core.ScanditCaptureCoreNative
import com.scandit.capacitor.datacapture.core.utils.CapacitorResult
import com.scandit.datacapture.frameworks.parser.ParserModule
import org.json.JSONException
import org.json.JSONObject

@CapacitorPlugin(name = "ScanditParserNative")
class ScanditParserNative(
    private val parserModule: ParserModule = ParserModule()
) : Plugin() {

    override fun load() {
        super.load()

        // We need to register the plugin with its Core dependency for serializers to load.
        val corePlugin = bridge.getPlugin(CORE_PLUGIN_NAME)
        if (corePlugin != null) {
            (corePlugin.instance as ScanditCaptureCoreNative)
                .registerPluginInstance(pluginHandle.instance)
        } else {
            Log.e("Registering:", "Core not found")
        }
        parserModule.onCreate(bridge.context)
    }

    override fun handleOnDestroy() {
        parserModule.onDestroy()
    }

    @PluginMethod
    fun getDefaults(call: PluginCall) {
        call.resolve(JSObject())
    }

    @PluginMethod
    fun parseString(call: PluginCall) {
        parserModule.parseString(call.data.toString(), CapacitorResult(call))
    }

    @PluginMethod
    fun parseRawData(call: PluginCall) {
        parserModule.parseRawData(call.data.toString(), CapacitorResult(call))
    }

    @PluginMethod
    fun createUpdateNativeInstance(call: PluginCall) {
        parserModule.createOrUpdateParser(call.data.getString("data") ?: "", CapacitorResult(call))
    }

    @PluginMethod
    fun disposeParser(call: PluginCall) {
        parserModule.disposeParser(call.data.getString("data") ?: "", CapacitorResult(call))
    }

    companion object {
        private const val CORE_PLUGIN_NAME = "ScanditCaptureCoreNative"
    }
}
