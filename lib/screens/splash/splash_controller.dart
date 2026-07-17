import 'package:get/get.dart';
import '/app/routes/_.dart';

class SplashController extends GetxController {
  @override
  void onReady() {
    super.onReady();
    Future.delayed(const Duration(seconds: 2), AppNavigator.toInitial);
  }
}
