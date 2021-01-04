import { TodolistType } from '../api/todolist-api';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    id: string,
    filter: FilterValuesType,
    addedDate: string,
    order: number
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

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodolistType>
}

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangedTodolistTitleActionType
    | ChangedTodolistFilterActionType
    | SetTodolistsActionType;

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType) :Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [action, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            let todolists = state;
            let currentTodoList = todolists.find(tl => tl.id === action.id);
            if (currentTodoList) {
                currentTodoList.title = action.title;
            }
            state = [...todolists];
            return [...state];
        case 'CHANGE-TODOLIST-FILTER':
            let changedFilterTodoList = state.find(tl => tl.id === action.id);
            if (changedFilterTodoList) {
                changedFilterTodoList.filter = action.filter;
            }
            return [...state];
        case 'SET-TODOLISTS':
            let stateCopy = [...state];
            stateCopy = action.todolists;
            return stateCopy;
        default:
            return state;
    }
};

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
};

export const AddTodolistAC = (id: string, title: string, filter: FilterValuesType, addedDate: string, order: number): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', id, title, filter, addedDate, order}
};

export const ChangeTodolistTitleAC = (id: string, title: string): ChangedTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
};

export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangedTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
};

export const SetTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
};
