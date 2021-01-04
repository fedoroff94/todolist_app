import { TasksStateType } from '../App';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./todolist-reducer";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../api/task-api";

export type deleteTaskActionType = {
    type: 'DELETE-TASK',
    id: string,
    todoId: string
}

export type addTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string

}

export type changeTaskStatusType = {
    type: 'CHANGE-STATUS',
    id: string,
    todoId: string,
    status: TaskStatuses
}

export type changeTaskTitleType = {
    type: 'CHANGE-TITLE',
    id: string,
    todoId: string,
    title: string
}

type ActionsType =
    deleteTaskActionType
    | addTaskActionType
    | changeTaskStatusType
    | changeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
        switch (action.type) {
            case 'DELETE-TASK': {
                let todosTasks = state[action.todoId];
                state[action.todoId] = todosTasks.filter(t => t.id != action.id);
                return {
                    ...state,
                    state: todosTasks
                };
            }
            case 'ADD-TASK': {
                let newTask = {
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    description: "",
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: action.todolistId,
                    order: 1,
                    addedDate: ''
                };
                let todosTasks = state[action.todolistId];
                state[action.todolistId] = [newTask, ...state[action.todolistId]];
                return {
                    ...state,
                    state: todosTasks
                }
            }
            case 'CHANGE-STATUS': {
                let todosTasks = state[action.todoId];
                state[action.todoId] = todosTasks.map(t => t.id === action.id
                    ? {...t, isDone: action.status}
                    : t);
                return ({...state})
            }
            case 'CHANGE-TITLE': {
                let todosTasks = state[action.todoId];
                state[action.todoId] = todosTasks.map(t => t.id === action.id
                    ? {...t, title: action.title}
                    : t);
                return ({...state})
            }
            case 'ADD-TODOLIST': {
                let stateCopy = {...state};
                stateCopy[action.id] = [];
                return stateCopy;
            }
            case 'REMOVE-TODOLIST': {
                let stateCopy = {...state};
                delete stateCopy[action.id];
                return stateCopy;
            }
            case 'SET-TODOLISTS': {
                const stateCopy = {...state};

                action.todolists.forEach(tl => {
                    stateCopy[tl.id] = []
                });

                return stateCopy;
            }
            default:
                return state;
        }
    }
;

export const removeTaskAC = (id: string, todoId: string): deleteTaskActionType => {
    return {type: 'DELETE-TASK', id, todoId}
};

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
};

export const changeTaskStatusAC = (id: string, todoId: string, status: TaskStatuses): changeTaskStatusType => {
    return {type: 'CHANGE-STATUS', id, todoId, status}
};

export const changeTaskTitleAC = (title: string, id: string, todoId: string,): changeTaskTitleType => {
    return {type: 'CHANGE-TITLE', title, id, todoId}
};
