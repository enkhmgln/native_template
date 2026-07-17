import 'pagination_model.dart';

sealed class ApiResult<T> {
  const ApiResult._();

  bool get isSuccess => this is ApiSuccess<T>;
  bool get isFailure => this is ApiFailure<T>;

  R when<R>({
    required R Function(T data, String message) success,
    required R Function(String message) failure,
  }) {
    return switch (this) {
      ApiSuccess(:final data, :final message) => success(data, message),
      ApiFailure(:final message) => failure(message),
    };
  }

  T get requireData => switch (this) {
    ApiSuccess(:final data) => data,
    ApiFailure(:final message) => throw StateError(
      'No data available for failed result: $message',
    ),
  };

  String get message => switch (this) {
    ApiSuccess(:final message) => message,
    ApiFailure(:final message) => message,
  };
}

final class ApiSuccess<T> extends ApiResult<T> {
  final T data;
  @override
  final String message;
  const ApiSuccess(this.data, [this.message = '']) : super._();
}

final class ApiFailure<T> extends ApiResult<T> {
  @override
  final String message;
  @override
  const ApiFailure(this.message) : super._();
}

typedef BaseResponse<T> = Future<ApiResult<T>>;
typedef BaseCollectionResponse<T> = Future<ApiResult<PaginatedData<T>>>;
