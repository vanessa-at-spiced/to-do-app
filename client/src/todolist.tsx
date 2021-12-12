import { useState, useEffect } from "react";

//TYPE defines all but Objects. Often used for union types
type Status = "open" | "done" | "discarded";

//INTERFACE defines Objects
interface ToDo<TData> {
    id: number;
    title: string;
    description?: string;
    status: Status;
    data?: TData;
}

//TData "Generics" until now it is not sure, what kind of data will come. For this we have the TData placeholder

interface Metadata {
    assignee: string;
}

export interface Props {
    user: number;
}

export default function App(props: Props) {
    const [todoList, setTodoList] = useState<ToDo<Metadata>[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        fetch(`/api/todos`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTodoList(data);
            })
            .catch((err) => {
                console.log("err in did mount", err);
            });
    }, []);

    const handleClick = () => {
        //Post Title to db
        //setTodoList
    };

    return (
        <>
            <div>
                {todoList &&
                    todoList.map((todo) => (
                        <div key={todo.id}>
                            <h3>{todo.title}</h3>
                            <button>edit</button>
                            <button>delet</button>
                            <button>done</button>
                        </div>
                    ))}

                <div>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        name="search"
                    />
                    <button onClick={() => handleClick()}>Add Todo</button>
                </div>
            </div>
        </>
    );
}
