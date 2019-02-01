import { createStore, combineReducers } from "redux";

const defaultContacts = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Seif" },
  { id: 3, name: "Fares" },
  { id: 4, name: "Chams" }
];

const contactsReducer = (state = defaultContacts, action) => {
  if (action.type === "ADD_CONTACT") {
    return state.concat({ id: Math.random(), name: action.contactText });
  }
  if (action.type === "DELETE_CONTACT") {
    return state.filter(el => el.id !== action.idToDelete);
  }
  return state;
};

const filterReducer = (state = "", action) => {
  if (action.type === "SET_FILTER") {
    return action.newFilter;
  }
  return state;
};

const store = createStore(
  combineReducers({
    contacts: contactsReducer,
    filter: filterReducer
  })
);

export default store;
