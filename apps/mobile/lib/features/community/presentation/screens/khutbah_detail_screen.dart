import 'package:flutter/material.dart';

import '../../../../app/app_theme.dart';
import '../../../../shared/widgets/noor_card.dart';

class KhutbahDetailScreen extends StatefulWidget {
  const KhutbahDetailScreen({
    super.key,
    required this.title,
    required this.imamName,
    required this.date,
  });

  final String title;
  final String imamName;
  final String date;

  @override
  State<KhutbahDetailScreen> createState() => _KhutbahDetailScreenState();
}

class _KhutbahDetailScreenState extends State<KhutbahDetailScreen> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    final points = [
      'Strengthen daily salah through consistency and intention.',
      'Build unity by supporting your local masjid programs.',
      'Practice patience and gratitude in family and work life.',
      'Remember Allah in ease and hardship with sincere dua.',
      'Prepare for Akhirah by improving character every day.',
    ];
    final visiblePoints = _expanded ? points : points.take(3).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Friday Khutbah')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            height: 190,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              color: const Color(0xFFDDEEE6),
            ),
            child: const Center(
              child: Icon(Icons.mic_rounded, size: 48, color: AppTheme.primaryGreen),
            ),
          ),
          const SizedBox(height: 14),
          Text(widget.title, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 10),
          NoorCard(
            child: Row(
              children: [
                const CircleAvatar(
                  backgroundColor: Color(0xFFDCF7EE),
                  child: Icon(Icons.person, color: AppTheme.primaryGreen),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.imamName,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      Text(
                        'Imam',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: Colors.grey,
                            ),
                      ),
                    ],
                  ),
                ),
                Text(widget.date, style: Theme.of(context).textTheme.labelLarge),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Text('Summary', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          NoorCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ...visiblePoints.map((point) => Padding(
                      padding: const EdgeInsets.only(bottom: 6),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('•  '),
                          Expanded(child: Text(point)),
                        ],
                      ),
                    )),
                TextButton(
                  onPressed: () => setState(() => _expanded = !_expanded),
                  child: Text(_expanded ? 'Read Less' : 'Read More'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.headphones_rounded),
                  label: const Text('Listen'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.download_rounded),
                  label: const Text('Download Notes'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
