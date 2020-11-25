import React from 'react';
import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "../.storybook/ReduxStoreProviderDecorator";
import { combineReducers } from "redux";
import { tasksReducer } from "./state/tasks-reducer";
import { todolistsReducer } from "./state/todolist-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export default {
    title: 'AppWithRedux component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux/>
};