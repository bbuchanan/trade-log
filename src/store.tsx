import React, { useReducer, Dispatch } from "react";
import { produce } from "immer";
import ITradeGroup from "./Interfaces/ITradeGroup";
import ITrade from "./Interfaces/ITrade";
import { ActionType } from "./Interfaces/ActionTypes";
import uuid from "uuid";

interface IState {
  groups: ITradeGroup[];
  trades: ITrade[];
}

const initialState: IState = {
  groups: [],
  trades: []
}

interface IContextProps {
  state: IState;
  dispatch: Dispatch<ActionType>;
}

export const Store = React.createContext<IContextProps>({} as IContextProps);

const reducer = (state: IState, action: ActionType) => {
  switch (action.type) {
    case "ADDGROUP":
      return produce(state, draftState => {
        if (!action.payload.Id) {
          action.payload.id = uuid();
        }

        draftState.groups.push(action.payload);
      });

    case "REMOVEGROUP":
      return produce(state, draftState => {
        draftState.groups = state.groups.filter(x => x.Id !== action.payload)
      });

    case "ADDTRADE":
      return produce(state, draftState => {
        if (!action.payload.Id) {
          action.payload.id = uuid();
        }

        draftState.trades.push(action.payload);
      });

    case "REMOVETRADE":
      return produce(state, draftState => {
        draftState.trades = state.trades.filter(x => x.Id !== action.payload)
      });

    case "UPDATETRADE":
      return produce(state, draftState => {
        const index: number = state.trades.findIndex(x => x.Id === action.payload.Id);
        draftState.trades[index] = { ...action.payload };
      });

    case "UPDATEGROUP":
      return produce(state, draftState => {
        const index: number = state.groups.findIndex(x => x.Id === action.payload.Id);
        draftState.groups[index] = { ...action.payload };
      });

    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
