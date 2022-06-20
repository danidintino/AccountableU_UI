import { Activity } from "./Activity";

export interface Day {
  dayOfWeek: Number, // day of the week number, used for display and calculations
  activities: [Activity], // list of Activity objects, stored here to keep track of daily hours
}