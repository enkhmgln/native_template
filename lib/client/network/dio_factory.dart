import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import '/core/constants/_.dart';
import '/core/shared/_.dart';

abstract final class DioFactory {
  DioFactory._();

  static const connectTimeout = Duration(seconds: 30);
  static const receiveTimeout = Duration(seconds: 30);

  static BaseOptions get baseOptions => BaseOptions(
    baseUrl: AppConstants.domain,
    connectTimeout: connectTimeout,
    receiveTimeout: receiveTimeout,
    headers: {'Accept': 'application/json'},
  );

  static Dio create() {
    final dio = Dio(baseOptions);
    dio.interceptors.add(AuthInterceptor());
    if (kDebugMode) {
      dio.interceptors.add(
        LogInterceptor(
          requestHeader: false,
          requestBody: true,
          responseHeader: false,
          responseBody: true,
          error: true,
        ),
      );
    }
    return dio;
  }
}

class AuthInterceptor extends Interceptor {
  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await SessionManager.accessToken;
    if (token != null && token.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }
}
