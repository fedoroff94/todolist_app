import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@material-ui/icons";
import { TaskStatuses, TaskType } from "./api/task-api";

export type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, todolistId: string, status: TaskStatuses) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, props.todolistId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    };

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(newValue, props.task.id, props.todolistId);
    }, [props.changeTaskTitle, props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
});