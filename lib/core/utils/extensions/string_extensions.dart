extension StringExtensions on String {
  bool get isBlank => trim().isEmpty;

  bool get isNotBlank => !isBlank;

  String get capitalize {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }

  String truncate(int max, {String suffix = '...'}) {
    if (length <= max) return this;
    return '${substring(0, max)}$suffix';
  }

  bool get isEmail {
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    return emailRegex.hasMatch(this);
  }

  Uri? get tryParseWebUri {
    final value = trim();
    if (value.isEmpty) return null;
    final withScheme = value.contains('://') ? value : 'https://$value';
    return Uri.tryParse(withScheme);
  }
}

extension NullableStringExtensions on String? {
  bool get isNullOrBlank => this == null || this!.isBlank;

  bool get isNotNullOrBlank => !isNullOrBlank;
}
