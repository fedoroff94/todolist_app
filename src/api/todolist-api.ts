import axios from 'axios'
import { FilterValuesType } from "../state/todolist-reducer";

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterValuesType
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '662851b2-362d-4e32-af1a-de5b3f42a213'
    }
});

export const todolistAPI = {

    getTodolists(){
        return instance.get<Array<TodolistType>>(`todo-lists`);
    },

    postTodolist(title: string){
       return instance.post<ResponseType<{item: TodolistType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/`,
           {title: title});
    },

    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title});
    }
};
