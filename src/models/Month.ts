import { Activity } from "./Activity";
import { Category } from "./Category";
import { User } from "./User";
import { Week } from "./Week";

export interface Month {
  id: String, // id number, auto generated for database storage
  month: String, // month name, stored for display
  year: Number // year number, stored for display
  weeks: [Week], // list of Week objects
  activities: [Activity], // list of Activity objects, stored at this level for "Month's Activities" view
  archived: Boolean, // old months will have this field marked as true
                    // my thought is to use this for filtered between previous 
                    // and future months but could change logic later
}