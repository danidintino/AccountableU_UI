import { Day } from "./Day";

export interface Week {
  weekOfMonth: Number, // week number in Month, used for display and calculations
  days: [Day], // list of Day object in week, used to store hours
}