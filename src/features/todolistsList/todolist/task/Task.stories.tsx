import React from 'react';
import { Task } from "./Task";
import { action } from "@storybook/addon-actions";
import { TaskPriorities, TaskStatuses } from "../../../../api/task-api";

export default {
    title: 'AddItemForm component',
    component: Task
}

const StatusChangedCallback = action('Status was changed');
const TitleChangedCallback = action('Title was changed');
const TaskRemoveCallback = action('Task was removed');


export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            removeTask={TaskRemoveCallback}
            changeTaskStatus={StatusChangedCallback}
            changeTaskTitle={TitleChangedCallback}
            task={{
                id: '1', status: TaskStatuses.Completed, title: 'CSS', description: "",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            }}
            todolistId={'todolistId1'}
        />
        <Task
            removeTask={TaskRemoveCallback}
            changeTaskStatus={StatusChangedCallback}
            changeTaskTitle={TitleChangedCallback}
            task={{
                id: '2', status: TaskStatuses.New, title: 'JS', description: "",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            }}
            todolistId={'todolistId2'}
        />
    </>
};