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
import com.scandit.capacitor.datacapture.core.communication.ComponentDeserializersProvider
import com.scandit.capacitor.datacapture.parser.data.SerializableParserInput
import com.scandit.capacitor.datacapture.parser.errors.CannotParseRawDataError
import com.scandit.capacitor.datacapture.parser.errors.CannotParseStringError
import com.scandit.capacitor.datacapture.parser.errors.ParserInstanceNotFoundError
import com.scandit.capacitor.datacapture.parser.handlers.ParsersHandler
import com.scandit.datacapture.core.component.serialization.DataCaptureComponentDeserializer
import com.scandit.datacapture.core.json.JsonValue
import com.scandit.datacapture.parser.ParsedData
import com.scandit.datacapture.parser.Parser
import com.scandit.datacapture.parser.serialization.ParserDeserializer
import com.scandit.datacapture.parser.serialization.ParserDeserializerListener
import org.json.JSONException
import org.json.JSONObject

@CapacitorPlugin(name = "ScanditParserNative")
class ScanditParserNative :
    Plugin(),
    ParserDeserializerListener,
    ComponentDeserializersProvider {

    val a = System.currentTimeMillis()
    private val parsersHandler: ParsersHandler = ParsersHandler()

    companion object {
        private const val FIELD_RESULT = "result"
        private const val CORE_PLUGIN_NAME = "ScanditCaptureCoreNative"
    }

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
    }

    @PluginMethod
    fun getDefaults(call: PluginCall) {
        this.onParserDefaults(call)
    }

    @PluginMethod
    fun parseString(call: PluginCall) {
        try {
            val input =
                SerializableParserInput.Decoder().decode(JSONObject(call.data.toString()))
            val parser = parsersHandler.getParserForId(input.parserId)

            if (parser == null) {
                this.onParseStringNoParserError(call)
            } else {
                val parsedData = parser.parseString(input.data)
                this.onParseString(parsedData, call)
            }
        } catch (e: JSONException) {
            this.onJsonParseError(e, call)
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            this.onParseStringNativeError(e, call)
        }
    }

    @PluginMethod
    fun parseRawData(call: PluginCall) {
        try {
            val input =
                SerializableParserInput.Decoder().decode(JSONObject(call.data.toString()))
            val parser = parsersHandler.getParserForId(input.parserId)

            if (parser == null) {
                this.onParseRawDataNoParserError(call)
            } else {
                val parsedData = parser.parseRawData(input.rawData)
                this.onParseRawData(parsedData, call)
            }
        } catch (e: JSONException) {
            this.onJsonParseError(e, call)
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            this.onParseRawDataNativeError(e, call)
        }
    }

    private fun onParserDefaults(call: PluginCall) {
        call.resolve(JSObject())
    }

    private fun onJsonParseError(error: Throwable, call: PluginCall) {
        call.reject(error.message)
    }

    private fun onParseRawData(
        parsedData: ParsedData,
        call: PluginCall
    ) {
        call.resolve(
            JSObject.fromJSONObject(
                JSONObject(
                    mapOf(
                        FIELD_RESULT to parsedData.jsonString
                    ).toString()
                )
            )
        )
    }

    private fun onParseRawDataNativeError(error: Throwable, call: PluginCall) {
        call.reject(CannotParseStringError(error.localizedMessage.orEmpty()).message)
    }

    private fun onParseRawDataNoParserError(call: PluginCall) {
        call.resolve(JSObject(ParserInstanceNotFoundError().message))
    }

    private fun onParseString(parsedData: ParsedData, call: PluginCall) {
        call.resolve(
            JSObject.fromJSONObject(
                JSONObject(
                    mapOf(
                        FIELD_RESULT to parsedData.jsonString
                    ).toString()
                )
            )
        )
    }

    private fun onParseStringNativeError(error: Throwable, call: PluginCall) {
        call.reject(CannotParseRawDataError(error.localizedMessage.orEmpty()).message)
    }

    private fun onParseStringNoParserError(call: PluginCall) {
        call.reject(ParserInstanceNotFoundError().message)
    }

    //region ParserDeserializerListener
    override fun onParserDeserializationFinished(
        deserializer: ParserDeserializer,
        parser: Parser,
        json: JsonValue
    ) {
        parsersHandler.registerParser(json.requireByKeyAsString("id"), parser)
    }
    //endregion

    //region ComponentDeserializersProvider
    override fun provideComponentDeserializers(): List<DataCaptureComponentDeserializer> = listOf(
        ParserDeserializer().also { it.listener = this }
    )
    //endregion
}
