import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "redux/reducer";
import { persistCombineReducers, persistStore } from "redux-persist";
// import storage from "redux-persist/es/storage";
import storage from "redux-persist/lib/storage";

const config = {
  key: "primary",
  storage,
};

let persistedReducer = persistCombineReducers(config, rootReducer);

let store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);

let persistor = persistStore(store);

export { store, persistor };
