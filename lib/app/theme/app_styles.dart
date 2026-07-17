import 'package:flutter/material.dart';

abstract final class AppStyles {
  static const fontFamily = 'GIP';

  static TextStyle style({
    required double fontSize,
    required FontWeight fontWeight,
    double letterSpacing = 0,
    double height = 1.5,
    TextDecoration? decoration,
  }) =>
      TextStyle(
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        letterSpacing: letterSpacing,
        height: height,
        decoration: decoration,
      );

  static final displayLarge = style(
    fontSize: 57,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.25,
    height: 1.12,
  );

  static final displayMedium = style(
    fontSize: 45,
    fontWeight: FontWeight.w400,
    height: 1.16,
  );

  static final displaySmall = style(
    fontSize: 36,
    fontWeight: FontWeight.w400,
    height: 1.22,
  );

  static final headlineLarge = style(
    fontSize: 32,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.5,
    height: 1.25,
  );

  static final headlineMedium = style(
    fontSize: 28,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.25,
    height: 1.28,
  );

  static final headlineSmall = style(
    fontSize: 24,
    fontWeight: FontWeight.w700,
    height: 1.33,
  );

  static final titleLarge = style(
    fontSize: 22,
    fontWeight: FontWeight.w700,
    height: 1.27,
  );

  static final titleMedium = style(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.15,
  );

  static final titleSmall = style(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.43,
  );

  static final bodyLarge = style(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.15,
  );

  static final bodyMedium = style(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.25,
    height: 1.43,
  );

  static final bodySmall = style(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.4,
    height: 1.33,
  );

  static final labelLarge = style(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.43,
  );

  static final labelMedium = style(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.5,
    height: 1.33,
  );

  static final labelSmall = style(
    fontSize: 11,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.5,
    height: 1.45,
  );

  static final appBarTitle = style(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.33,
  );

  static TextStyle get button => labelLarge;

  static TextStyle get caption => bodySmall;

  static final overline = style(
    fontSize: 10,
    fontWeight: FontWeight.w600,
    letterSpacing: 1.5,
    height: 1.6,
  );

  static TextStyle get link =>
      labelLarge.copyWith(decoration: TextDecoration.underline);

  static TextStyle get hint => bodyMedium;

  static final error = style(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.4,
    height: 1.33,
  );

  static TextTheme get textTheme => TextTheme(
        displayLarge: displayLarge,
        displayMedium: displayMedium,
        displaySmall: displaySmall,
        headlineLarge: headlineLarge,
        headlineMedium: headlineMedium,
        headlineSmall: headlineSmall,
        titleLarge: titleLarge,
        titleMedium: titleMedium,
        titleSmall: titleSmall,
        bodyLarge: bodyLarge,
        bodyMedium: bodyMedium,
        bodySmall: bodySmall,
        labelLarge: labelLarge,
        labelMedium: labelMedium,
        labelSmall: labelSmall,
      );
}
