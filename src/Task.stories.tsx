import React from 'react';
import { Task } from "./Task";
import { action } from "@storybook/addon-actions";

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
            task={{id: '1', isDone: true, title: 'CSS'}}
            todolistId={'todolistId1'}
         />
        <Task
            removeTask={TaskRemoveCallback}
            changeTaskStatus={StatusChangedCallback}
            changeTaskTitle={TitleChangedCallback}
            task={{id: '2', isDone: false, title: 'JS'}}
            todolistId={'todolistId2'}
        />
    </>
};