import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color primaryGreen = Color(0xFF14C38E);
  static const Color accentGold = Color(0xFFFFD700);

  static const Color lightBackground = Color(0xFFF8F9FA);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightText = Color(0xFF1A1A1A);

  static const Color darkBackground = Color(0xFF111D18);
  static const Color darkSurface = Color(0xFF1A2821);
  static const Color darkText = Color(0xFFFFFFFF);

  static ThemeData light() {
    final textTheme = GoogleFonts.plusJakartaSansTextTheme().copyWith(
      headlineSmall: const TextStyle(fontWeight: FontWeight.w700),
      titleLarge: const TextStyle(fontWeight: FontWeight.w700),
      titleMedium: const TextStyle(fontWeight: FontWeight.w700),
      labelLarge: const TextStyle(fontWeight: FontWeight.w500),
      bodyLarge: const TextStyle(fontWeight: FontWeight.w400),
      bodyMedium: const TextStyle(fontWeight: FontWeight.w400),
      bodySmall: const TextStyle(fontWeight: FontWeight.w400),
    );
    final scheme = ColorScheme.fromSeed(
      seedColor: primaryGreen,
      brightness: Brightness.light,
      surface: lightSurface,
      onSurface: lightText,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: lightBackground,
      textTheme: textTheme,
      appBarTheme: const AppBarTheme(
        backgroundColor: lightBackground,
        elevation: 0,
        centerTitle: false,
        foregroundColor: lightText,
      ),
      cardColor: lightSurface,
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: primaryGreen,
          foregroundColor: Colors.white,
          textStyle: textTheme.labelLarge,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return primaryGreen;
          return null;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return primaryGreen.withValues(alpha: 0.4);
          }
          return null;
        }),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        selectedItemColor: primaryGreen,
        unselectedItemColor: Colors.grey,
        showUnselectedLabels: true,
      ),
    );
  }

  static ThemeData dark() {
    final textTheme = GoogleFonts.plusJakartaSansTextTheme(
      ThemeData(brightness: Brightness.dark).textTheme,
    ).copyWith(
      headlineSmall: const TextStyle(fontWeight: FontWeight.w700),
      titleLarge: const TextStyle(fontWeight: FontWeight.w700),
      titleMedium: const TextStyle(fontWeight: FontWeight.w700),
      labelLarge: const TextStyle(fontWeight: FontWeight.w500),
      bodyLarge: const TextStyle(fontWeight: FontWeight.w400),
      bodyMedium: const TextStyle(fontWeight: FontWeight.w400),
      bodySmall: const TextStyle(fontWeight: FontWeight.w400),
    );
    final scheme = ColorScheme.fromSeed(
      seedColor: primaryGreen,
      brightness: Brightness.dark,
      surface: darkSurface,
      onSurface: darkText,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: darkBackground,
      textTheme: textTheme,
      appBarTheme: const AppBarTheme(
        backgroundColor: darkBackground,
        elevation: 0,
        centerTitle: false,
      ),
      cardColor: darkSurface,
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: primaryGreen,
          foregroundColor: Colors.white,
          textStyle: textTheme.labelLarge,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return primaryGreen;
          return null;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return primaryGreen.withValues(alpha: 0.4);
          }
          return null;
        }),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        selectedItemColor: primaryGreen,
        unselectedItemColor: Colors.white60,
        showUnselectedLabels: true,
      ),
    );
  }
}
