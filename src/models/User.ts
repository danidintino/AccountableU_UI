import { Activity } from "./Activity";
import { Month } from "./Month";

export interface User {
  id: String, // id number, auto generated for database storage
  firstName: String, // basic user info
  lastName: String, // basic user info
  months: [Month], // list of Month objects
  // activities: [Activity], // list of Activity object - TBD if we need this,
                          // holds repeated data since activities are also 
                          // stored under Months. May make carrying over previous
                          // activities month to month easier
}