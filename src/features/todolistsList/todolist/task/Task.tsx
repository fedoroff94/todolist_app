import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "../../../../components/EditebleSpan/EditableSpan";
import { Delete } from "@material-ui/icons";
import { TaskStatuses, TaskType } from "../../../../api/task-api";

export type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, todolistId: string, status: TaskStatuses) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id,  newValue);
    }, [props.changeTaskTitle, props.todolistId, props.task.id]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    };

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