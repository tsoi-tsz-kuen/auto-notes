package com.moblie

import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.util.Log // 添加这一行
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.TextView

class FloatingSubtitleService : Service() {
    private lateinit var windowManager: WindowManager
    private lateinit var floatingView: View

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager

        // 创建浮动窗口布局
        floatingView = LayoutInflater.from(this).inflate(R.layout.layout_floating_subtitle, null)

        // 设置浮动窗口的参数
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            } else {
                WindowManager.LayoutParams.TYPE_PHONE
            },
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        // 设置浮动窗口的显示位置
        params.gravity = Gravity.TOP or Gravity.START
        params.x = 0
        params.y = 100

        // 添加浮动窗口到窗口管理器
        windowManager.addView(floatingView, params)

        // 设置字幕内容
        val subtitleTextView = floatingView.findViewById<TextView>(R.id.subtitleTextView)
        subtitleTextView.text = "这是浮动字幕的内容" // 默认内容
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val subtitle = intent?.getStringExtra("subtitle") ?: "默认字幕内容"
        Log.d("FloatingSubtitleService", "Service started with subtitle: $subtitle") // 使用 Log
        val subtitleTextView = floatingView.findViewById<TextView>(R.id.subtitleTextView)
        subtitleTextView.text = subtitle // 显示字幕内容
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        super.onDestroy()
        if (::floatingView.isInitialized) {
            windowManager.removeView(floatingView)
        }
    }
}