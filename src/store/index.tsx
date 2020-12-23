import React, { useReducer, Context } from "react";

import reducer, { initialState, InitialState } from "./reducers";

export const Store: Context<{
  state: InitialState;
  dispatch: React.Dispatch<any>;
}> = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export enum Types {
  UPDATE_GOATS = "UPDATE_GOATS",
  Delete = "DELETE_PRODUCT",
  Add = "ADD_PRODUCT",
}

type Props = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export const StoreConsumer = Store.Consumer;
export default StoreProvider;
