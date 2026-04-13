import 'package:flutter/material.dart';

import '../../../../shared/widgets/noor_card.dart';

class AnnouncementsSection extends StatelessWidget {
  const AnnouncementsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final announcements = const [
      ('Community Dinner This Friday', 'Join us after Maghrib prayer in the main hall.'),
      ('Roof Renovation Update', 'Phase 2 starts next week. Donation goal progress posted.'),
      ('Halaqa Reminder', 'Weekly tafsir class starts at 7:30 PM tonight.'),
    ];

    return Column(
      children: [
        NoorCard(
          child: _AnnouncementTile(
            title: announcements[0].$1,
            body: announcements[0].$2,
            large: true,
          ),
        ),
        const SizedBox(height: 10),
        NoorCard(
          child: _AnnouncementTile(
            title: announcements[1].$1,
            body: announcements[1].$2,
          ),
        ),
        const SizedBox(height: 10),
        NoorCard(
          child: _AnnouncementTile(
            title: announcements[2].$1,
            body: announcements[2].$2,
          ),
        ),
      ],
    );
  }
}

class _AnnouncementTile extends StatelessWidget {
  const _AnnouncementTile({
    required this.title,
    required this.body,
    this.large = false,
  });

  final String title;
  final String body;
  final bool large;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: large ? 130 : 90,
          width: double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: const Color(0xFFEFE9D6),
          ),
          child: const Center(
            child: Icon(Icons.campaign_outlined, color: Color(0xFF7A6A20), size: 28),
          ),
        ),
        const SizedBox(height: 10),
        Text(
          title,
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 4),
        Text(
          body,
          maxLines: large ? 3 : 2,
          overflow: TextOverflow.ellipsis,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.grey,
              ),
        ),
      ],
    );
  }
}
