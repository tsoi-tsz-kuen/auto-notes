package com.moblie

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log // 添加这一行

class FloatingSubtitleModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "FloatingSubtitleModule" // 確保這裡的名稱正確
    }

    @ReactMethod
    fun startService(subtitle: String) {
        Log.d("FloatingSubtitleModule", "Starting service with subtitle: $subtitle") // 添加日志
        val intent = Intent(reactApplicationContext, FloatingSubtitleService::class.java)
        intent.putExtra("subtitle", subtitle) // 传递字幕内容
        reactApplicationContext.startService(intent)
    }
}