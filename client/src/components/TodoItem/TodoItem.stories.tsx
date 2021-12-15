// TodoItem.stories.js|jsx|ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import withMock from "storybook-addon-mock";

import { TodoItem } from "./TodoItem";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Components/TodoItem",
    component: TodoItem,
    decorators: [withMock],
} as ComponentMeta<typeof TodoItem>;

const Template: ComponentStory<typeof TodoItem> = () => <TodoItem />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.parameters = {
    mockData: [
        {
            url: "http://localhost:3000/api/todo/27",
            method: "GET",
            status: 200,
            response: {
                data: {
                    id: 27,
                    title: "test",
                    description: "string",
                    status: "open",
                },
            },
        },
    ],
};
