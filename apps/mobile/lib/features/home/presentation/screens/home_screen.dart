import 'package:flutter/material.dart';

import '../../../prayer/data/sample_prayer_data.dart';
import '../widgets/announcements_section.dart';
import '../widgets/next_prayer_card.dart';
import '../widgets/prayer_times_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'NoorMasjid',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 6),
            Text(
              'Stay connected with your masjid.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.grey),
            ),
            const SizedBox(height: 16),
            const NextPrayerCard(
              prayerName: 'Asr',
              countdown: 'Starts in 45 mins',
            ),
            const SizedBox(height: 16),
            Text("Today's Prayer Times", style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 10),
            const PrayerTimesCard(items: prayerTimes),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Announcements', style: Theme.of(context).textTheme.titleMedium),
                TextButton(onPressed: () {}, child: const Text('View all')),
              ],
            ),
            const SizedBox(height: 6),
            const AnnouncementsSection(),
          ],
        ),
      ),
    );
  }
}
