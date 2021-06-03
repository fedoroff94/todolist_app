import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { tasksReducer } from '../src/features/todolistsList/tasks-reducer'
import { todolistsReducer } from '../src/features/todolistsList/todolist-reducer'
import { AppRootStateType } from '../src/app/store'
import { appReducer } from "../src/app/app-reducer";
import { TaskPriorities, TaskStatuses } from "../src/api/task-api";
import thunk from "redux-thunk";
import { authReducer } from "../src/features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", entityStatus: 'idle', filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", entityStatus: 'loading', filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: "1", title: "bread", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 1, addedDate: ''},
            {id: "2", title: "milk", status: TaskStatuses.Completed, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 1, addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: "1", title: "bread", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 1, addedDate: ''},
            {id: "2", title: "milk", status: TaskStatuses.Completed, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 1, addedDate: ''}
        ]
    },
    app: {
        error: null,
        status: "idle"
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>);