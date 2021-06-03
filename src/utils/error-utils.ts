import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../app/app-reducer";
import { TasksResponseType } from "../api/task-api";
import { Dispatch } from "redux";

export const ServerHandleAppError = <D>(data: TasksResponseType<D>,
    dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
        dispatch(setAppStatusAC('failed'));
    }
};

export const ServerHandleNetworkError = <D>(error: { message: string},
    dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
        dispatch(setAppErrorAC(error.message ? error.message  : "Some error occurred"));
        dispatch(setAppStatusAC('failed'));
};