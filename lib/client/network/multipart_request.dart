import 'package:dio/dio.dart';
import '/core/utils/_.dart';

abstract class MultipartRequest {
  Map<String, dynamic> fields();

  Map<String, String?> files();
}

class FileUploadRequest implements MultipartRequest {
  const FileUploadRequest({required this.field, required this.filePath});

  final String field;
  final String filePath;

  @override
  Map<String, dynamic> fields() => const {};

  @override
  Map<String, String?> files() => {field: filePath};
}

Future<FormData> multipartFormData(MultipartRequest request) async {
  final map = Map<String, dynamic>.from(request.fields());

  for (final entry in request.files().entries) {
    final path = entry.value;
    if (path.isNotNullOrBlank) {
      map[entry.key] = await MultipartFile.fromFile(path!);
    }
  }

  return FormData.fromMap(map);
}
