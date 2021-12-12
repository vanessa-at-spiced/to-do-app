import { useState } from "react";

//TYPE defines all but Objects. Often used for union types
type Status = "open" | "done" | "discarded";

//INTERFACE defines Objects
interface ToDo<TData> {
    description: string;
    status: Status;
    data?: TData;
}

//TData "Generics" until now it is not sure, what kind of data will come. For this we have the TData placeholder

interface Metadata {
    assignee: string;
}

export interface Props{
    user: int;
}

export default function App(props: Props) {
    const [todo, setTodo] = useState<ToDo<Metadata>>({
        description: "Lerne TypeScript",
        status: "open",
        data: {
            assignee: "van",
        },
    });

    function handleClick() {
        setTodo({
            ...todo,
            status: "done",
        });
    }

    return (
        <>
            <h1
                onClick={() => handleClick()}
                className={todo.status == "done" ? "done" : "open"}
            >
                {todo.description}
            </h1>
            <p>{todo.data.assignee}</p>
        </>
    );
}
