import { todolistAPI, TodolistType } from '../../api/todolist-api';
import { Dispatch } from "redux";
import {
    RequestStatusType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/app-reducer";
import { ServerHandleNetworkError } from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TODOLIST-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        default:
            return state;
    }
};

//actions
export const RemoveTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id: id}) as const;
export const AddTodolistAC = (todolist: TodolistDomainType) =>
    ({type: 'ADD-TODOLIST', todolist}) as const;
export const ChangeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title}) as const;
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id}) as const;
export const SetTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists}) as const;
export const ChangeTodolistStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-STATUS', id, status}) as const;

//thunks
export const fetchTodolistsThunkTC = () => (dispatch: Dispatch<ThunkDispatch>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(SetTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch(error => {
            ServerHandleNetworkError(error, dispatch);

        })
};

export const deleteTodolistTC = (id: string) => (dispatch: Dispatch<ThunkDispatch>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(ChangeTodolistStatusAC(id, 'loading'));
    todolistAPI.deleteTodolist(id)
        .then(res => {
            dispatch(RemoveTodolistAC(id));
            dispatch(setAppStatusAC('succeeded'));
        })
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ThunkDispatch>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.postTodolist(title)
        .then(res => {
            dispatch(AddTodolistAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
        })
};

export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            let action = ChangeTodolistTitleAC(id, title);
            dispatch(action);
        })
};

//types
export type TodolistsActionsType =
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof ChangeTodolistStatusAC>

export type FilterValuesType = "all" | "active" | "completed";

type ThunkDispatch = TodolistsActionsType | SetAppStatusActionType | SetAppErrorActionType;

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
