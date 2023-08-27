const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require("axios");

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUserRequest = () => {
  return { type: FETCH_USER_REQUESTED };
};
const fetchUserSuccess = (payload) => {
  return { type: FETCH_USER_SUCCEEDED, payload: payload };
};
const fetchUserFail = (payload) => {
  return { type: FETCH_USER_FAILED, payload: payload };
};

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return { ...state, isLoading: true };
    case FETCH_USER_SUCCEEDED:
      return { ...state, isLoading: false, users: action.payload };
    case FETCH_USER_FAILED:
      return { ...state, error: action.payload, users: [], isLoading: false };

    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((e) => {
        dispatch(fetchUserFail(e.message));
      });
  };
};

const store = createStore(fetchUserReducer, applyMiddleware(thunkMiddleware));
store.subscribe(()=> {console.log(store.getState())});
store.dispatch(fetchUsers())