export type InitialState = {
  mode: string;
  goats: number;
};
export const initialState: InitialState = {
  mode: "single",
  goats: 21,
};

type Action =
  | { type: "UPDATE_GOATS"; payload: number }
  | { type: "CREATE"; payload: object }
  | { type: "DELETE"; payload: string };

function reducers(state = initialState, action: Action) {
  let data = action.payload ? Number(action.payload) : action.payload;
  switch (action.type) {
    case "UPDATE_GOATS": {
      return { ...state, goats: data };
    }
    default: {
      return state;
    }
  }
}

export default reducers;
