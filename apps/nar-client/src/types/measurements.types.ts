export type Measurements = {
  id: number;
  date: string;
  weight: number;
  height: number;
  waist: number;
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
  waist: number;
  thigh: number;
  arm: number;
  chest: number;
};
