import IReview from "./ireview";

export default interface ITransport {
  _id: string,
  name: string,
  reviews: IReview[]
}