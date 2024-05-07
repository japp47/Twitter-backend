#include <iostream>

using namespace std;

int chocolates_for_student_a(int chocolate_jars[], int num_jars) {
  int student_a_chocolates = 0;

  for (int i = 0; i < num_jars; i++) {
    // Check if there are enough chocolates for student A in the current jar
    if (chocolate_jars[i] >= 1) {
      student_a_chocolates++;
      chocolate_jars[i]--;  // Reduce the number of chocolates in the jar
    }
  }

  return 1+student_a_chocolates;
}

int main() {
  int chocolate_jars[] = {5, 8, 7, 3};
  int num_jars = sizeof(chocolate_jars) / sizeof(chocolate_jars[0]);

  int total_chocolates_for_a = chocolates_for_student_a(chocolate_jars, num_jars);
  cout << total_chocolates_for_a << endl;

  return 0;
}