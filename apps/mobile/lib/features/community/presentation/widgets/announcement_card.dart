import 'package:flutter/material.dart';

import '../../../../shared/widgets/noor_card.dart';

class AnnouncementCard extends StatelessWidget {
  const AnnouncementCard({
    super.key,
    required this.title,
    required this.description,
    required this.date,
    this.onTap,
  });

  final String title;
  final String description;
  final String date;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return NoorCard(
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 6),
            Text(
              description,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.grey),
            ),
            const SizedBox(height: 10),
            Text(
              date,
              style: Theme.of(context).textTheme.labelLarge?.copyWith(color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}
