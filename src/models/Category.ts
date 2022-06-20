import { Activity } from "./Activity";

export interface Category {
  name: String, // category name
  activities: [Activity], // list of associated activities - tbd if we need this here
  // do we want archived categories? figure out later if that makes sense in user flow
}