/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.parser.handlers

import com.scandit.datacapture.parser.Parser

class ParsersHandler {

    private val parsers = mutableMapOf<String, Parser>()

    fun getParserForId(parserId: String): Parser? = parsers[parserId]
    fun registerParser(parserId: String, parser: Parser) {
        parsers[parserId] = parser
    }
}
