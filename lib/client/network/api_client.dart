import 'package:dio/dio.dart';
import 'api_result.dart';
import 'dio_factory.dart';
import 'multipart_request.dart';
import 'pagination_model.dart';
import '/core/utils/_.dart';

abstract final class ApiErrors {
  static const defaultError = 'Анхаарна уу!';
  static const connectionTimeout = 'Холболтын хугацаа дууслаа';
  static const connectionError = 'Интернет холболтоо шалгана уу';
  static const receiveTimeout = 'Хариу авах хугацаа дууслаа';
  static const sendTimeout = 'Илгээх хугацаа дууслаа';
  static const requestCanceled = 'Хүсэлт цуцлагдлаа';
  static const badCertificate = 'Сертификатын алдаа';
  static const unknown = 'Интернет холболтоо шалгана уу';
}

class ApiClient {
  ApiClient._() {
    dio = DioFactory.create();
  }

  factory ApiClient() => _instance;

  static final _instance = ApiClient._();

  late final Dio dio;

  Future<ApiResult<T>> request<T>({
    required Future<Response<dynamic>> Function() call,
    required ApiResult<T> Function(Response<dynamic> response) parse,
  }) async {
    try {
      final response = await call();
      return parse(response);
    } on DioException catch (e) {
      return failureFromDioException<T>(e);
    } on Object catch (e) {
      final message = e.toString();
      return ApiFailure<T>(
        message.isNotBlank ? message : ApiErrors.defaultError,
      );
    }
  }

  Future<ApiResult<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    required T Function(dynamic) fromJson,
  }) {
    return request<T>(
      call: () => dio.get<dynamic>(path, queryParameters: queryParameters),
      parse: (response) =>
          parseResponse(response, (body) => fromJson(body['data'])),
    );
  }

  Future<ApiResult<T>> post<T>(
    String path, {
    dynamic data,
    required T Function(dynamic) fromJson,
  }) {
    return request<T>(
      call: () async {
        final body = data is MultipartRequest
            ? await multipartFormData(data)
            : data;
        return dio.post<dynamic>(path, data: body);
      },
      parse: (response) =>
          parseResponse(response, (body) => fromJson(body['data'])),
    );
  }

  Future<ApiResult<T>> patch<T>(
    String path, {
    dynamic data,
    required T Function(dynamic) fromJson,
  }) {
    return request<T>(
      call: () => dio.patch<dynamic>(path, data: data),
      parse: (response) =>
          parseResponse(response, (body) => fromJson(body['data'])),
    );
  }

  Future<ApiResult<T>> put<T>(
    String path, {
    dynamic data,
    required T Function(dynamic) fromJson,
  }) {
    return request<T>(
      call: () => dio.put<dynamic>(path, data: data),
      parse: (response) =>
          parseResponse(response, (body) => fromJson(body['data'])),
    );
  }

  Future<ApiResult<T>> delete<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    dynamic data,
    required T Function(dynamic) fromJson,
  }) {
    return request<T>(
      call: () => dio.delete<dynamic>(
        path,
        queryParameters: queryParameters,
        data: data,
      ),
      parse: (response) =>
          parseResponse(response, (body) => fromJson(body['data'])),
    );
  }

  Future<ApiResult<PaginatedData<T>>> getPaginated<T>(
    String path, {
    ListQuery query = const ListQuery(),
    Map<String, dynamic>? extraQuery,
    required T Function(dynamic) fromItem,
  }) {
    final queryParameters = {...query.toQueryParameters(), ...?extraQuery};
    return request<PaginatedData<T>>(
      call: () => dio.get<dynamic>(path, queryParameters: queryParameters),
      parse: (response) => parsePaginatedResponse(response, fromItem),
    );
  }

  Future<String?> getHtml(String path) async {
    try {
      final response = await dio.get<String>(
        path,
        options: Options(
          headers: {'Accept': 'text/html'},
          responseType: ResponseType.plain,
        ),
      );
      return response.data;
    } on DioException {
      return null;
    }
  }

  static ApiResult<T> parseResponse<T>(
    Response<dynamic> response,
    T Function(Map<String, dynamic> body) parse,
  ) {
    final body = response.data as Map<String, dynamic>;
    if (body['success'] != true) {
      return ApiFailure<T>(body['message'] as String);
    }
    try {
      return ApiSuccess<T>(parse(body), body['message'] as String);
    } on Object catch (e) {
      return ApiFailure<T>(e.toString());
    }
  }

  static ApiResult<PaginatedData<T>> parsePaginatedResponse<T>(
    Response<dynamic> response,
    T Function(dynamic) fromItem,
  ) {
    return parseResponse(
      response,
      (body) => PaginatedData(
        items: (body['data'] as List).map(fromItem).toList(),
        meta: PaginationMeta.fromJson(body['meta'] as Map<String, dynamic>),
      ),
    );
  }

  static ApiFailure<T> failureFromDioException<T>(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
        return ApiFailure<T>(ApiErrors.connectionTimeout);
      case DioExceptionType.connectionError:
        return ApiFailure<T>(ApiErrors.connectionError);
      case DioExceptionType.receiveTimeout:
        return ApiFailure<T>(ApiErrors.receiveTimeout);
      case DioExceptionType.sendTimeout:
        return ApiFailure<T>(ApiErrors.sendTimeout);
      case DioExceptionType.transformTimeout:
        return ApiFailure<T>(ApiErrors.receiveTimeout);
      case DioExceptionType.badResponse:
        if (error.response?.data is String) {
          final text = error.response?.data as String?;
          return ApiFailure<T>(
            text.isNotNullOrBlank ? text! : ApiErrors.defaultError,
          );
        }
        return ApiFailure<T>(_messageFromResponse(error.response?.data));
      case DioExceptionType.cancel:
        return ApiFailure<T>(ApiErrors.requestCanceled);
      case DioExceptionType.badCertificate:
        return ApiFailure<T>(ApiErrors.badCertificate);
      case DioExceptionType.unknown:
        return ApiFailure<T>(ApiErrors.unknown);
    }
  }

  static String _messageFromResponse(dynamic data) {
    if (data is Map<String, dynamic>) {
      final msg = data['message'];
      if (msg is String && msg.isNotBlank) return msg;
    }
    return ApiErrors.defaultError;
  }
}
