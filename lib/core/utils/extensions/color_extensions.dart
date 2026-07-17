import 'package:flutter/material.dart';

extension ColorExtensions on Color {
  Color withAlphaValue(double alpha) => withValues(alpha: alpha);
}
