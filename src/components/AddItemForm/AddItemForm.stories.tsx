import React from 'react';
import { AddItemForm } from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm component',
    component: AddItemForm
}

const callback = action("button 'Add' was pressed");

export const AddItemFormBaseExample = (props: any) => {
return <AddItemForm addItem={callback}/>
};

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={callback} disabled={true}/>
};