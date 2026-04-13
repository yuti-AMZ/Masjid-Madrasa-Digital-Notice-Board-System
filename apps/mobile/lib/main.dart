import 'package:flutter/material.dart';

import 'app/injection_container.dart';
import 'app/main_app_shell.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await configureDependencies();
  runApp(const MainAppShell());
}
