export type Measurements = {
  id: number;
  date: string;
  weight: number;
  height: number;
  belly_waist: number;
  hip_waist: number;
  thigh: number;
  arm: number;
  chest: number;
  userId: number;
  created_at: string;
  updated_at: string;
};

export type CreateMeasurementData = {
  date: string;
  weight: number;
  height: number;
  belly_waist: number;
  hip_waist: number;
  thigh: number;
  arm: number;
  chest: number;
};
