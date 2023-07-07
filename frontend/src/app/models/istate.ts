import IBadge from "./ibadge";

export default interface IState {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  badges: IBadge[],
  totalActivities: number,
  jwt: string
}