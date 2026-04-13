import 'package:flutter/material.dart';
import 'onboarding_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const OnboardingScreen(),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7FAF9),
      body: Stack(
        children: [

          /// 🔹 BACKGROUND GRADIENT
          Positioned.fill(
            child: Opacity(
              opacity: 0.1,
              child: Container(
                decoration: BoxDecoration(
                  gradient: RadialGradient(
                    colors: [Colors.green.shade50, Colors.white],
                    radius: 1.2,
                  ),
                ),
              ),
            ),
          ),

          /// 🔹 TOP FLOWER
          Positioned(
            top: 60,
            right: 40,
            child: Icon(
              Icons.local_florist,
              size: 80,
              color: Colors.green.withOpacity(0.3),
            ),
          ),

          /// 🔹 BOTTOM FLOWER
          Positioned(
            bottom: 80,
            left: 30,
            child: Icon(
              Icons.local_florist,
              size: 80,
              color: Colors.green.withOpacity(0.3),
            ),
          ),

          /// 🔹 MAIN CONTENT
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                /// CIRCLE LOGO
                Container(
                  padding: const EdgeInsets.all(30),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.green.withOpacity(0.2),
                        blurRadius: 20,
                        offset: const Offset(0, 10),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.mosque,
                    size: 60,
                    color: Color(0xFF1EB980),
                  ),
                ),

                const SizedBox(height: 30),

                /// TITLE
                const Text(
                  "Noor Masjid",
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF0A1F33),
                  ),
                ),

                const SizedBox(height: 10),

                /// SUBTITLE
                const Text(
                  "EDUCATION & COMMUNITY",
                  style: TextStyle(
                    fontSize: 14,
                    letterSpacing: 1.5,
                    color: Color(0xFF1EB980),
                  ),
                ),

                const SizedBox(height: 30),

                /// DOTS
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    dot(true),
                    dot(false),
                    dot(false),
                  ],
                ),
              ],
            ),
          ),

          /// 🔹 BOTTOM TEXT
          Positioned(
            bottom: 30,
            left: 0,
            right: 0,
            child: Center(
              child: Text(
                '"Inspired by Faith, Driven by Community"',
                style: TextStyle(
                  fontSize: 14,
                  fontStyle: FontStyle.italic,
                  color: Colors.grey[600],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// DOT
  Widget dot(bool active) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 4),
      width: active ? 10 : 8,
      height: active ? 10 : 8,
      decoration: BoxDecoration(
        color: active ? const Color(0xFF1EB980) : Colors.green[200],
        shape: BoxShape.circle,
      ),
    );
  }
}