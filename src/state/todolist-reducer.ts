import { FilterValuesType, TodolistType } from '../App';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    id: string,
    filter: string
}

export type ChangedTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    id: string
}

export type ChangedTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangedTodolistTitleActionType | ChangedTodolistFilterActionType;

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType) => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [action, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            let todolists = state;
            let currentTodoList = todolists.find(tl => tl.id === action.id);
            if(currentTodoList){
                currentTodoList.title = action.title;
            }
            state = [...todolists];
            return [...state];
        case 'CHANGE-TODOLIST-FILTER':
        let changedFilterTodoList = state.find(tl => tl.id === action.id);
        if(changedFilterTodoList){
            changedFilterTodoList.filter = action.filter;
        }
        return [...state];
        default:
            return state;
    }
};

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: id}
};

export const AddTodolistAC = (id: string, title: string, filter: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', id, title, filter}
};

export const ChangeTodolistTitleAC = (id: string, title: string): ChangedTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title}
};

export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangedTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id}
};
