import Keyed from "./IKeyed";
import { ITransactionType } from "./ITransactionType";
import { IAssetType } from "./IAssetType";

export default interface ITrade extends Keyed {
  Id: string;
  TransactionDate: Date;
  Underlying: string;
  TransactionType: ITransactionType;
  GroupId?: string;
  GroupName?: string;
  Amount: number;
  Expiry?: Date;
  Strike?: number;
  Instrument: IAssetType;
  Notes: string;
}
