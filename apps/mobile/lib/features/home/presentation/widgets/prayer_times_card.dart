import 'package:flutter/material.dart';

import '../../../../app/app_theme.dart';
import '../../../../shared/widgets/noor_card.dart';
import '../../../prayer/domain/prayer_time.dart';

class PrayerTimesCard extends StatelessWidget {
  const PrayerTimesCard({
    super.key,
    required this.items,
  });

  final List<PrayerTime> items;

  @override
  Widget build(BuildContext context) {
    return NoorCard(
      child: Column(
        children: items
            .map(
              (item) => Container(
                margin: const EdgeInsets.only(bottom: 8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: item.isCurrent
                      ? AppTheme.primaryGreen.withValues(alpha: 0.12)
                      : null,
                  border: Border.all(
                    color: item.isCurrent
                        ? AppTheme.primaryGreen
                        : Theme.of(context).dividerColor.withValues(alpha: 0.2),
                  ),
                ),
                child: ListTile(
                  dense: true,
                  leading: Icon(
                    Icons.wb_sunny_outlined,
                    color: item.isCurrent ? AppTheme.primaryGreen : Colors.grey,
                  ),
                  title: Text(item.name),
                  trailing: Text(
                    item.time,
                    style: TextStyle(
                      fontWeight: FontWeight.w500,
                      color: item.isCurrent ? AppTheme.primaryGreen : null,
                    ),
                  ),
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}
