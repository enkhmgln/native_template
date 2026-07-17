import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/widgets.dart';
import '/core/_.dart';
import '/firebase_options.dart';

abstract final class AppConfig {
  static Future<void> init() async {
    WidgetsFlutterBinding.ensureInitialized();

    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
    await StoreManager.shared.init();
    await NotificationManager.init();
  }
}
