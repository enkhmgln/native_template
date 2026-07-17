import 'package:flutter/material.dart';

extension ContextExtensions on BuildContext {
  ColorScheme get colorScheme => Theme.of(this).colorScheme;

  double get screenWidth => MediaQuery.sizeOf(this).width;

  double get screenHeight => MediaQuery.sizeOf(this).height;

  EdgeInsets get padding => MediaQuery.paddingOf(this);

  EdgeInsets get viewInsets => MediaQuery.viewInsetsOf(this);

  EdgeInsets get viewPadding => MediaQuery.viewPaddingOf(this);

  double get topPadding => padding.top;

  double get bottomPadding => padding.bottom;

  double get keyboardHeight => viewInsets.bottom;

  bool get isKeyboardVisible => viewInsets.bottom > 0;

  Brightness get brightness => Theme.of(this).brightness;

  bool get isDesktop => screenWidth >= 1024;

  Locale get locale => Localizations.localeOf(this);

  TextDirection get textDirection => Directionality.of(this);

  bool get isAccessibleNavigation => MediaQuery.accessibleNavigationOf(this);

  ScaffoldMessengerState get messenger => ScaffoldMessenger.of(this);

  void unfocus() => FocusScope.of(this).unfocus();

  void hideKeyboard() => unfocus();

  void runIfMounted(VoidCallback action) {
    if (mounted) action();
  }
}
