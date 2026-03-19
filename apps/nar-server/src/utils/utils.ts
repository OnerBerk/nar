import {ActivityLevelEnum, SexEnum} from '@prisma/client';

// BMR (Mifflin–St Jeor)
export const calculateBMR = (height: number, weight: number, age: number, sex: SexEnum): number => {
  const weightKg = weight / 1000;

  if (sex === SexEnum.Man) {
    return 10 * weightKg + 6.25 * height - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * height - 5 * age - 161;
};

const activityCoefficients: Record<ActivityLevelEnum, number> = {
  Sedentary: 1.2,
  Light: 1.375,
  Moderate: 1.55,
  Intense: 1.725,
};

// TDEE = BMR × coefficient d'activite
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevelEnum): number => {
  return bmr * activityCoefficients[activityLevel];
};

export const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    return age - 1;
  }
  return age;
};
