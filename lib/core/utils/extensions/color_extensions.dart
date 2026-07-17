import 'package:flutter/material.dart';

extension ColorExtensions on Color {
  Color withAlphaValue(double alpha) => withValues(alpha: alpha);

  String toHex({bool leadingHashSign = true}) {
    final hex = toARGB32()
        .toRadixString(16)
        .padLeft(8, '0')
        .substring(2)
        .toUpperCase();
    return leadingHashSign ? '#$hex' : hex;
  }

  bool get isLight => computeLuminance() > 0.5;

  bool get isDark => !isLight;

  Color get onColor => isLight ? const Color(0xFF000000) : const Color(0xFFFFFFFF);
}
