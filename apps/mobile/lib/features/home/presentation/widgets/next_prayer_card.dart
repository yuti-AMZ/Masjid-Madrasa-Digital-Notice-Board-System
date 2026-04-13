import 'package:flutter/material.dart';

import '../../../../app/app_theme.dart';

class NextPrayerCard extends StatelessWidget {
  const NextPrayerCard({
    super.key,
    required this.prayerName,
    required this.countdown,
  });

  final String prayerName;
  final String countdown;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: AppTheme.primaryGreen,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'NEXT PRAYER',
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.white70,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            prayerName,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontSize: 34,
                ),
          ),
          const SizedBox(height: 6),
          Text(
            countdown,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Colors.white,
                ),
          ),
          const SizedBox(height: 12),
          FilledButton.icon(
            style: FilledButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: AppTheme.primaryGreen,
            ),
            onPressed: () {},
            icon: const Icon(Icons.alarm_rounded, size: 18),
            label: const Text('Set Reminder'),
          ),
        ],
      ),
    );
  }
}
