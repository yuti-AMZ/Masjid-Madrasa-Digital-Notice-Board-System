class PrayerTime {
  const PrayerTime({
    required this.name,
    required this.time,
    this.isCurrent = false,
  });

  final String name;
  final String time;
  final bool isCurrent;
}
