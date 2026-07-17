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

  String get digitsOnly => replaceAll(RegExp(r'\D'), '');

  bool get isPhone {
    final phone = digitsOnly;
    return RegExp(r'^[6-9]\d{7}$').hasMatch(phone);
  }

  String get formattedPhone {
    final phone = digitsOnly;
    if (phone.length != 8) return this;
    return '${phone.substring(0, 4)}-${phone.substring(4)}';
  }

  String get maskPhone {
    final phone = digitsOnly;
    if (phone.length < 4) return this;
    final visible = phone.substring(0, 4);
    return '$visible${'*' * (phone.length - 4)}';
  }

  String get orDash => isBlank ? '-' : this;

  String get removeWhitespace => replaceAll(RegExp(r'\s+'), '');

  bool get isNumeric => double.tryParse(trim()) != null;

  String takeLast(int count) {
    if (count <= 0) return '';
    if (length <= count) return this;
    return substring(length - count);
  }

  int? get toIntOrNull => int.tryParse(trim());

  double? get toDoubleOrNull => double.tryParse(trim());

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

  String get orDash => isNullOrBlank ? '-' : this!;
}
