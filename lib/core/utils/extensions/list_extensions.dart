import 'package:flutter/widgets.dart';

extension IterableExtensions<T> on Iterable<T> {
  Iterable<R> mapIndexed<R>(R Function(int index, T item) convert) sync* {
    var index = 0;
    for (final item in this) {
      yield convert(index, item);
      index++;
    }
  }
}

extension IterableWidgetExtensions on Iterable<Widget> {
  List<Widget> separatedBy(Widget separator) {
    final items = toList();
    if (items.isEmpty) return const [];
    return [
      for (var i = 0; i < items.length; i++) ...[
        if (i > 0) separator,
        items[i],
      ],
    ];
  }
}

extension NullableListExtensions<T> on List<T>? {
  bool get isNullOrEmpty => this == null || this!.isEmpty;

  bool get isNotNullOrEmpty => !isNullOrEmpty;
}
