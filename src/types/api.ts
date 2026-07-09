export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  data: null;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
