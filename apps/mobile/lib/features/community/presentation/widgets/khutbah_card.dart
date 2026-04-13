import 'package:flutter/material.dart';

import '../../../../app/app_theme.dart';
import '../../../../shared/widgets/noor_card.dart';

class KhutbahCard extends StatelessWidget {
  const KhutbahCard({
    super.key,
    required this.title,
    required this.imamName,
    required this.date,
    required this.summary,
    this.onListen,
    this.onNotes,
    this.onTap,
  });

  final String title;
  final String imamName;
  final String date;
  final String summary;
  final VoidCallback? onListen;
  final VoidCallback? onNotes;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return NoorCard(
      padding: const EdgeInsets.all(10),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 150,
              width: double.infinity,
              decoration: BoxDecoration(
                color: const Color(0xFFDDEEE6),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Icon(Icons.mic_rounded, size: 40, color: AppTheme.primaryGreen),
              ),
            ),
            const SizedBox(height: 10),
            Text(title, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 6),
            Text(
              'Imam: $imamName',
              style: Theme.of(context).textTheme.labelLarge?.copyWith(color: Colors.grey),
            ),
            Text(
              date,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.grey),
            ),
            const SizedBox(height: 8),
            Text(
              summary,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: FilledButton.icon(
                    onPressed: onListen,
                    icon: const Icon(Icons.headphones_rounded),
                    label: const Text('Listen'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: onNotes,
                    icon: const Icon(Icons.notes_rounded),
                    label: const Text('Notes'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
