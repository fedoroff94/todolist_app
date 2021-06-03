import {
    TodolistsActionsType,
    todolistsReducer
} from '../features/todolistsList/todolist-reducer';
import { TasksActionsType, tasksReducer } from '../features/todolistsList/tasks-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppActionsType = TodolistsActionsType | TasksActionsType;

// @ts-ignore
window.store = store;