import React from 'react';
import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "../../.storybook/ReduxStoreProviderDecorator";
import { combineReducers } from "redux";
import { tasksReducer } from "../features/todolistsList/tasks-reducer";
import { todolistsReducer } from "../features/todolistsList/todolist-reducer";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
});

export default {
    title: 'AppWithRedux component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux demo={true}/>
};