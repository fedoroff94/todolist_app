import React, { useCallback, useEffect } from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TaskType } from "../api/task-api";
import { TodolistsList } from "../features/todolistsList/todolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { initializedAppTC, RequestStatusType } from "./app-reducer";
import { BrowserRouter, Route } from "react-router-dom";
import { Login } from "../features/Login/Login";
import { logoutTC } from "../features/Login/auth-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializedAppTC(initialized))
    }, []);

    const logOutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, []);

    if (!initialized) {
        return <div style={{position:"relative", textAlign:"center", top: "300px"}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={"/"} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;

