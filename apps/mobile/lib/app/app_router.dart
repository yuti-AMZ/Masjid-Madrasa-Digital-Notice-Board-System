import 'package:flutter/material.dart';

import 'main_app_shell.dart';

class AppRouter {
  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute<void>(
          builder: (_) => const MainAppShell(),
          settings: settings,
        );
      default:
        return MaterialPageRoute<void>(
          builder: (_) => const MainAppShell(),
          settings: settings,
        );
    }
  }
}
