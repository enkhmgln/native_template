import 'package:get/get.dart';
import 'showcase_controller.dart';

class ShowcaseBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ShowcaseController>(ShowcaseController.new);
  }
}
