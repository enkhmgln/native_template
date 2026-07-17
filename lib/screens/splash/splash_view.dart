import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '/app/theme/_.dart';
import '/core/constants/_.dart';
import 'splash_controller.dart';

class SplashView extends GetView<SplashController> {
  const SplashView({super.key});

  static const routeName = '/splash';

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colors.surface,
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ClipRRect(
                borderRadius: AppTheme.radius,
                child: Image.asset(
                  'assets/images/${AppConstants.appLogo}',
                  width: 96,
                  height: 96,
                  fit: BoxFit.cover,
                  errorBuilder: (_, _, _) => Container(
                    width: 96,
                    height: 96,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: AppTheme.radius,
                    ),
                    child: Text(
                      AppConstants.appName[0].toUpperCase(),
                      style: AppStyles.headlineMedium.copyWith(
                        color: AppColors.onPrimary,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Text(
                AppConstants.appName,
                style: AppStyles.headlineSmall.copyWith(
                  color: colors.onSurface,
                ),
              ),
              const SizedBox(height: 48),
              const SizedBox(
                width: 28,
                height: 28,
                child: CircularProgressIndicator(
                  strokeWidth: 2.5,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
