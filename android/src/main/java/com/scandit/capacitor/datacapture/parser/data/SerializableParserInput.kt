/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.parser.data

import android.util.Base64
import org.json.JSONObject

data class SerializableParserInput(
    val parserId: String,
    val data: String
) {
    val rawData: ByteArray get() = Base64.decode(data, Base64.DEFAULT)

    class Decoder {
        fun decode(data: JSONObject): SerializableParserInput =
            SerializableParserInput(
                data.getString(FIELD_ID),
                data.getString(FIELD_DATA)
            )

        private companion object {
            const val FIELD_ID = "id"
            const val FIELD_DATA = "data"
        }
    }
}
