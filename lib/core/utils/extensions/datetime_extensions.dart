extension DateTimeExtensions on DateTime {
  static const mongolianWeekdays = [
    'Даваа',
    'Мягмар',
    'Лхагва',
    'Пүрэв',
    'Баасан',
    'Бямба',
    'Ням',
  ];

  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  bool get isYesterday {
    final yesterday = DateTime.now().subtract(const Duration(days: 1));
    return year == yesterday.year &&
        month == yesterday.month &&
        day == yesterday.day;
  }

  String toDateString() {
    final month = this.month.toString().padLeft(2, '0');
    final day = this.day.toString().padLeft(2, '0');
    return '$year-$month-$day';
  }

  String toTimeString() {
    final hour = this.hour.toString().padLeft(2, '0');
    final minute = this.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }

  String toDateTimeLabel() => '${toDateString()} ${toTimeString()}';

  String toMongolianDate() {
    final weekday = mongolianWeekdays[this.weekday - 1];
    return '$weekday, $year оны $month сарын $day';
  }

  String toMongolianTimeRange({Duration duration = const Duration(hours: 1)}) {
    final end = add(duration);
    return '${toTimeString()} - ${end.toTimeString()}';
  }

  String toRelativeLabel([DateTime? now]) {
    final current = now ?? DateTime.now();
    final diff = current.difference(this);

    if (diff.isNegative) {
      final ahead = difference(current);
      if (ahead.inMinutes < 1) return 'Одоо';
      if (ahead.inMinutes < 60) return '${ahead.inMinutes} минутын дараа';
      if (ahead.inHours < 24) return '${ahead.inHours} цагийн дараа';
      if (ahead.inDays < 7) return '${ahead.inDays} өдрийн дараа';
      return toDateString();
    }

    if (diff.inSeconds < 60) return 'Сая';
    if (diff.inMinutes < 60) return '${diff.inMinutes} минутын өмнө';
    if (diff.inHours < 24) return '${diff.inHours} цагийн өмнө';
    if (diff.inDays == 1 || isYesterday) return 'Өчигдөр';
    if (diff.inDays < 7) return '${diff.inDays} өдрийн өмнө';
    return toDateString();
  }

  static String timeOfDayGreeting([DateTime? at]) {
    final hour = (at ?? DateTime.now()).hour;
    if (hour < 12) return 'Өглөөний мэнд!';
    if (hour < 18) return 'Өдрийн мэнд!';
    return 'Оройн мэнд!';
  }
}
