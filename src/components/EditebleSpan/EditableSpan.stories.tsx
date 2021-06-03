import React from 'react';
import {action} from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
    title: 'EditableSpan component',
    component: EditableSpan
}

const onChangeCallback = action("Edite mode was started");

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan onChange={onChangeCallback} value={'some value'}/>
};