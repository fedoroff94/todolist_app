import {
    addTodolistTC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolistsThunkTC,
    FilterValuesType,
    TodolistDomainType
} from "./todolist-reducer";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../app/store";
import { addTaskTC, changeTaskTC, deleteTaskTC } from "./tasks-reducer";
import { TaskStatuses } from "../../api/task-api";
import { Grid, Paper } from "@material-ui/core";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { Todolist } from "./todolist/Todolist";
import { TasksStateType } from "../../app/AppWithRedux";
import { Redirect } from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}:PropsType) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!demo || !isLoggedIn){
            dispatch(fetchTodolistsThunkTC());
        }
    }, []);

    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, []);

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, []);

    const changeStatus = useCallback((todolistId: string, id: string, status: TaskStatuses) => {
        dispatch(changeTaskTC(todolistId, id, {status}));
    }, []);

    const changeTaskTitle = useCallback((todolistId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTC(todolistId, id, {title: newTitle}));
    }, []);

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(value, todolistId);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistTC(id));
    }, []);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitleTC(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, []);

    if(!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>)
};