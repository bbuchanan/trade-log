import ITradeGroup from "./ITradeGroup";
import ITrade from "./ITrade";

export type ActionType =
  | { type: "LOADGROUPS"; payload: ITradeGroup[] }
  | { type: "ADDGROUP"; payload: ITradeGroup }
  | { type: "REMOVEGROUP"; payload: string }
  | { type: "UPDATEGROUP"; payload: ITradeGroup }
  | { type: "LOADTRADES"; payload: ITrade[] }
  | { type: "ADDTRADE"; payload: ITrade }
  | { type: "REMOVETRADE"; payload: string }
  | { type: "UPDATETRADE"; payload: ITrade };
