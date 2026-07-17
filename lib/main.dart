import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'app/_.dart';
import 'app_config.dart';
import '/core/constants/_.dart';

Future<void> main() async {
  await AppConfig.init();
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: AppConstants.appName,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
      initialRoute: AppPages.splash,
      getPages: AppPages.routes,
    );
  }
}
