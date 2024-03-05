/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.parser.errors

import com.scandit.capacitor.datacapture.core.errors.ActionError

class CannotParseStringError(errorMessage: String) : ActionError(
    ERROR_CODE,
    errorMessage
) {

    companion object {
        private const val ERROR_CODE = 10062
    }
}
