import 'package:flutter/material.dart';

import '../../../../app/app_theme.dart';
import '../../../../shared/widgets/noor_card.dart';
import '../../data/sample_prayer_data.dart';

class PrayerScreen extends StatefulWidget {
  const PrayerScreen({super.key});

  @override
  State<PrayerScreen> createState() => _PrayerScreenState();
}

class _PrayerScreenState extends State<PrayerScreen> {
  bool _useAutoLocation = true;
  String _selectedMasjid = 'Noor Central Masjid';

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text('Prayer Timetable', style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 12),
          NoorCard(
            child: Column(
              children: [
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Auto location'),
                  value: _useAutoLocation,
                  onChanged: (value) => setState(() => _useAutoLocation = value),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: _selectedMasjid,
                  decoration: const InputDecoration(
                    labelText: 'Manual masjid selection',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12)),
                    ),
                  ),
                  items: const [
                    DropdownMenuItem(
                      value: 'Noor Central Masjid',
                      child: Text('Noor Central Masjid'),
                    ),
                    DropdownMenuItem(
                      value: 'Anwar Masjid',
                      child: Text('Anwar Masjid'),
                    ),
                    DropdownMenuItem(
                      value: 'Rahma Masjid',
                      child: Text('Rahma Masjid'),
                    ),
                  ],
                  onChanged: _useAutoLocation
                      ? null
                      : (value) {
                          if (value != null) {
                            setState(() => _selectedMasjid = value);
                          }
                        },
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          ...prayerTimes.map(
            (item) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: NoorCard(
                child: ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: Icon(
                    Icons.schedule_rounded,
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
            ),
          ),
        ],
      ),
    );
  }
}
