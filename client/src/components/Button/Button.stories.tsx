import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Button",
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Add = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Add.args = {
    action: "add",
    size: "medium",
    label: "add",
};

export const Delete = Template.bind({});
Delete.args = {
    action: "delete",
    size: "medium",
    label: "Delete",
};

export const Done = Template.bind({});
Done.args = {
    action: "done",
    size: "medium",
    label: "Done",
};

export const Small = Template.bind({});
Small.args = {
    size: "small",
    label: "Button",
};
