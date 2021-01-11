import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import { TasksStateType } from '../App';
import { AddTodolistAC, RemoveTodolistAC, SetTodolistsAC } from "./todolist-reducer";
import { TaskPriorities, TaskStatuses } from "../api/task-api";

let startState: TasksStateType = {};

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 1, addedDate: ''},
            {id: "2", title: "JS", status: TaskStatuses.Completed, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 1, addedDate: ''},
            {id: "3", title: "React", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 1, addedDate: ''}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 1, addedDate: ''},
            {id: "2", title: "milk", status: TaskStatuses.Completed, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 1, addedDate: ''},
            {id: "3", title: "tea", status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 1, addedDate: ''}
        ]
    };
});

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", 'todolistId2', TaskStatuses.New);

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('milk');
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    let newTaskTitle = "Im new title of the task)))";

    const action = changeTaskTitleAC(newTaskTitle, '2', 'todolistId2');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe(newTaskTitle);
});


test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC("new todolist", '3', 'all', '', 2);

    const endState = tasksReducer(startState, action);


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action = SetTodolistsAC([
        {id: '1', title: "What to learn", filter: "all", order: 1, addedDate: ''},
        {id: '2', title: "What to buy", filter: "all", order: 2, addedDate: ''}
    ]);

    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);
    expect(keys.length).toBe(3);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added to todolist', () => {
    const action = setTasksAC(startState["todolistId1"], "todolistId1");

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action);

    expect(endState["todolistId2"].length).toBe(0);
    expect(endState["todolistId1"].length).toBe(3);
});






