import { Dispatch } from "redux";
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../app/app-reducer";
import { authAPI, LoginParamsType } from "../../api/todolist-api";
import { ServerHandleAppError, ServerHandleNetworkError } from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
};

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default: {
            return state;
        }
    }
};

//actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value}) as const;

//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                ServerHandleAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            ServerHandleNetworkError(error, dispatch);
        })
};

export const logoutTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                ServerHandleAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            ServerHandleNetworkError(error, dispatch);
        });
};


type InitialStateType = {
    isLoggedIn: boolean
};
type ActionsType = ReturnType<typeof setIsLoggedInAC>;

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>;

