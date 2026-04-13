import '../domain/prayer_time.dart';

const prayerTimes = <PrayerTime>[
  PrayerTime(name: 'Fajr', time: '05:12 AM'),
  PrayerTime(name: 'Sunrise', time: '06:45 AM'),
  PrayerTime(name: 'Dhuhr', time: '12:30 PM'),
  PrayerTime(name: 'Asr', time: '03:45 PM', isCurrent: true),
  PrayerTime(name: 'Maghrib', time: '06:15 PM'),
  PrayerTime(name: 'Isha', time: '07:45 PM'),
];
