export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export const SetAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const SetAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);

export type SetAppErrorActionType = ReturnType<typeof SetAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof SetAppStatusAC>;

type ActionsType = 
| SetAppErrorActionType
| SetAppStatusActionType
