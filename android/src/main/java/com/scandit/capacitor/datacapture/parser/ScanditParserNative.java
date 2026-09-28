/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.parser;

import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.scandit.capacitor.datacapture.core.ScanditCaptureCoreNative;
import com.scandit.capacitor.datacapture.core.utils.CapacitorMethodCall;
import com.scandit.capacitor.datacapture.core.utils.CapacitorResult;
import com.scandit.datacapture.frameworks.core.CoreModule;
import com.scandit.datacapture.frameworks.core.locator.DefaultServiceLocator;
import com.scandit.datacapture.frameworks.parser.ParserModule;

@CapacitorPlugin(name = "ScanditParserNative")
public class ScanditParserNative extends Plugin {

  private static final String CORE_PLUGIN_NAME = "ScanditCaptureCoreNative";

  private final ParserModule parserModule;
  private final DefaultServiceLocator serviceLocator;

  public ScanditParserNative() {
    this.parserModule = new ParserModule();
    this.serviceLocator = DefaultServiceLocator.getInstance();
  }

  @Override
  public void load() {
    super.load();

    // We need to register the plugin with its Core dependency for serializers to load.
    com.getcapacitor.PluginHandle corePlugin = getBridge().getPlugin(CORE_PLUGIN_NAME);
    if (corePlugin != null) {
      ((ScanditCaptureCoreNative) corePlugin.getInstance())
          .registerPluginInstance(getPluginHandle().getInstance());
    } else {
      Log.e("Registering:", "Core not found");
    }
    parserModule.onCreate(getBridge().getContext());
  }

  @Override
  protected void handleOnDestroy() {
    parserModule.onDestroy();
  }

  @PluginMethod
  public void getDefaults(PluginCall call) {
    call.resolve(new JSObject());
  }

  @PluginMethod
  public void executeParser(PluginCall call) {
    CoreModule coreModule = (CoreModule) serviceLocator.resolve(CoreModule.class.getSimpleName());

    if (coreModule == null) {
      call.reject("Unable to retrieve the CoreModule from the locator.");
      return;
    }

    boolean result =
        coreModule.execute(new CapacitorMethodCall(call), new CapacitorResult(call), parserModule);

    if (!result) {
      String methodName = call.getData().getString("methodName");
      if (methodName == null) {
        methodName = "unknown";
      }
      call.reject("Unknown method: " + methodName);
    }
  }
}
