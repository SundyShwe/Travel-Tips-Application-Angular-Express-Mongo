import ITransport from "./itransport";

export default interface ICity {
  _id: string,
  name: string,
  state: string,
  location: number[],
  transports: ITransport[]
}