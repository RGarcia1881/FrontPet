export type Dispenser = {
  id: number;
  name: string;
  ubication: string;
  status: boolean;
  timetable: string;
  FC: number; // Food Capacity
  WC: number; // Water Capacity
  FP: boolean; // Food Present
  WP: boolean; // Water Present
  user: number; // User ID
  pet: number; // Pet ID
};