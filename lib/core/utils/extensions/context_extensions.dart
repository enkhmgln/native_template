import 'package:flutter/material.dart';

extension ContextExtensions on BuildContext {
  ColorScheme get colorScheme => Theme.of(this).colorScheme;

  TextTheme get textTheme => Theme.of(this).textTheme;

  double get screenWidth => MediaQuery.sizeOf(this).width;

  double get screenHeight => MediaQuery.sizeOf(this).height;

  EdgeInsets get padding => MediaQuery.paddingOf(this);

  EdgeInsets get viewInsets => MediaQuery.viewInsetsOf(this);

  EdgeInsets get viewPadding => MediaQuery.viewPaddingOf(this);

  double get topPadding => padding.top;

  double get bottomPadding => padding.bottom;

  double get safeAreaTop => viewPadding.top;

  double get safeAreaBottom => viewPadding.bottom;

  double get keyboardHeight => viewInsets.bottom;

  bool get isKeyboardVisible => viewInsets.bottom > 0;

  Brightness get brightness => Theme.of(this).brightness;

  bool get isDark => brightness == Brightness.dark;

  bool get isLight => brightness == Brightness.light;

  bool get isTablet => screenWidth >= 600;

  bool get isDesktop => screenWidth >= 1024;

  Locale get locale => Localizations.localeOf(this);

  TextDirection get textDirection => Directionality.of(this);

  bool get isAccessibleNavigation => MediaQuery.accessibleNavigationOf(this);

  FocusScopeNode get focusScope => FocusScope.of(this);

  NavigatorState get navigator => Navigator.of(this);

  bool get canPop => navigator.canPop();

  void unfocus() => focusScope.unfocus();

  void hideKeyboard() => unfocus();

  void pop<T extends Object?>([T? result]) => navigator.pop(result);

  void runIfMounted(VoidCallback action) {
    if (mounted) action();
  }
}
