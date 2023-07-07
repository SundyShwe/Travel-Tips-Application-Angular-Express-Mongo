import IBadge from "./ibadge";

export default interface IUser {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  profilePic: string,
  password?: string,
  badges: IBadge[]
  totalActivities: number
}
