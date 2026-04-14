import 'package:flutter/material.dart';
// Use the package prefix
import 'package:mobile/features/auth/presentation/pages/splash_screen.dart'; 

import 'app/injection_container.dart';
import 'app/main_app_shell.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await configureDependencies();
  runApp(const MainAppShell());
}
