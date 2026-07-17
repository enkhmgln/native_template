import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '/app/theme/_.dart';
import 'showcase_controller.dart';

class ShowcaseView extends GetView<ShowcaseController> {
  const ShowcaseView({super.key});

  static const routeName = '/showcase';

  static final _samples = <(String, TextStyle)>[
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

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: Text('Үсгийн загвар', style: AppStyles.appBarTitle),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
        itemCount: _samples.length,
        separatorBuilder: (_, _) => Divider(color: colors.outlineVariant),
        itemBuilder: (context, index) {
          final (name, style) = _samples[index];
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
              ],
            ),
          );
        },
      ),
    );
  }
}
