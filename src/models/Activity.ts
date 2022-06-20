import { User } from "./User";
import { ActivityStatus } from "./enum";
import { Category } from "./Category";

export interface Activity {
  id: String, // id number, auto generated for database storage
  name: String, // activity name
  objective: Number, // goal
  actual: Number, // current
  unit: String, // unit of measure
  status: ActivityStatus, // status enum
  category: Category, // activity category
}