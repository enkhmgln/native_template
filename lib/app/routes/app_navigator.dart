import 'package:get/get.dart';
import 'app_pages.dart';

abstract final class AppNavigator {
  AppNavigator._();

  static void toInitial() => Get.offAllNamed(AppPages.initial);

  static void back() => Get.back();
}
