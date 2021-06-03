import {
    AddTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistStatusAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, SetTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolist-reducer';
import { v1 } from 'uuid';
import { appReducer, InitialStateType, RequestStatusType, setAppStatusAC } from "../../app/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", entityStatus: 'idle', filter: "all", addedDate: '', order: 1},
        {id: todolistId2, title: "What to buy", entityStatus: 'idle', filter: "all", addedDate: '', order: 2}
    ];
});

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const todolist: TodolistDomainType = {
        title: '',
        filter: "all",
        order: 1,
        addedDate: '',
        id: '',
        entityStatus: 'idle'
    };
    const endState = todolistsReducer(startState, AddTodolistAC(todolist));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(action.id, action.title));

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

test('correct status of todolist should be changed', () => {
    let newStatus:RequestStatusType  = "loading";
    const action = ChangeTodolistStatusAC(todolistId2, newStatus);
    const endState = todolistsReducer(startState, action);
    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe("loading");
});










