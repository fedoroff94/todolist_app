import { Dispatch } from "redux";
import { authAPI } from "../api/todolist-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";

const InitialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
};

export const appReducer = (state: InitialStateType = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized};
        default:
            return {...state}
    }
};

export const initializedAppTC = (isInitialized: boolean) => {
    return (dispatch: Dispatch) => {
        authAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                } else {

                }
                dispatch(setAppInitializedAC(true))
            });
    };
};

export type  RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
};

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppIsInitializedType = ReturnType<typeof setAppInitializedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppIsInitializedType
