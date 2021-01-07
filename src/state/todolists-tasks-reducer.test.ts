import { AddTodolistAC, todolistsReducer } from "./todolist-reducer";
import { tasksReducer } from "./tasks-reducer";
import { TasksStateType } from "../AppWithRedux";
import { TodolistType } from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = AddTodolistAC("new todolist", '3', 'all', '', 1);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});
