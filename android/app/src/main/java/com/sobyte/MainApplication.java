package com.sobyte;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.zoontek.rnlocalize.RNLocalizePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.reactnativeimagecolors.ImageColorsPackage;

//import com.facebook.react.bridge.JSIModulePackage;
//import com.swmansion.reanimated.ReanimatedJSIModulePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
          @Override
          public boolean getUseDeveloperSupport() {
              return BuildConfig.DEBUG;
          }

          /** this function is added becuase we are using react-native-reanimated library */
//          @Override
//          protected JSIModulePackage getJSIModulePackage() {
//              return new ReanimatedJSIModulePackage(); // <- add
//          }

          /** this function contains all the package list required */
          @Override
          protected List<ReactPackage> getPackages() {
              @SuppressWarnings("UnnecessaryLocalVariable")
              List<ReactPackage> packages = new PackageList(this).getPackages();
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // packages.add(new MyReactNativePackage());
              // packages.add(new SvgPackage());
              // packages.add(new AsyncStoragePackage());
              // packages.add(new LinearGradientPackage());
              // packages.add(new RNShimmerPackage());
              // packages.add(new VectorIconsPackage());
              // packages.add(new RNDeviceInfo());
              // packages.add(new RNLocalizePackage());
              // packages.add(new BlurViewPackage());
              packages.add(new ReactSliderPackage());
              return packages;
          }

          @Override
          protected String getJSMainModuleName() {
              return "index";
          }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.sobyte.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
