import React from "react";
import "./button.css";

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    action?: string;
    /**
     * How large should the button be?
     */
    size?: "small" | "medium" | "large";
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = (props: ButtonProps) => {
    return (
        <button
            type="button"
            className={[
                "todo-button",
                `todo-button--${props.size}`,
                `${props.action}`,
            ].join(" ")}
            {...props}
        >
            {props.label}
        </button>
    );
};
