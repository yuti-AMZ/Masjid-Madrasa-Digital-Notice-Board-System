import 'package:flutter/material.dart';

class NoorCard extends StatelessWidget {
  const NoorCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(12),
  });

  final Widget child;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(16),
        border: isDark
            ? Border.all(color: const Color(0xFF2A3D35), width: 1)
            : null,
        boxShadow: isDark
            ? null
            : const [
                BoxShadow(
                  color: Color(0x11000000),
                  blurRadius: 18,
                  offset: Offset(0, 8),
                ),
              ],
      ),
      child: Padding(padding: padding, child: child),
    );
  }
}
