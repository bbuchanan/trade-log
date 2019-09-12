import Keyed from "./IKeyed";

export default interface ITradeGroup extends Keyed {
  Id: string;
  Name: string;
  Active: boolean;
}
