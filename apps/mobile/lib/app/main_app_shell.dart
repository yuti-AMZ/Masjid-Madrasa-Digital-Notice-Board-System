import 'package:flutter/material.dart';

import 'app_theme.dart';
import '../features/community/presentation/screens/community_screen.dart';
import '../features/home/presentation/screens/home_screen.dart';
import '../features/prayer/presentation/screens/prayer_screen.dart';
import '../features/profile/presentation/screens/profile_screen.dart';

class MainAppShell extends StatelessWidget {
  const MainAppShell({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Masjid & Madrasa',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: ThemeMode.system,
      home: const _RootNavScreen(),
    );
  }
}

class _RootNavScreen extends StatefulWidget {
  const _RootNavScreen();

  @override
  State<_RootNavScreen> createState() => _RootNavScreenState();
}

class _RootNavScreenState extends State<_RootNavScreen> {
  int _currentIndex = 0;

  static final List<Widget> _tabs = <Widget>[
    const HomeScreen(),
    const PrayerScreen(),
    const CommunityScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _tabs[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_rounded), label: 'Home'),
          BottomNavigationBarItem(
            icon: Icon(Icons.schedule_rounded),
            label: 'Prayer',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.groups_rounded),
            label: 'Community',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_rounded),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
