import axios from 'axios'

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    description: string
    priority: TaskPriorities
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type TasksResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '662851b2-362d-4e32-af1a-de5b3f42a213'
    }
});

export const taskAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
    },

    postTask(todolistId: string, title: string) {
        return instance.post<TasksResponseType<{}>>(`/todo-lists/${todolistId}/tasks`, {title: title});
    },


    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TasksResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<TasksResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
};
