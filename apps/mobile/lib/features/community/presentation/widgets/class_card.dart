import 'package:flutter/material.dart';

import '../../../../app/app_theme.dart';
import '../../../../shared/widgets/noor_card.dart';

class ClassCard extends StatelessWidget {
  const ClassCard({
    super.key,
    required this.title,
    required this.teacher,
    required this.schedule,
  });

  final String title;
  final String teacher;
  final String schedule;

  @override
  Widget build(BuildContext context) {
    return NoorCard(
      padding: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 120,
            decoration: BoxDecoration(
              color: const Color(0xFFEFE9D6),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Icon(Icons.menu_book_rounded, color: Color(0xFF7A6A20), size: 34),
            ),
          ),
          const SizedBox(height: 10),
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 4),
          Text(
            teacher,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.grey),
          ),
          const SizedBox(height: 2),
          Text(
            schedule,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.grey),
          ),
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              style: FilledButton.styleFrom(backgroundColor: AppTheme.primaryGreen),
              onPressed: () {},
              child: const Text('Join Class'),
            ),
          ),
        ],
      ),
    );
  }
}
