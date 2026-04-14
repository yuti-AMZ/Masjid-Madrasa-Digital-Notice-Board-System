import 'package:flutter/material.dart';
import 'login_screen.dart'; // your login page

class ResetSuccessScreen extends StatelessWidget {
  const ResetSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7FAF9),
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                /// ✅ SUCCESS ICON
                Stack(
                  alignment: Alignment.center,
                  children: [

                    Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        color: const Color(0xFF1EB980).withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                    ),

                    Container(
                      width: 80,
                      height: 80,
                      decoration: const BoxDecoration(
                        color: Color(0xFF1EB980),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.check,
                        color: Colors.white,
                        size: 40,
                      ),
                    ),

                    /// ✨ decorative stars
                    Positioned(
                      top: 10,
                      right: 5,
                      child: Icon(Icons.star,
                          color: Colors.amber.shade300, size: 18),
                    ),
                    Positioned(
                      bottom: 15,
                      left: 5,
                      child: Icon(Icons.star,
                          color: Colors.amber.shade200, size: 14),
                    ),
                  ],
                ),

                const SizedBox(height: 30),

                /// TITLE
                const Text(
                  "Password Reset\nSuccessfully",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 15),

                /// DESCRIPTION
                const Text(
                  "Your password has been reset successfully. You can now log in with your new password.",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.grey,
                    height: 1.5,
                  ),
                ),

                const SizedBox(height: 40),

                /// ✅ BUTTON
                SizedBox(
                  width: double.infinity,
                  height: 55,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF1EB980),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                    onPressed: () {
                      Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const HomeScreen(),
                        ),
                        (route) => false,
                      );
                    },
                    child: const Text(
                      "Back to Login",
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
                ),

                const SizedBox(height: 25),

                /// SUPPORT TEXT
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Text(
                      "Need help? ",
                      style: TextStyle(color: Colors.grey),
                    ),
                    Text(
                      "Contact Support",
                      style: TextStyle(
                        color: Color(0xFF1EB980),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}