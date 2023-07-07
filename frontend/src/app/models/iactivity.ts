import IUser from "./iuser";
import ICity from "./icity";
import IItem from "./iitem";
import IRating from "./irating";

export default interface IActivity {
  _id?: string,
  user: IUser,
  city: ICity,
  items: IItem[],
  userRatings: IRating,
  totalActivities?: number
}