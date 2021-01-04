import React, { useEffect, useState } from 'react'
import { todolistAPI } from "../api/todolist-api";

export default {
    title: 'TODOLISTS-API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<any>('');

    const createTodolist = () => {
        todolistAPI.postTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistTitle'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} value={title}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<any>('');

    const deleteTask = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    };

    return <div> {JSON.stringify(state)}

        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete todolist</button>
        </div>

    </div>
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<any>('');
    const [todolistId, setTodolistId] = useState<any>('');


    const updateTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'Current todolist'} value={todolistId} onChange={
                (e) => {setTodolistId(e.currentTarget.value)}
            }/>
            <input type="text" placeholder={'New totolist title'} value={title} onChange={
                (e) => {setTitle(e.currentTarget.value)}}/>
            <button onClick={updateTitle}>update title</button>
        </div>
    </div>
};
