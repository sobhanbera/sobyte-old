package com.sobyte;

import android.content.Intent;
import android.os.Bundle;
import android.app.Application;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;

public class SplashActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}
