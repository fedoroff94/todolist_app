import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, SetTodolistsAC,
    todolistsReducer
} from './todolist-reducer';
import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
});

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle, todolistId2, 'all'));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(action.title, action.id));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(action.filter, action.id));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('Todolists should be set to the state', () => {

    const action = SetTodolistsAC(startState);
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});












