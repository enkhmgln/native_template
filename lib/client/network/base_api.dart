import 'api_client.dart';

abstract class BaseApi {
  static ApiClient get client => ApiClient();
}
