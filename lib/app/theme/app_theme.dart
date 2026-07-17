import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_styles.dart';

abstract final class AppTheme {
  static const radius = BorderRadius.all(Radius.circular(12));

  static const inputBorder = OutlineInputBorder(
    borderRadius: radius,
    borderSide: BorderSide.none,
  );

  static final appBarTheme = AppBarTheme(
    centerTitle: true,
    elevation: 0,
    scrolledUnderElevation: 0,
    titleTextStyle: AppStyles.appBarTitle,
  );

  static final snackBarTheme = SnackBarThemeData(
    contentTextStyle: AppStyles.bodyMedium,
    shape: const RoundedRectangleBorder(borderRadius: radius),
    behavior: SnackBarBehavior.floating,
  );

  static InputDecorationTheme inputDecorationTheme({
    required Color fillColor,
    required Color labelColor,
    required Color hintColor,
  }) => InputDecorationTheme(
    filled: true,
    fillColor: fillColor,
    floatingLabelBehavior: FloatingLabelBehavior.never,
    labelStyle: AppStyles.bodyMedium.copyWith(color: labelColor),
    hintStyle: AppStyles.hint.copyWith(color: hintColor),
    errorStyle: AppStyles.error.copyWith(color: AppColors.error),
    border: inputBorder,
    enabledBorder: inputBorder,
    focusedBorder: inputBorder,
    errorBorder: inputBorder,
    focusedErrorBorder: inputBorder,
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
  );

  static FilledButtonThemeData filledButtonTheme({
    Color? backgroundColor,
    Color? foregroundColor,
  }) => FilledButtonThemeData(
    style: FilledButton.styleFrom(
      minimumSize: const Size.fromHeight(48),
      backgroundColor: backgroundColor,
      foregroundColor: foregroundColor,
      shape: const RoundedRectangleBorder(borderRadius: radius),
      textStyle: AppStyles.button,
    ),
  );

  static OutlinedButtonThemeData outlinedButtonTheme({
    Color? foregroundColor,
    Color? borderColor,
  }) => OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      minimumSize: const Size.fromHeight(48),
      foregroundColor: foregroundColor,
      side: borderColor == null ? null : BorderSide(color: borderColor),
      shape: const RoundedRectangleBorder(borderRadius: radius),
      textStyle: AppStyles.button,
    ),
  );

  static TextButtonThemeData textButtonTheme({Color? foregroundColor}) =>
      TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: foregroundColor,
          textStyle: AppStyles.button,
        ),
      );

  static ChipThemeData chipTheme({required Color labelColor}) => ChipThemeData(
    labelStyle: AppStyles.labelLarge.copyWith(color: labelColor),
    secondaryLabelStyle: AppStyles.labelMedium.copyWith(color: labelColor),
  );

  static ThemeData baseTheme({
    required Brightness brightness,
    required ColorScheme colorScheme,
    required Color scaffoldBackground,
    required InputDecorationTheme inputDecoration,
    required ChipThemeData chipThemeData,
    required FilledButtonThemeData filledButtonThemeData,
    required OutlinedButtonThemeData outlinedButtonThemeData,
    required TextButtonThemeData textButtonThemeData,
  }) => ThemeData(
    useMaterial3: true,
    brightness: brightness,
    colorScheme: colorScheme,
    scaffoldBackgroundColor: scaffoldBackground,
    appBarTheme: appBarTheme,
    textTheme: AppStyles.textTheme,
    inputDecorationTheme: inputDecoration,
    filledButtonTheme: filledButtonThemeData,
    outlinedButtonTheme: outlinedButtonThemeData,
    textButtonTheme: textButtonThemeData,
    chipTheme: chipThemeData,
    snackBarTheme: snackBarTheme,
  );

  static ThemeData get light => baseTheme(
    brightness: Brightness.light,
    colorScheme: const ColorScheme.light(
      primary: AppColors.primary,
      onPrimary: AppColors.onPrimary,
      secondary: AppColors.secondary,
      onSecondary: AppColors.onSecondary,
      error: AppColors.error,
      onError: AppColors.onError,
      surface: AppColors.surface,
      onSurface: AppColors.onSurface,
      onSurfaceVariant: AppColors.onSurfaceMuted,
      outline: AppColors.outline,
      surfaceContainerHighest: AppColors.surfaceSubtle,
      primaryContainer: Color(0xFFDCEAFF),
      onPrimaryContainer: Color(0xFF003A8C),
      secondaryContainer: Color(0xFFD1FAE5),
      onSecondaryContainer: Color(0xFF065F46),
      errorContainer: Color(0xFFFEE2E2),
      onErrorContainer: Color(0xFF991B1B),
    ),
    scaffoldBackground: AppColors.surface,
    inputDecoration: inputDecorationTheme(
      fillColor: AppColors.surfaceSubtle,
      labelColor: AppColors.onSurface,
      hintColor: AppColors.onSurfaceMuted,
    ),
    chipThemeData: chipTheme(labelColor: AppColors.onSurface),
    filledButtonThemeData: filledButtonTheme(
      backgroundColor: AppColors.primary,
      foregroundColor: AppColors.onPrimary,
    ),
    outlinedButtonThemeData: outlinedButtonTheme(
      foregroundColor: AppColors.primary,
      borderColor: AppColors.primary,
    ),
    textButtonThemeData: textButtonTheme(foregroundColor: AppColors.primary),
  );

  static ThemeData get dark => baseTheme(
    brightness: Brightness.dark,
    colorScheme: const ColorScheme.dark(
      primary: AppColors.primaryDark,
      onPrimary: AppColors.onPrimary,
      secondary: AppColors.secondary,
      onSecondary: AppColors.onSecondary,
      error: AppColors.error,
      onError: AppColors.onError,
      surface: AppColors.surfaceDark,
      onSurface: AppColors.onSurfaceDark,
      onSurfaceVariant: AppColors.onSurfaceMutedDark,
      outline: AppColors.outline,
      surfaceContainerHighest: AppColors.surfaceSubtleDark,
    ),
    scaffoldBackground: AppColors.surfaceDark,
    inputDecoration: inputDecorationTheme(
      fillColor: AppColors.surfaceSubtleDark,
      labelColor: AppColors.onSurfaceDark,
      hintColor: AppColors.onSurfaceMutedDark,
    ),
    chipThemeData: chipTheme(labelColor: AppColors.onSurfaceDark),
    filledButtonThemeData: filledButtonTheme(),
    outlinedButtonThemeData: outlinedButtonTheme(),
    textButtonThemeData: textButtonTheme(),
  );
}
