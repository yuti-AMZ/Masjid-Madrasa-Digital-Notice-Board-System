import 'package:flutter/material.dart';

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({super.key});

  @override
 State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  bool showCurrent = false;
  bool showNew = false;
  bool showConfirm = false;

  final TextEditingController currentController = TextEditingController();
  final TextEditingController newController = TextEditingController();
  final TextEditingController confirmController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7FAF9),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [

              /// 🔝 TOP BAR
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back, color: Colors.green),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  const Expanded(
                    child: Center(
                      child: Text(
                        "Change Password",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 40),
                ],
              ),

              const SizedBox(height: 10),

              /// SMALL INDICATOR
              Center(
                child: Container(
                  width: 80,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.amber,
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),

              const SizedBox(height: 30),

              /// CURRENT PASSWORD
              const Text(
                "CURRENT PASSWORD",
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 1,
                ),
              ),

              const SizedBox(height: 10),

              TextField(
                controller: currentController,
                obscureText: !showCurrent,
                decoration: InputDecoration(
                  hintText: "••••••••",
                  suffixIcon: IconButton(
                    icon: Icon(
                      showCurrent
                          ? Icons.visibility
                          : Icons.visibility_off,
                      color: const Color(0xFF1EB980),
                    ),
                    onPressed: () {
                      setState(() {
                        showCurrent = !showCurrent;
                      });
                    },
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide(color: Colors.green.shade100),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide(color: Colors.green.shade100),
                  ),
                ),
              ),

              const SizedBox(height: 25),

              /// NEW PASSWORD
              const Text(
                "NEW PASSWORD",
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 1,
                ),
              ),

              const SizedBox(height: 10),

              TextField(
                controller: newController,
                obscureText: !showNew,
                decoration: InputDecoration(
                  hintText: "••••••••",
                  suffixIcon: IconButton(
                    icon: Icon(
                      showNew
                          ? Icons.visibility
                          : Icons.visibility_off,
                      color: const Color(0xFF1EB980),
                    ),
                    onPressed: () {
                      setState(() {
                        showNew = !showNew;
                      });
                    },
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide(color: Colors.green.shade100),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide(color: Colors.green.shade100),
                  ),
                ),
              ),

              const SizedBox(height: 5),

              const Text(
                "Must be at least 8 characters long.",
                style: TextStyle(color: Colors.grey),
              ),

              const SizedBox(height: 25),

              /// CONFIRM PASSWORD
              const Text(
                "CONFIRM NEW PASSWORD",
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 1,
                ),
              ),

              const SizedBox(height: 10),

              TextField(
                controller: confirmController,
                obscureText: !showConfirm,
                decoration: InputDecoration(
                  hintText: "••••••••",
                  suffixIcon: IconButton(
                    icon: Icon(
                      showConfirm
                          ? Icons.visibility
                          : Icons.visibility_off,
                      color: const Color(0xFF1EB980),
                    ),
                    onPressed: () {
                      setState(() {
                        showConfirm = !showConfirm;
                      });
                    },
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide(color: Colors.green.shade100),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide(color: Colors.green.shade100),
                  ),
                ),
              ),

              const Spacer(),

              /// UPDATE BUTTON
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
                    String current = currentController.text;
                    String newPass = newController.text;
                    String confirm = confirmController.text;

                    if (newPass != confirm) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text("Passwords do not match"),
                        ),
                      );
                      return;
                    }

                    print("Current: $current");
                    print("New: $newPass");
                  },
                  child: const Text(
                    "Update Password 🔒",
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ),

              const SizedBox(height: 15),

              /// SECURITY TEXT
              const Center(
                child: Text(
                  "🔐 Secure connection encrypted",
                  style: TextStyle(color: Colors.grey),
                ),
              ),

              const SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }
}
