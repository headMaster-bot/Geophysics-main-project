import { configureStore, combineReducers } from "@reduxjs/toolkit";

import usersReducers from "../slice/user/usersSlice";
import surveyReducers from "../slice/survey/surveySlice";
import projectsReducers from "../slice/project/projectSlice";
import epicReducers from "../slice/epic/epicSlice";
import sprintReducers from "../slice/sprint/sprintSlice";
import storyReducers from "../slice/story/storySlice";

// 🔥 redux persist
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// ✅ combine all reducers
const rootReducer = combineReducers({
  users: usersReducers,
  surveys: surveyReducers,
  projects: projectsReducers,
  epics: epicReducers,
  sprints: sprintReducers,
  stories: storyReducers,
});

// ✅ persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["epics"], 
  // 👆 persist important slices (you can add more if needed)
};

// ✅ wrap root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// ✅ create persistor
export const persistor = persistStore(store);

export default store;