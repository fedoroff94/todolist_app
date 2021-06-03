import { TasksStateType } from '../../trash/App';
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from "../../api/task-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../../app/store";
import { AddTodolistAC, RemoveTodolistAC, SetTodolistsAC } from "./todolist-reducer";
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../app/app-reducer";
import { ServerHandleAppError, ServerHandleNetworkError } from "../../utils/error-utils";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id != action.id)};
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK': {
            let todosTasks = state[action.todoId];
            let newTasksArray = todosTasks.map(t => t.id === action.id ? {...t, ...action.model} : t);
            state[action.todoId] = newTasksArray;
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        case 'SET-TODOLISTS': {
            let stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            });
            return stateCopy;
        } 
        case 'SET-TASKS': {
            const stateCopy = {...state, [action.todoId]: action.tasks};
            return stateCopy;
        }
        default:
            return state;
    }
};

//actions
export const removeTaskAC = (todoId: string, id: string) =>
    ({type: 'DELETE-TASK', todoId, id}) as const;
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task}) as const;
export const changeTaskAC = (todoId: string, id: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todoId, id, model}) as const;
export const changeTaskTitleAC = (title: string, id: string, todoId: string) =>
    ({type: 'CHANGE-TITLE', title, id, todoId}) as const;
export const setTasksAC = (tasks: Array<TaskType>, todoId: string) =>
    ({type: 'SET-TASKS', tasks, todoId}) as const;

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'));
    taskAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId));
            dispatch(setAppStatusAC('succeeded'));
        })
};

export const deleteTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch<TasksActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'));
    taskAPI.deleteTask(todolistId, id)
        .then(res => {
            dispatch(removeTaskAC(todolistId, id));
            dispatch(setAppStatusAC('succeeded'));
        })
};

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TasksActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'));
    taskAPI.postTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item;
                dispatch(addTaskAC(task));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                ServerHandleAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            ServerHandleNetworkError(error, dispatch);
        })
};

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const changeTaskTC = (todolistId: string, id: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(task => task.id === id);

        if (!task) {
            console.warn('Task was not defined');
            return;
        }

        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel
        };

        taskAPI.updateTask(todolistId, id, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskAC(todolistId, id, domainModel));
                } else {
                    ServerHandleAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                ServerHandleNetworkError(error, dispatch);
            })
    }
};

//types
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof SetTodolistsAC>;

type ThunkDispatch = Dispatch<TasksActionsType | SetAppStatusActionType | SetAppErrorActionType>;

