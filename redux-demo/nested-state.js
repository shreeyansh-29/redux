const redux = require("redux");
const produce = require("immer").produce;
//Immer simplifies handling immutable data structure and works well with redux

const initialState = {
  name: "Vishwas",
  address: {
    street: "123 Main Street",
    city: "Boston",
    state: "NA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

function streetUpdate(street) {
  return { type: STREET_UPDATED, payload: street };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log("Intial state", store.getState());

const unsubcribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);

store.dispatch(streetUpdate("122 Baker Street"));
unsubcribe();
