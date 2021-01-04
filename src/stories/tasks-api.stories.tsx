import React, { useEffect, useState } from 'react'
import { taskAPI } from "../api/task-api";

export default {
    title: ' TASKS-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<any>('');

    const getTasks = () => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'enter todilistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<any>('');
    const [taskTitle, setTaskTitle] = useState<any>('');

    const addTask = () => {
        taskAPI.postTask(todolistId, taskTitle)
            .then((res) => {
                debugger
                setState(res.data);
            })
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'enter todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter taskTitle'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={addTask}>add task</button>
        </div>
    </div>
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<any>('');
    const [taskId, setTaskId] = useState<any>('');

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'enter todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
};

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<any>('');
    const [taskId, setTaskId] = useState<any>('');

    const [title, setTitle] = useState<any>('');
    const [description, setDescription] = useState<any>('');
    const [status, setStatus] = useState<any>(0);
    const [priority, setPriority] = useState<any>(0);
    const [startDate, setStartDate] = useState<any>('');
    const [deadline, setDeadline] = useState<any>('');

    const UpdateTask = () => {
        taskAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline
        })
            .then((res) => {
                debugger
                setState(res.data)
            })
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'enter todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter description'} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter priority'} value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter status'} value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter startDate'} value={startDate} onChange={(e) => {
                setStartDate(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'enter deadLine'} value={deadline} onChange={(e) => {
                setDeadline(e.currentTarget.value)
            }}/>
            <button onClick={UpdateTask}>update task</button>
        </div>
    </div>
};
