import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '/app/theme/_.dart';
import '/core/utils/_.dart';
import 'showcase_controller.dart';

class ShowcaseView extends GetView<ShowcaseController> {
  const ShowcaseView({super.key});

  static const routeName = '/showcase';

  static final _styles = <(String, TextStyle)>[
    ('displayLarge', AppStyles.displayLarge),
    ('displayMedium', AppStyles.displayMedium),
    ('displaySmall', AppStyles.displaySmall),
    ('headlineLarge', AppStyles.headlineLarge),
    ('headlineMedium', AppStyles.headlineMedium),
    ('headlineSmall', AppStyles.headlineSmall),
    ('titleLarge', AppStyles.titleLarge),
    ('titleMedium', AppStyles.titleMedium),
    ('titleSmall', AppStyles.titleSmall),
    ('bodyLarge', AppStyles.bodyLarge),
    ('bodyMedium', AppStyles.bodyMedium),
    ('bodySmall', AppStyles.bodySmall),
    ('labelLarge', AppStyles.labelLarge),
    ('labelMedium', AppStyles.labelMedium),
    ('labelSmall', AppStyles.labelSmall),
    ('appBarTitle', AppStyles.appBarTitle),
    ('button', AppStyles.button),
    ('caption', AppStyles.caption),
    ('overline', AppStyles.overline),
    ('link', AppStyles.link),
    ('hint', AppStyles.hint),
    ('error', AppStyles.error),
  ];

  List<(String, Color)> _palette(ColorScheme scheme) => [
    ('primary', scheme.primary),
    ('onPrimary', scheme.onPrimary),
    ('primaryContainer', scheme.primaryContainer),
    ('onPrimaryContainer', scheme.onPrimaryContainer),
    ('secondary', scheme.secondary),
    ('onSecondary', scheme.onSecondary),
    ('secondaryContainer', scheme.secondaryContainer),
    ('onSecondaryContainer', scheme.onSecondaryContainer),
    ('surface', scheme.surface),
    ('onSurface', scheme.onSurface),
    ('onSurfaceVariant', scheme.onSurfaceVariant),
    ('surfaceContainerHighest', scheme.surfaceContainerHighest),
    ('outline', scheme.outline),
    ('outlineVariant', scheme.outlineVariant),
    ('error', scheme.error),
    ('onError', scheme.onError),
    ('errorContainer', scheme.errorContainer),
    ('onErrorContainer', scheme.onErrorContainer),
  ];

  @override
  Widget build(BuildContext context) {
    final colors = context.colorScheme;
    final palette = _palette(colors);

    return Scaffold(
      appBar: AppBar(
        title: Text('Үзүүлэн', style: AppStyles.appBarTitle),
        actions: [
          IconButton(
            tooltip: 'Горим солих',
            onPressed: controller.toggleTheme,
            icon: Icon(
              Get.isDarkMode ? Icons.light_mode : Icons.dark_mode,
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
        children: [
          _sectionTitle('Өнгө', colors),
          const SizedBox(height: 8),
          ...palette.map((sample) => _colorTile(sample.$1, sample.$2, colors)),
          const SizedBox(height: 24),
          _sectionTitle('Үсэг', colors),
          const SizedBox(height: 8),
          ..._styles.map((sample) => _styleTile(sample.$1, sample.$2, colors)),
        ],
      ),
    );
  }

  Widget _sectionTitle(String title, ColorScheme colors) {
    return Text(
      title,
      style: AppStyles.titleMedium.copyWith(color: colors.onSurface),
    );
  }

  Widget _colorTile(String name, Color color, ColorScheme colors) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: color,
              borderRadius: AppTheme.radius,
              border: Border.all(color: colors.outline),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: AppStyles.titleSmall.copyWith(color: colors.onSurface),
                ),
                Text(
                  color.toHex(),
                  style: AppStyles.bodySmall.copyWith(
                    color: colors.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _styleTile(String name, TextStyle style, ColorScheme colors) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: AppStyles.labelSmall.copyWith(
              color: colors.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'Хурдан бор үнэг залхуу нохой дээгүүр үсэрнэ',
            style: style.copyWith(color: colors.onSurface),
          ),
          Divider(color: colors.outlineVariant),
        ],
      ),
    );
  }
}
